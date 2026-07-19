import { Resend } from "resend";
import { buildContactProperties, tagValue } from "@/lib/resend-contact-props";
import { upsertLead } from "@/lib/db/leads";
import { sendSequenceEmail } from "@/lib/emails/lead-sequence/send";
import { markEmailSent } from "@/lib/db/leads";
import {
  getClientIp,
  rateLimit,
  tooManyRequestsResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered, isValidEmail } from "@/lib/security/validation";
import { captureServerEvent, captureServerException } from "@/lib/posthog-server";
import {
  ga4Event,
  metaCapiEvent,
  readTrackingCookies,
} from "@/lib/analytics-server";
import { randomUUID } from "crypto";

/** Escapa input do usuário antes de interpolar no HTML do email (anti-injeção/phishing). */
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    // Rate limit: 5 reqs / 10min por IP. Forms são raros, limite apertado.
    const ip = getClientIp(request);
    const rl = await rateLimit("lead-ia", ip, { max: 5, window: "10 m" });
    if (!rl.success) {
      return tooManyRequestsResponse(rl);
    }

    const data = await request.json();
    const {
      nome = "",
      email = "",
      empresa = "",
      tamanho = "",
      gargalo = "",
      whatsapp = "",
      locale = "pt",
      _hp,
      metadata = {},
      // Tracking ids vindos do client (opcionais — fallback server-to-server):
      // event_id deduplica pixel×CAPI; ga_client_id/ga_session_id fazem o
      // evento GA4 cair no usuário/sessão real em vez de um id fantasma.
      event_id,
      ga_client_id,
      ga_session_id,
    } = data || {};

    // Atribuição (origem do lead): source lógico do form + detalhe, canal,
    // origem de tráfego, UTMs, referrer, first/last touch.
    const ATTR_KEYS = [
      "channel",
      "source",
      "source_detail",
      "traffic_source",
      "referrer",
      "path",
      "landing",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "first_channel",
      "first_source",
      "first_referrer",
      "first_utm_source",
      "first_utm_campaign",
    ] as const;
    const attr: Record<string, string> = {};
    for (const k of ATTR_KEYS) {
      const v = (metadata || {})[k];
      if (typeof v === "string" && v) attr[k] = v.slice(0, 300);
    }

    // Honeypot: se preenchido, retorna 200 silencioso (não dá pista pro bot).
    if (isHoneypotTriggered(_hp)) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!nome || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: "missing_fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "invalid_email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Captura PARCIAL (passo 1 do wizard /diagnostico): só persiste o lead
    // (upsert) + registra no PostHog. NÃO dispara welcome, notificação interna,
    // audience nem conversões (GA4/CAPI) — isso evita email duplicado e não
    // infla a conversão. O enriquecimento + welcome vêm no submit final.
    if (data?.partial === true) {
      let partialLead = null;
      try {
        partialLead = await upsertLead({
          email,
          name: nome,
          empresa,
          tamanho,
          whatsapp,
          gargalo,
          metadata: attr,
        });
      } catch (err) {
        console.error("[lead-ia] erro persistindo lead parcial:", err);
      }
      await captureServerEvent(email, "lead_ia_partial", {
        ...attr,
        persisted: partialLead !== null,
      });
      return new Response(
        JSON.stringify({
          ok: true,
          partial: true,
          persisted: partialLead !== null,
          leadId: partialLead?.id ?? null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Notificação interna pro time (Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress =
      process.env.RESEND_FROM ?? "Kaleidos <noreply@kaleidos.com.br>";
    const subject = locale === "en"
      ? `[Kaleidos AI] New lead: ${nome}${empresa ? ` (${empresa})` : ""}`
      : `[Kaleidos AI] Novo lead: ${nome}${empresa ? ` (${empresa})` : ""}`;
    const parseList = (raw?: string) =>
      (raw || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const to = parseList(process.env.LEAD_NOTIFICATION_TO).length
      ? parseList(process.env.LEAD_NOTIFICATION_TO)
      : ["madureira@kaleidosdigital.com", "nathalia@kaleidosdigital.com"];
    const cc = parseList(process.env.LEAD_NOTIFICATION_CC).length
      ? parseList(process.env.LEAD_NOTIFICATION_CC)
      : ["gf.madureiraa@gmail.com"];

    const text = `
Nome: ${nome}
Email: ${email}
WhatsApp: ${whatsapp}
Empresa: ${empresa}
Tamanho do time: ${tamanho}

Gargalo principal:
${gargalo}
`;

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
        <h2 style="margin:0 0 12px 0;">${esc(subject)}</h2>
        <p style="color:#666;font-size:14px;margin:0 0 16px 0">Lead capturado pela página /servicos/ia-automacoes-completa</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:140px">Nome</td><td style="padding:6px 0"><strong>${esc(nome)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${esc(email)}</td></tr>
          ${whatsapp ? `<tr><td style="padding:6px 0;color:#666">WhatsApp</td><td style="padding:6px 0">${esc(whatsapp)}</td></tr>` : ""}
          ${empresa ? `<tr><td style="padding:6px 0;color:#666">Empresa</td><td style="padding:6px 0">${esc(empresa)}</td></tr>` : ""}
          ${tamanho ? `<tr><td style="padding:6px 0;color:#666">Tamanho do time</td><td style="padding:6px 0">${esc(tamanho)}</td></tr>` : ""}
        </table>
        ${gargalo ? `
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0;"/>
        <p style="color:#666;font-size:13px;margin:0 0 6px 0">Gargalo principal</p>
        <p style="white-space:pre-wrap;margin:0">${esc(String(gargalo).slice(0, 5000))}</p>
        ` : ""}
      </div>
    `;

    let internalSimulated = false;
    let internalSent = false;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromAddress,
          to,
          cc,
          replyTo: email,
          subject,
          text,
          html,
          tags: [
            { name: "product", value: "kaleidos" },
            { name: "category", value: "lead-notification" },
            ...(attr.source
              ? [{ name: "source", value: tagValue(attr.source) }]
              : []),
          ],
        });
        internalSent = true;
      } catch (err) {
        console.error("[lead-ia] erro resend interno:", err);
      }
    } else {
      internalSimulated = true;
      console.log("[lead-ia] RESEND_API_KEY ausente — notificação interna simulada");
    }

    // 2. Persiste lead pra sequence (Postgres). Falha silenciosa se DATABASE_URL ausente.
    let lead = null;
    try {
      lead = await upsertLead({
        email,
        name: nome,
        empresa,
        tamanho,
        whatsapp,
        gargalo,
        // Atribuição completa no jsonb `metadata` do Neon — fonte de verdade
        // de ONDE o lead veio (form, canal, UTMs, first/last touch).
        metadata: attr,
      });
    } catch (err) {
      console.error("[lead-ia] erro persistindo lead:", err);
    }

    // Rede de segurança: se a notificação interna E a persistência falharam,
    // o lead completo vai pros logs da Vercel de forma recuperável (além do
    // evento no PostHog mais abaixo). NUNCA deixar o lead evaporar em silêncio.
    if (!internalSent && !lead) {
      console.error(
        `[LEAD-FALLBACK] lead-ia sem notificação nem persistência — lead preservado: ${JSON.stringify(
          {
            nome: String(nome).slice(0, 200),
            email: String(email).trim().toLowerCase(),
            empresa: String(empresa || "").slice(0, 200),
            tamanho: String(tamanho || "").slice(0, 100),
            whatsapp: String(whatsapp || "").slice(0, 50),
            gargalo: String(gargalo || "").slice(0, 2000),
            ...attr,
            at: new Date().toISOString(),
          }
        )}`
      );
    }

    // 3. Dispara email #1 (welcome) imediatamente.
    let welcomeSent = false;
    try {
      const r = await sendSequenceEmail({
        to: email,
        name: nome,
        emailNumber: 1,
        source: attr.source || "lead-ia",
        dryRun: false,
      });
      welcomeSent = r.ok;
      if (r.ok && lead) {
        await markEmailSent(lead.id, 1).catch(() => {});
      }
    } catch (err) {
      console.error("[lead-ia] erro enviando welcome:", err);
    }

    // 4. Cadastra contato na Resend Audience (campanhas/broadcasts).
    //    Falha silenciosa: persistência local + welcome já rodaram.
    let audienceAdded = false;
    try {
      const audienceId = process.env.RESEND_AUDIENCE_ID_LEADS;
      if (audienceId && resendApiKey) {
        const resend = new Resend(resendApiKey);
        const parts = (nome || "").trim().split(/\s+/).filter(Boolean);
        const firstName = parts[0];
        const lastName = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
        // Propriedades custom (aba "Properties" da Audience) — atribuição
        // visível direto no contato do Resend. Requer resend >= 6.17 e as
        // properties criadas na conta.
        const contactProperties = buildContactProperties(attr);
        const { error: contactError } = await resend.contacts.create({
          email,
          audienceId,
          firstName,
          lastName,
          unsubscribed: false,
          ...(Object.keys(contactProperties).length
            ? { properties: contactProperties }
            : {}),
        });
        if (contactError) {
          const errMsg = (contactError as { message?: string })?.message ?? "";
          if (/exist|already|duplicat/i.test(errMsg)) {
            // Já está na audience: atualiza last-touch nas properties.
            try {
              await resend.contacts.update({
                audienceId,
                email,
                ...(Object.keys(contactProperties).length
                  ? { properties: contactProperties }
                  : {}),
              });
            } catch {
              // best-effort: Neon/PostHog seguem como fonte de verdade
            }
            audienceAdded = true;
          } else {
            console.warn("[lead-ia] resend audience create error", contactError);
          }
        } else {
          audienceAdded = true;
        }
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[lead-ia] contact criado na audience ${audienceId} → ${email}`
          );
        }
      } else if (!audienceId) {
        if (process.env.NODE_ENV !== "production") {
          console.log("[lead-ia] RESEND_AUDIENCE_ID_LEADS ausente — audience skip");
        }
      }
    } catch (err) {
      console.warn("[lead-ia] resend audience create failed", err);
    }

    await captureServerEvent(email, "lead_ia_submitted", {
      empresa: empresa || null,
      tamanho: tamanho || null,
      has_whatsapp: Boolean(whatsapp),
      has_gargalo: Boolean(gargalo),
      welcome_sent: welcomeSent,
      audience_added: audienceAdded,
      internal_sent: internalSent,
      persisted: lead !== null,
      ...attr,
      $set: {
        last_channel: attr.channel ?? null,
        last_source: attr.traffic_source ?? attr.source ?? null,
        last_path: attr.path ?? null,
      },
      $set_once: {
        first_channel: attr.first_channel ?? attr.channel ?? null,
        first_source: attr.first_source ?? attr.traffic_source ?? null,
        first_referrer: attr.first_referrer ?? attr.referrer ?? null,
      },
    });

    // INTEGRAÇÃO CRM (KAI): lead-ia é o lead MAIS qualificado do site (form
    // com gargalo/whatsapp/tamanho de time), então espelhamos no CRM do KAI
    // além do Resend/Postgres/PostHog. BEST-EFFORT e env-gated: só roda se
    // KAI_CRM_INGEST_URL estiver setada; timeout curto; nunca lança nem
    // derruba a resposta (o lead já está seguro acima).
    let crmSynced = false;
    const kaiIngestUrl = process.env.KAI_CRM_INGEST_URL;
    if (kaiIngestUrl) {
      const crmLogPayload = JSON.stringify({
        nome: String(nome).slice(0, 200),
        email: String(email).trim().toLowerCase(),
        empresa: String(empresa || "").slice(0, 200),
        whatsapp: String(whatsapp || "").slice(0, 50),
        tamanho: String(tamanho || "").slice(0, 100),
        gargalo: String(gargalo || "").slice(0, 2000),
        ...attr,
        at: new Date().toISOString(),
      });
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 4000);
        const resp = await fetch(kaiIngestUrl, {
          method: "POST",
          signal: ctrl.signal,
          headers: {
            "Content-Type": "application/json",
            ...(process.env.KAI_CRM_INGEST_TOKEN
              ? { Authorization: `Bearer ${process.env.KAI_CRM_INGEST_TOKEN}` }
              : {}),
          },
          body: JSON.stringify({
            source: "site-lead-ia",
            name: String(nome).slice(0, 200),
            email: String(email).trim().toLowerCase(),
            company: String(empresa || "").slice(0, 200),
            phone: String(whatsapp || "").slice(0, 50),
            message: String(gargalo || "").slice(0, 2000),
            metadata: {
              tamanho_time: String(tamanho || "").slice(0, 100) || null,
              gargalo: String(gargalo || "").slice(0, 2000) || null,
              whatsapp: String(whatsapp || "").slice(0, 50) || null,
            },
            channel: attr.channel ?? null,
            utm_source: attr.utm_source ?? null,
            utm_campaign: attr.utm_campaign ?? null,
          }),
        });
        clearTimeout(t);
        crmSynced = resp.ok;
        if (!resp.ok) {
          console.error(
            `[LEAD-FALLBACK] lead-ia->KAI CRM respondeu ${resp.status} — lead preservado: ${crmLogPayload}`
          );
        }
      } catch (err) {
        console.error(
          `[LEAD-FALLBACK] lead-ia->KAI CRM falhou — lead preservado: ${crmLogPayload}`,
          err
        );
      }
    }

    // Conversões server-side (GA4 MP + Meta CAPI). BEST-EFFORT e env-gated:
    // helpers nunca lançam e viram no-op sem GA4_API_SECRET / META_CAPI_TOKEN.
    // Lead de IA/automações = alta intenção (form qualificado com gargalo).
    const emailNorm = String(email).trim().toLowerCase();
    const userAgent = request.headers.get("user-agent") ?? undefined;
    const { fbp, fbc } = readTrackingCookies(request.headers.get("cookie"));
    const eventSourceUrl = request.headers.get("referer") ?? undefined;
    const eventId =
      typeof event_id === "string" && event_id
        ? event_id.slice(0, 100)
        : randomUUID();
    await Promise.all([
      ga4Event(
        emailNorm,
        "generate_lead",
        {
          lead_type: "lead_ia",
          intent: "high",
          tamanho: tamanho || undefined,
          ...attr,
        },
        {
          clientId: typeof ga_client_id === "string" ? ga_client_id : undefined,
          sessionId:
            typeof ga_session_id === "string" ? ga_session_id : undefined,
        }
      ),
      metaCapiEvent(
        "Lead",
        { email: emailNorm, clientIp: ip, userAgent, fbp, fbc },
        {
          content_name: "lead_ia_form",
          content_category: "ia_automacoes",
          intent: "high",
          ...attr,
        },
        { eventId, eventSourceUrl }
      ),
    ]);

    return new Response(
      JSON.stringify({
        ok: true,
        triggerEmailSequence: true,
        leadId: lead?.id ?? null,
        persisted: lead !== null,
        welcomeSent,
        audienceAdded,
        internalSimulated,
        crmSynced,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[lead-ia] erro:", err);
    await captureServerException(err);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
