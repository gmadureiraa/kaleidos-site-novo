import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { FooterDemo } from "@/components/ui/footer-demo";

const whatsappHref = (origem: string) => {
  const text = `Oi Gabriel! Li a carta da Kaleidos AI (origem: ${origem}). Quero conversar sobre o gargalo:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

const Rule = () => (
  <hr className="my-12 border-0 text-center text-[#8a8478] before:content-['*_*_*'] before:tracking-[0.6em]" />
);

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const CTAButton = ({
  origem,
  children,
}: {
  origem: string;
  children: React.ReactNode;
}) => (
  <a
    href={whatsappHref(origem)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#25D366] text-black font-sans text-base sm:text-lg font-semibold px-8 py-5 border-2 border-[#1a1a1a] hover:bg-[#1ebe57] transition-colors text-center no-underline tracking-tight"
  >
    <WhatsAppIcon className="h-5 w-5" />
    {children}
  </a>
);

export default function CartaIAPage() {
  return (
    <main className="bg-[#f5f1e8] text-[#1a1a1a] font-[family-name:var(--font-atelier)] min-h-screen pt-24 pb-32">
      <article className="mx-auto max-w-[680px] px-6 sm:px-8 leading-[1.65] text-[18px] sm:text-[19px]">

        {/* Eyebrow */}
        <p className="text-[13px] tracking-[0.18em] uppercase text-[#8a8478] mb-8 font-sans">
          Carta · Kaleidos AI · IA dentro da operação
        </p>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6 font-normal">
          Recuperei até 70% do dia da operação dos meus clientes sem trocar uma ferramenta sequer.
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl leading-relaxed text-[#3a3530] mb-10">
          IA instalada dentro do fluxo que já existe, código entregue no repositório do cliente, zero SaaS de aluguel. É isso que a Kaleidos faz hoje em 8 operações ativas.
        </p>

        <Rule />

        <p>
          <strong>De:</strong> Gabriel Madureira · <strong>Founder Kaleidos · São Paulo</strong>
        </p>
        <p>
          <strong>Pra:</strong> quem opera um negócio que já funciona, mas trava em tarefa repetitiva que nenhuma contratação resolve.
        </p>

        <Rule />

        <p>
          Se você roda uma operação de 5 a 50 pessoas, fatura entre R$50k e R$500k por mês, e percebe que o time gasta a maior parte do dia em tarefa que <em>não devia mais existir em 2026</em>, essa carta é pra você.
        </p>

        <p>
          Não vou tentar te vender uma plataforma. Não tenho dashboard pra te empurrar nem SaaS disfarçado de cobrança mensal. O que eu tenho é um time que entra dentro da sua operação, audita os gargalos reais, instala IA <em>onde o trabalho acontece</em>, e devolve o código pro seu repositório.
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Como cheguei a esse modelo
        </h2>

        <p>
          A Kaleidos começou como agência de conteúdo. Três anos atrás, eu mesmo era o gargalo: time de cinco pessoas pra atender oito clientes, carrossel feito frame a frame, briefing levando três dias.
        </p>

        <p>
          Em 2023 instalei o primeiro pipeline de IA dentro da nossa própria operação. Brief de três linhas virou carrossel pronto em trinta segundos. Pesquisa de tema caiu de três dias pra trinta minutos. Atendimento N1 caiu de quatro horas pra oito segundos. A margem da agência bateu 60% pela primeira vez.
        </p>

        <p>
          Cliente que via o que rodava aqui dentro queria a mesma coisa instalada na operação dele. Aí nasceu a Kaleidos AI.
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          O problema que você evita olhar
        </h2>

        <p>
          Você sabe operar. O negócio entrega, cliente paga, time bate prazo, reputação intacta. Você não é um fudido — de certa forma, está vencendo. Mas sabe que já deveria estar em outro patamar, e nada é mais agonizante do que viver abaixo do que poderia.
        </p>

        <p>
          A última vez que você olhou pra operação, contou pelo menos cinco tarefas repetitivas que sugam time todo dia. Atendimento que responde as mesmas trinta perguntas. Cobrança feita na planilha. Pitch deck montado no Keynote. Reunião gravada que ninguém escuta. Brief que perde contexto entre três pessoas.
        </p>

        <p>
          E a saída convencional é contratar. Mais um SDR, mais um designer, mais um analista. Mais custo fixo, mais gente pra gerenciar.
        </p>

        <p>
          O agravante em 2026: <strong>quem instalou IA dentro da operação no ano passado tá fazendo 3x mais trabalho com o mesmo time.</strong> Quem não instalou tá perdendo margem todo mês pra alguém que instalou.
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Por que IA <em>dentro</em> do fluxo, não <em>em volta</em>
        </h2>

        <p>
          A maioria das agências e consultorias que vende "IA" hoje vende a mesma coisa: uma plataforma proprietária com selo de IA, cobrança mensal travada, e um dashboard que ninguém abre depois do segundo mês. É lock-in disfarçado de inovação.
        </p>

        <p>
          A Kaleidos roda o oposto. Eu instalo o agente <em>dentro</em> do chat de suporte que seu time já usa. Dentro do Notion que sua operação já documenta. Dentro do Stripe e do WhatsApp que sua cobrança já roda. O time não muda de ferramenta — só nota, depois de uma semana, que o trabalho que antes consumia quatro horas agora consome oito segundos.
        </p>

        <p>
          E o código fica no repositório do cliente. Sem lock-in. Se a Kaleidos sumir amanhã, o sistema continua rodando.
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Seis dores que a gente já resolveu
        </h2>

        <p className="text-[#3a3530]">
          Em vez de listar feature, listo gente. Operações reais que rodam IA Kaleidos hoje. Nome fictício, números arredondados, dor honesta.
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          1. A agência que tinha três pessoas atendendo o mesmo cliente
        </h3>

        <p>
          Beatriz tocava uma agência boutique de marketing imobiliário. Quatorze clientes ativos, time de oito, e três pessoas em tempo integral só pra responder dúvida operacional no WhatsApp: "Tem o relatório de outubro?" "Quando sai a próxima campanha?" Trinta vezes por semana, com tempo médio de resposta de quatro horas.
        </p>

        <p>
          Instalei um agente treinado na base de cada cliente, plugado direto no WhatsApp Business. <strong>Tempo médio caiu pra oito segundos. As três pessoas viraram duas, e a margem subiu 18 pontos em três meses.</strong> Beatriz não trocou ferramenta nem treinou time.
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          2. O consultor financeiro que perdia metade da carteira em follow-up
        </h3>

        <p>
          Renato era consultor financeiro pra famílias com patrimônio acima de R$5MM. Cada reunião rendia plano detalhado anotado no caderno, repassado por email três dias depois. Recompra que devia acontecer em seis meses acontecia em dezoito. O problema não era competência, era retenção de contexto.
        </p>

        <p>
          Instalamos um pipeline simples: cada call entra na plataforma compartilhada, IA transcreve, resume, monta plano executável durante a conversa, manda pros dois lados com prazo e responsável. <strong>Em quatro meses ele dobrou a carteira sem contratar ninguém — hoje atende sessenta famílias sozinho.</strong>
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          3. A criadora que postava em uma rede só e perdia 80% do alcance
        </h3>

        <p>
          Camila tinha 120 mil seguidores no Instagram e zero presença no resto. YouTube morto, LinkedIn travado, X abandonado. Todo vídeo bom rendia no IG e morria — cross-post manual nunca acontecia.
        </p>

        <p>
          Construímos um pipeline que monitora as postagens e gera os derivados por rede: YouTube vira thread no X, carrossel no IG, post no LinkedIn e email pra newsletter — voz preservada, formato adaptado. <strong>Em cinco meses a base saltou de 120 mil pra 410 mil somando as redes. Mesmo esforço de produção, alcance 5x maior.</strong>
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          4. O SaaS que escrevia onboarding na mão pra cada novo usuário
        </h3>

        <p>
          Felipe rodava um SaaS B2B pra clínica médica. Cada novo cliente recebia, na mão, uma sequência de dez emails de onboarding personalizada por segmento, tamanho e plano. Tomava o melhor terço da semana dele.
        </p>

        <p>
          Instalamos lifecycle com ramificação por comportamento. IA gera o email no momento exato, com base no que o usuário fez (ou não fez), mantendo o tom técnico do Felipe. <strong>Retenção na primeira semana subiu de 41% pra 68%. Felipe recuperou três dias do mês.</strong>
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          5. O escritório que passava uma semana montando cada pitch
        </h3>

        <p>
          Mariana é sócia de um escritório de M&A. Cada projeto exigia um pitch deck de quarenta slides no Keynote, gráfico do zero, dado puxado de quatro fontes. O sócio sênior bloqueava uma semana da agenda pra cada um.
        </p>

        <p>
          Construímos um sistema onde os bullets de discovery viram deck estruturado em três horas: design system travado, gráfico gerado a partir da fonte, narrativa amarrada na voz do sócio. <strong>Uma semana virou meio dia. Quatro dias por mês recuperados, e o deck saiu mais consistente do que quando era na mão.</strong>
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          6. A operação que vazava margem em cobrança mês após mês
        </h3>

        <p>
          Eduardo tocava um e-commerce de R$2MM/mês com 14% de inadimplência crônica. Perdia R$280 mil por mês em fatura que ia pro vermelho. Time financeiro tentava cobrar na planilha, com follow-up manual e voz fora da marca.
        </p>

        <p>
          Instalamos a régua: Stripe integrado com WhatsApp Business + email, mensagem na voz da marca, retry inteligente em três níveis, escalada pra humano só em exceção real. <strong>Em dois meses a inadimplência caiu de 14% pra 5,6% — R$170 mil/mês de receita recuperados.</strong> O time voltou a olhar margem por SKU.
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Os três pilares que sustentam o método
        </h2>

        <p>
          Não é magia. É processo. Tem ordem.
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          Pilar 1 — Auditoria honesta
        </h3>

        <p>
          Antes de qualquer linha de código, eu entro na operação. Trinta a quarenta minutos numa call, mapeando os três maiores gargalos. Saio com um documento de uma página: o que automatizar primeiro, o que precisa de processo antes, o que é IA-resolvível e o que <em>não é</em>.
        </p>

        <p>
          Sim, vou te dizer onde IA não resolve. Tem dor que é falta de gente, falta de produto, falta de posicionamento. Vender automação pra esses casos é roubo — não faço.
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          Pilar 2 — Build dentro da stack que já existe
        </h3>

        <p>
          Quatro a oito semanas. Time da Kaleidos (estratégia, dev, copy) implementando direto na operação do cliente. Sprints quinzenais, código no repositório dele desde o dia 1, deploy em produção a partir do mês 1.
        </p>

        <p>
          Sem migração, sem "vamos refazer o sistema", sem ChatGPT em aba paralela. A IA entra no fluxo que já existe, na ferramenta que o time já usa, na voz que a marca já tem.
        </p>

        <h3 className="text-xl sm:text-2xl leading-tight mb-3 mt-10 font-semibold">
          Pilar 3 — Iteração que vira ativo
        </h3>

        <p>
          Mensal. Métrica de hora liberada por pessoa, lead processado, peça produzida — sempre rastreada. Os próximos gargalos são atacados em sequência. O sistema vira ativo da operação, não projeto fechado num PDF.
        </p>

        <p>
          A maioria dos clientes começa por um gargalo e, depois do mês 3, decide instalar mais três. Não porque eu empurro — porque o ROI tá tão claro que eles vêm me cobrar.
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Pra quem é
        </h2>

        <p>
          → Você toca uma agência, escritório ou consultoria com time entre 5 e 50 pessoas. Fatura entre R$50k e R$500k por mês. Já consolidou cliente, prazo, entrega — mas sente que o time gasta o dia em tarefa que IA resolve em segundos.
        </p>

        <p>
          → Você opera um SaaS, e-commerce ou produto digital com clientes pagantes e problema estrutural de retenção, onboarding ou suporte. Sabe que contratar não é a saída, mas não sabe instalar IA sem virar refém de outra plataforma.
        </p>

        <p>
          → Você é founder solo ou consultor especialista que já tem demanda e quer escalar atendimento sem inflar equipe. Cabeça boa, agenda cheia, falta sistema.
        </p>

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Pra quem NÃO é
        </h2>

        <p>→ Quem quer fórmula mágica ou "agente que vende sozinho enquanto você dorme"</p>
        <p>→ Quem busca dashboard bonito pra mostrar pra investidor, sem se importar com ROI real</p>
        <p>→ Quem ainda não validou produto, posicionamento ou oferta</p>
        <p>→ Quem prefere SaaS de aluguel com cobrança recorrente em vez de código próprio</p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Como começa
        </h2>

        <p>
          Diagnóstico gratuito de trinta a quarenta minutos comigo. Sem custo, sem compromisso, sem time comercial em cima.
        </p>

        <p>
          Você me conta o gargalo principal. Eu mapeio os três maiores ao vivo e te devolvo um plano executável. Se fizer sentido pros dois lados, ofereço a implementação completa. Se não fizer, a gente fecha a call e você sai com um plano de ação que pode executar sozinho.
        </p>

        <p>
          Sem fila, sem questionário longo. É WhatsApp direto.
        </p>

        <div className="my-12">
          <CTAButton origem="carta_cta_principal">
            Falar no WhatsApp
          </CTAButton>
        </div>

        <p className="text-[15px] text-[#6a655d] font-sans">
          Sem fidelidade · Sem contrato · Resposta no mesmo dia útil
        </p>

        <Rule />

        <h2 className="text-3xl sm:text-4xl leading-tight mb-5 mt-12 font-semibold">
          Perguntas que recebo na DM
        </h2>

        <p>
          <strong>1. Em quanto tempo eu vejo resultado?</strong>
        </p>

        <p>
          Em trinta dias o primeiro gargalo já tá rodando em produção. Mês 2 a métrica de hora liberada começa a subir. Mês 3 é onde a maioria vê 70% reais de tempo recuperado.
        </p>

        <p>
          <strong>2. O código fica com quem?</strong>
        </p>

        <p>
          Com você. Repositório do cliente, desde o dia 1. Se a Kaleidos sumir amanhã, o sistema continua rodando. Zero lock-in.
        </p>

        <p>
          <strong>3. Funciona pro meu caso? Sou advogado / médico / consultor / agência / SaaS / e-commerce.</strong>
        </p>

        <p>
          Funciona se você tem operação rodando e gargalo claro. Os seis cases acima cobrem agência, consultoria, conteúdo, SaaS, escritório profissional e e-commerce. O método é o mesmo, a aplicação muda.
        </p>

        <p>
          <strong>4. Vocês usam só ChatGPT?</strong>
        </p>

        <p>
          Não. O time roda Gemini 2.5, Claude Sonnet/Opus, GPT-5 e modelos open-source — sempre o que entrega melhor pro caso. O stack de orquestração é nosso, em TypeScript ou Python, dentro do repositório do cliente.
        </p>

        <p>
          <strong>5. Que tipo de suporte tem depois da entrega?</strong>
        </p>

        <p>
          Implementação contínua mensal pra atacar os próximos gargalos. Suporte técnico do que já tá rodando incluído. Cliente nunca fica sozinho com sistema travado.
        </p>

        <Rule />

        <div className="my-12">
          <CTAButton origem="carta_cta_secundario">
            Falar no WhatsApp
          </CTAButton>
        </div>

        <p>
          Gabriel.
        </p>

        <Rule />

        <p>
          <strong>P.S.</strong>
        </p>

        <p>
          Quem instalou IA dentro da operação em 2025 tá fazendo o trabalho de 2026. Quem não instalou ainda tá fazendo o trabalho de 2022, pagando custo de 2026.
        </p>

        <p>
          A diferença não aparece no balanço do próximo trimestre. Aparece daqui a dezoito meses, quando o concorrente que automatizou começar a baixar preço, escalar atendimento e roubar cliente sem contratar.
        </p>

        <p>
          Cedo demais pra agir hoje é tarde demais quando o mercado virar.
        </p>

        <p className="mt-8">
          <Link
            href="/servicos/ia-automacoes-completa"
            className="underline underline-offset-4 decoration-[#8a8478] hover:decoration-[#1a1a1a] text-[#3a3530]"
          >
            ← Ver a página completa com os 17 fluxos automatizados
          </Link>
        </p>

      </article>

      <div className="mt-32">
        <FooterDemo />
      </div>
    </main>
  );
}
