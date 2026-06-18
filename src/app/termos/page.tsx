"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { FooterDemo } from "@/components/ui/footer-demo";

// Data de vigência dos Termos. Atualizar quando o documento for revisado.
const EFFECTIVE_DATE_ISO = "2026-06-17";
const EFFECTIVE_DATE_LABEL_PT = "17 de junho de 2026";
const EFFECTIVE_DATE_LABEL_EN = "June 17, 2026";

export default function TermosPage() {
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
          {isEn ? "Terms of Use" : "Termos de Uso"}
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          {isEn ? "Effective date: " : "Vigência a partir de: "}
          <time dateTime={EFFECTIVE_DATE_ISO}>
            {isEn ? EFFECTIVE_DATE_LABEL_EN : EFFECTIVE_DATE_LABEL_PT}
          </time>
        </p>

        {isEn ? <TermsEN /> : <TermsPT />}
      </article>

      <FooterDemo />
    </main>
  );
}

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
/* Termos — Português                                                 */
/* ------------------------------------------------------------------ */

function TermsPT() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-10">
        Estes Termos de Uso (&ldquo;Termos&rdquo;) regem o acesso e a utilização do
        site <strong>kaleidos.com.br</strong> e das páginas, conteúdos e serviços
        nele disponibilizados pela Kaleidos (&ldquo;Kaleidos&rdquo;, &ldquo;nós&rdquo;).
        Ao acessar ou utilizar o site, você concorda integralmente com estes Termos.
        Caso não concorde, não utilize o site.
      </p>

      <Section n="1" title="Objeto">
        <p>
          Este site tem caráter institucional e informativo. Apresenta os serviços da
          Kaleidos, estudos de caso, materiais educativos (como blog e Papers) e
          canais de contato. O uso do site não cria, por si só, qualquer relação
          contratual de prestação de serviços, que será sempre formalizada em
          instrumento próprio.
        </p>
      </Section>

      <Section n="2" title="Uso do site e do conteúdo">
        <p>
          Você se compromete a utilizar o site de forma lícita, de boa-fé e em
          conformidade com a legislação aplicável. É vedado, entre outras condutas:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Praticar atos que comprometam a segurança ou a disponibilidade do site;</li>
          <li>Realizar engenharia reversa, raspagem (scraping) não autorizada ou cópia em massa do conteúdo;</li>
          <li>Utilizar o conteúdo para fins ilícitos, fraudulentos ou que violem direitos de terceiros;</li>
          <li>Reproduzir, distribuir ou explorar comercialmente o conteúdo sem autorização.</li>
        </ul>
        <p>
          O conteúdo educativo, incluindo blog e Papers, tem finalidade exclusivamente
          informativa e educacional.
        </p>
      </Section>

      <Section n="3" title="Conteúdo educativo e ausência de recomendação de investimento">
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-gray-800">
          <strong>Aviso importante sobre criptoativos.</strong> Os Papers, posts de
          blog, estudos de caso e demais materiais publicados neste site têm caráter
          estritamente educativo e informativo. <strong>Nada aqui constitui
          recomendação, consultoria ou aconselhamento de investimento</strong>,
          oferta, solicitação ou indicação de compra ou venda de qualquer criptoativo,
          token, valor mobiliário ou produto financeiro.
        </p>
        <p>
          O mercado de criptoativos é volátil e de alto risco. Resultados passados não
          garantem resultados futuros, e você pode perder a totalidade do capital
          investido. A Kaleidos não é instituição financeira, corretora, consultora de
          valores mobiliários nem agente autônomo de investimentos. Qualquer menção a
          projetos, tokens ou estratégias é apenas ilustrativa, no contexto de
          marketing e comunicação. <strong>Antes de tomar qualquer decisão financeira,
          faça sua própria pesquisa e consulte um profissional habilitado e
          devidamente registrado.</strong> Você é o único responsável pelas suas
          decisões.
        </p>
      </Section>

      <Section n="4" title="Propriedade intelectual">
        <p>
          Todo o conteúdo do site &mdash; incluindo textos, marcas, logotipos, layout,
          design, código, imagens, vídeos, Papers e estudos de caso &mdash; é de
          titularidade da Kaleidos ou de seus licenciadores e é protegido pela
          legislação de propriedade intelectual e direitos autorais. É vedada a
          utilização, reprodução, modificação ou distribuição sem autorização prévia e
          por escrito da Kaleidos, ressalvado o compartilhamento pessoal e não
          comercial com a devida atribuição da fonte.
        </p>
      </Section>

      <Section n="5" title="Isenção de responsabilidade">
        <p>
          O site e seu conteúdo são fornecidos &ldquo;no estado em que se encontram&rdquo;.
          Embora nos esforcemos pela exatidão das informações, não garantimos que o
          conteúdo esteja sempre completo, atualizado ou livre de erros, nem que o site
          funcione de forma ininterrupta ou isenta de falhas.
        </p>
        <p>
          Na máxima extensão permitida pela lei, a Kaleidos não se responsabiliza por
          danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso do
          site, de decisões tomadas com base em seu conteúdo, ou de indisponibilidades
          técnicas e de terceiros.
        </p>
      </Section>

      <Section n="6" title="Links de terceiros">
        <p>
          O site pode conter links para sites e serviços de terceiros. Esses links são
          oferecidos por conveniência e não implicam endosso. A Kaleidos não controla
          nem se responsabiliza pelo conteúdo, políticas ou práticas de sites de
          terceiros, cujo acesso ocorre por sua conta e risco.
        </p>
      </Section>

      <Section n="7" title="Privacidade">
        <p>
          O tratamento de dados pessoais realizado por meio do site é regido por nossa{" "}
          <Link
            href="/privacidade"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            Política de Privacidade
          </Link>
          , que integra estes Termos.
        </p>
      </Section>

      <Section n="8" title="Alterações dos Termos">
        <p>
          Podemos alterar estes Termos a qualquer momento. A versão vigente é sempre a
          publicada nesta página, com a data de vigência indicada no topo. O uso
          continuado do site após eventuais alterações implica concordância com a nova
          versão.
        </p>
      </Section>

      <Section n="9" title="Lei aplicável e foro">
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica
          eleito o foro da comarca de <strong>[CIDADE/UF]</strong> para dirimir
          quaisquer controvérsias, com renúncia a qualquer outro, por mais privilegiado
          que seja.
        </p>
      </Section>

      <Section n="10" title="Contato">
        <p>
          Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail{" "}
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
/* Terms of Use — English                                             */
/* ------------------------------------------------------------------ */

function TermsEN() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-10">
        These Terms of Use (&ldquo;Terms&rdquo;) govern access to and use of{" "}
        <strong>kaleidos.com.br</strong> and the pages, content and services provided
        by Kaleidos (&ldquo;Kaleidos&rdquo;, &ldquo;we&rdquo;). By using the website,
        you fully agree to these Terms. If you do not agree, do not use the website.
      </p>

      <Section n="1" title="Purpose">
        <p>
          This website is institutional and informational. It presents Kaleidos&rsquo;
          services, case studies, educational materials (blog and Papers) and contact
          channels. Use of the website does not by itself create any service
          agreement, which is always formalized in a separate instrument.
        </p>
      </Section>

      <Section n="2" title="Use of the website and content">
        <p>
          You agree to use the website lawfully and in good faith. Reverse
          engineering, unauthorized scraping, bulk copying and any unlawful or
          rights-infringing use are prohibited. Blog and Papers content is provided for
          informational and educational purposes only.
        </p>
      </Section>

      <Section n="3" title="Educational content &mdash; not investment advice">
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-gray-800">
          <strong>Important crypto disclaimer.</strong> The Papers, blog posts, case
          studies and other materials on this website are strictly educational and
          informational. <strong>Nothing here constitutes investment advice,</strong>{" "}
          an offer, solicitation or recommendation to buy or sell any cryptoasset,
          token, security or financial product.
        </p>
        <p>
          The cryptoasset market is volatile and high-risk; past performance does not
          guarantee future results and you may lose all invested capital. Kaleidos is
          not a financial institution, broker or investment advisor. Always do your own
          research and consult a licensed professional before making financial
          decisions. You are solely responsible for your decisions.
        </p>
      </Section>

      <Section n="4" title="Intellectual property">
        <p>
          All website content &mdash; text, trademarks, logos, layout, design, code,
          images, videos, Papers and case studies &mdash; belongs to Kaleidos or its
          licensors and is protected by intellectual property law. Use, reproduction,
          modification or distribution without our prior written consent is prohibited,
          except for personal, non-commercial sharing with proper attribution.
        </p>
      </Section>

      <Section n="5" title="Disclaimer of liability">
        <p>
          The website and its content are provided &ldquo;as is&rdquo;. We do not
          guarantee that content is complete, current or error-free, or that the site
          operates without interruption. To the maximum extent permitted by law,
          Kaleidos is not liable for direct or indirect damages arising from use of, or
          inability to use, the website or its content.
        </p>
      </Section>

      <Section n="6" title="Third-party links">
        <p>
          The website may contain third-party links provided for convenience and
          without endorsement. Kaleidos does not control and is not responsible for
          third-party content or practices.
        </p>
      </Section>

      <Section n="7" title="Privacy">
        <p>
          Personal data processed through the website is governed by our{" "}
          <Link
            href="/privacidade"
            className="text-black underline underline-offset-2 hover:text-gray-600"
          >
            Privacy Policy
          </Link>
          , which is part of these Terms.
        </p>
      </Section>

      <Section n="8" title="Changes, governing law and contact">
        <p>
          We may update these Terms; the current version is the one published here.
          These Terms are governed by the laws of the Federative Republic of Brazil,
          with venue in the courts of <strong>[CITY/STATE]</strong>. Questions? Email{" "}
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
