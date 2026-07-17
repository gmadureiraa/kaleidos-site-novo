"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { FooterDemo } from "@/components/ui/footer-demo";

// Data de vigência da Política. Atualizar quando o documento for revisado.
const EFFECTIVE_DATE_ISO = "2026-06-17";
const EFFECTIVE_DATE_LABEL_PT = "17 de junho de 2026";
const EFFECTIVE_DATE_LABEL_EN = "June 17, 2026";

export default function PrivacidadePage() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const withLang = (path: string) =>
    isEn ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link
            href={withLang("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isEn ? "Back to home" : "Voltar para o início"}
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display text-black leading-tight">
          {isEn ? "Privacy Policy" : "Política de Privacidade"}
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          {isEn ? "Effective date: " : "Vigência a partir de: "}
          <time dateTime={EFFECTIVE_DATE_ISO}>
            {isEn ? EFFECTIVE_DATE_LABEL_EN : EFFECTIVE_DATE_LABEL_PT}
          </time>
        </p>

        {isEn ? <PolicyEN /> : <PolicyPT />}
      </article>

      <FooterDemo />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Estilos de prosa jurídica reutilizáveis                            */
/* ------------------------------------------------------------------ */

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-black mb-4 font-display">
        {n}. {title}
      </h2>
      <div className="space-y-4 text-[15px] md:text-base text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Política — Português (LGPD)                                        */
/* ------------------------------------------------------------------ */

function PolicyPT() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-10">
        Esta Política de Privacidade descreve como a Kaleidos (&ldquo;Kaleidos&rdquo;,
        &ldquo;nós&rdquo;) coleta, utiliza, armazena, compartilha e protege os dados
        pessoais dos visitantes e usuários do site{" "}
        <strong>kaleidos.com.br</strong> e demais páginas e serviços relacionados.
        O tratamento de dados é realizado em conformidade com a Lei Geral de Proteção
        de Dados Pessoais &mdash; LGPD (Lei nº 13.709/2018) e demais normas aplicáveis.
        Ao utilizar nosso site, você declara estar ciente desta Política.
      </p>

      <Section n="1" title="Controlador dos dados">
        <p>
          O controlador responsável pelo tratamento dos seus dados pessoais é a
          Kaleidos, inscrita no CNPJ sob o nº <strong>[CNPJ]</strong>, com sede em{" "}
          <strong>[ENDEREÇO COMPLETO]</strong>. Para questões relacionadas à
          privacidade e proteção de dados, entre em contato pelo e-mail{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          .
        </p>
      </Section>

      <Section n="2" title="Dados que coletamos">
        <p>Podemos coletar as seguintes categorias de dados:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dados fornecidos por você:</strong> nome, e-mail, telefone,
            empresa, mensagem e demais informações enviadas voluntariamente por meio
            de formulários de contato, solicitação de orçamento, captura de leads,
            inscrição em newsletter ou download de materiais (como nossos Papers).
          </li>
          <li>
            <strong>Dados de navegação e uso:</strong> endereço IP, tipo de
            navegador e dispositivo, sistema operacional, páginas visitadas, tempo de
            permanência, origem do acesso (referrer), parâmetros de campanha (UTMs) e
            interações com a página, coletados automaticamente por cookies e
            tecnologias similares.
          </li>
          <li>
            <strong>Dados de comunicação:</strong> registros de mensagens trocadas
            conosco por e-mail, WhatsApp ou formulários.
          </li>
        </ul>
        <p>
          Não coletamos intencionalmente dados pessoais sensíveis nem dados de
          crianças ou adolescentes. Caso você nos envie esse tipo de informação,
          poderemos excluí-la.
        </p>
      </Section>

      <Section n="3" title="Finalidades do tratamento">
        <p>Utilizamos seus dados para as seguintes finalidades:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Responder a contatos, solicitações e pedidos de orçamento;</li>
          <li>Prestar e executar nossos serviços de marketing digital;</li>
          <li>
            Enviar newsletters, materiais educativos e comunicações de marketing,
            quando autorizado;
          </li>
          <li>
            Entregar materiais solicitados (como os Kaleidos Papers liberados por
            e-mail);
          </li>
          <li>
            Medir audiência, analisar o desempenho do site e melhorar a experiência
            do usuário;
          </li>
          <li>
            Personalizar e mensurar campanhas publicitárias e de remarketing;
          </li>
          <li>
            Cumprir obrigações legais, regulatórias e exercer direitos em processos.
          </li>
        </ul>
      </Section>

      <Section n="4" title="Base legal">
        <p>
          O tratamento dos seus dados pessoais se fundamenta nas seguintes bases
          legais previstas no art. 7º da LGPD:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Consentimento</strong> &mdash; para envio de comunicações de
            marketing, newsletter e uso de cookies não essenciais;
          </li>
          <li>
            <strong>Execução de contrato ou procedimentos preliminares</strong>{" "}
            &mdash; para responder a solicitações e prestar serviços;
          </li>
          <li>
            <strong>Legítimo interesse</strong> &mdash; para análise de audiência,
            segurança, melhoria do site e prevenção a fraudes, sempre respeitando
            seus direitos e expectativas;
          </li>
          <li>
            <strong>Cumprimento de obrigação legal ou regulatória</strong> &mdash;
            quando exigido por lei.
          </li>
        </ul>
      </Section>

      <Section n="5" title="Cookies e tecnologias de rastreamento">
        <p>
          Utilizamos cookies e tecnologias similares para o funcionamento do site,
          análise de tráfego e marketing. Cookies essenciais são necessários ao
          funcionamento; os demais dependem do seu consentimento. Você pode gerenciar
          ou bloquear cookies nas configurações do seu navegador, ciente de que isso
          pode afetar algumas funcionalidades.
        </p>
        <p>Entre as ferramentas e operadores que utilizamos estão:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Google Analytics</strong> (Google) &mdash; medição de audiência e
            comportamento de navegação;
          </li>
          <li>
            <strong>PostHog</strong> &mdash; análise de produto, eventos de uso,
            mapas de calor e gravações anonimizadas de sessão (com os campos de
            formulário mascarados) para entender a experiência de uso;
          </li>
          <li>
            <strong>Meta Pixel</strong> (Meta/Facebook) &mdash; mensuração e
            remarketing de campanhas publicitárias;
          </li>
          <li>
            <strong>Resend</strong> &mdash; envio de e-mails transacionais e de
            marketing.
          </li>
        </ul>
      </Section>

      <Section n="6" title="Compartilhamento de dados">
        <p>
          A Kaleidos não vende seus dados pessoais. Podemos compartilhar dados com:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Operadores e prestadores de serviço</strong> que tratam dados em
            nosso nome (por exemplo, os fornecidos na seção 5: Google, PostHog, Meta
            e Resend), sob obrigações contratuais de confidencialidade e
            segurança;
          </li>
          <li>
            <strong>Autoridades públicas</strong>, quando necessário para cumprir
            obrigação legal ou ordem judicial;
          </li>
          <li>
            <strong>Terceiros em operações societárias</strong> (fusão, aquisição ou
            reestruturação), mantida a finalidade original do tratamento.
          </li>
        </ul>
        <p>
          Alguns operadores podem armazenar dados fora do Brasil. Nesses casos,
          adotamos as salvaguardas exigidas pela LGPD para transferências
          internacionais de dados.
        </p>
      </Section>

      <Section n="7" title="Retenção e eliminação">
        <p>
          Mantemos os dados pessoais apenas pelo tempo necessário às finalidades
          descritas nesta Política, ou pelo período exigido por obrigações legais e
          regulatórias. Encerrada a finalidade, os dados são eliminados ou
          anonimizados, ressalvadas as hipóteses de guarda permitidas pelo art. 16 da
          LGPD.
        </p>
      </Section>

      <Section n="8" title="Direitos do titular">
        <p>
          Nos termos do art. 18 da LGPD, você pode, a qualquer momento, solicitar:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Confirmação da existência de tratamento;</li>
          <li>Acesso aos dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados
            em desconformidade;
          </li>
          <li>Portabilidade dos dados a outro fornecedor;</li>
          <li>
            Eliminação dos dados tratados com base no consentimento;
          </li>
          <li>
            Informação sobre o compartilhamento dos seus dados;
          </li>
          <li>
            Revogação do consentimento e informação sobre as consequências da recusa.
          </li>
        </ul>
        <p>
          Para exercer esses direitos, entre em contato pelo e-mail{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          . Poderemos solicitar informações para confirmar sua identidade antes de
          atender ao pedido.
        </p>
      </Section>

      <Section n="9" title="Segurança da informação">
        <p>
          Adotamos medidas técnicas e organizacionais para proteger seus dados contra
          acessos não autorizados, perda, alteração ou destruição. Nenhum sistema é
          totalmente imune a riscos; em caso de incidente relevante, comunicaremos os
          titulares e a Autoridade Nacional de Proteção de Dados (ANPD) na forma da
          lei.
        </p>
      </Section>

      <Section n="10" title="Encarregado (DPO)">
        <p>
          O encarregado pelo tratamento de dados pessoais (DPO) pode ser contatado
          pelo e-mail{" "}
          <strong>[E-MAIL DO DPO]</strong> (ou{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          ), responsável por receber comunicações dos titulares e da ANPD.
        </p>
      </Section>

      <Section n="11" title="Alterações desta Política">
        <p>
          Esta Política pode ser atualizada a qualquer momento. A versão vigente é
          sempre a publicada nesta página, com a respectiva data de vigência indicada
          no topo. Recomendamos revisá-la periodicamente.
        </p>
      </Section>

      <Section n="12" title="Contato">
        <p>
          Em caso de dúvidas sobre esta Política ou sobre o tratamento dos seus dados,
          fale com a Kaleidos pelo e-mail{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          .
        </p>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Privacy Policy — English (summary, LGPD-based)                     */
/* ------------------------------------------------------------------ */

function PolicyEN() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-10">
        This Privacy Policy explains how Kaleidos (&ldquo;Kaleidos&rdquo;,
        &ldquo;we&rdquo;) collects, uses, stores, shares and protects the personal
        data of visitors and users of <strong>kaleidos.com.br</strong> and related
        pages and services. Data processing follows the Brazilian General Data
        Protection Law &mdash; LGPD (Law No. 13.709/2018). By using our website, you
        acknowledge this Policy.
      </p>

      <Section n="1" title="Data controller">
        <p>
          The controller responsible for processing your personal data is Kaleidos,
          registered under CNPJ No. <strong>[CNPJ]</strong>, located at{" "}
          <strong>[FULL ADDRESS]</strong>. For privacy matters, contact{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          .
        </p>
      </Section>

      <Section n="2" title="Data we collect">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Data you provide:</strong> name, email, phone, company and
            messages submitted through contact, lead, newsletter or material-download
            forms.
          </li>
          <li>
            <strong>Usage data:</strong> IP address, browser and device data, pages
            visited, referrer, campaign parameters (UTMs) and interactions, collected
            via cookies and similar technologies.
          </li>
        </ul>
      </Section>

      <Section n="3" title="Purposes and legal basis">
        <p>
          We process data to reply to requests, provide our services, send marketing
          communications (with consent), deliver requested materials, measure
          audience and improve the site. Legal bases include consent, performance of
          a contract, legitimate interest and compliance with legal obligations.
        </p>
      </Section>

      <Section n="4" title="Cookies and processors">
        <p>
          We use cookies and tools such as <strong>Google Analytics</strong>,{" "}
          <strong>PostHog</strong>, <strong>Meta Pixel</strong> and{" "}
          <strong>Resend</strong> as processors for analytics, advertising and email.
          You can manage cookies in your browser settings.
        </p>
      </Section>

      <Section n="5" title="Sharing and retention">
        <p>
          We do not sell your data. We may share it with the processors above,
          public authorities when legally required, and third parties in corporate
          transactions. Data is kept only as long as necessary for the stated
          purposes or as required by law.
        </p>
      </Section>

      <Section n="6" title="Your rights">
        <p>
          Under the LGPD you may request confirmation, access, correction,
          anonymization, portability, deletion and information about sharing, and may
          revoke consent. To exercise these rights, contact{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          . Our Data Protection Officer (DPO) can be reached at{" "}
          <strong>[DPO EMAIL]</strong>.
        </p>
      </Section>

      <Section n="7" title="Changes and contact">
        <p>
          We may update this Policy; the current version is the one published here.
          Questions? Email{" "}
          <a
            href="mailto:contato@kaleidos.com.br"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            contato@kaleidos.com.br
          </a>
          .
        </p>
      </Section>
    </>
  );
}
