"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ArrowRight, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";
import { FooterDemo } from "@/components/ui/footer-demo";
import { KALEIDOS_METRICS } from "@/lib/metrics";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export default function SobrePage() {
  const { t, locale } = useI18n();
  const withLang = (path: string) => locale === 'en' ? `${path}${path.includes('?') ? '&' : '?' }lang=en` : path;
  const isEn = locale === 'en';

  const historyParagraphs = isEn
    ? [
        "Kaleidos was born from the passion for creating content that not only sells, but also connects and transforms. We started as a small team of creatives passionate about technology and design.",
        "Our journey evolved from simple video editing to complete digital marketing strategies. We discovered that the real power lies in combining creativity, technology, and data.",
        "Today, we are a multidisciplinary team that believes every brand has a unique story to tell. Our mission is to turn these stories into digital experiences that go viral and convert.",
      ]
    : [
        "A Kaleidos nasceu da paixão por criar conteúdo que não apenas vende, mas que conecta e transforma. ",
        "Nossa jornada evoluiu de edição de vídeos simples para estratégias completas de marketing digital. ",
        "Hoje, somos uma equipe multidisciplinar que acredita que cada marca tem uma história única para contar.",
      ];

  const valuesItems = (isEn
    ? [
        { title: "Boundless Creativity", description: "We believe there are no limits to creativity. Every project is an opportunity to innovate and surprise." },
        { title: "Measurable Results", description: "We don’t just create pretty content. We build strategies that generate real, measurable results." },
        { title: "Customer Focus", description: "Our client's success is our success. We work side by side to achieve the goals." },
        { title: "Excellence in Everything", description: "From the first contact to the final delivery, we strive for excellence in every detail." },
        { title: "Constant Innovation", description: "Always seeking the best practices and technologies to deliver cutting-edge solutions." },
        { title: "Agility and Efficiency", description: "We know time is money. We work fast without compromising quality." },
      ]
    : [
        { title: "Criatividade Sem Limites", description: "Acreditamos que não há limites para a criatividade. Cada projeto é uma oportunidade de inovar e surpreender." },
        { title: "Resultados Mensuráveis", description: "Não criamos apenas conteúdo bonito. Criamos estratégias que geram resultados reais e mensuráveis." },
        { title: "Foco no Cliente", description: "O sucesso do nosso cliente é o nosso sucesso. Trabalhamos lado a lado para alcançar os objetivos." },
        { title: "Excelência em Tudo", description: "Do primeiro contato à entrega final, buscamos a excelência em cada detalhe do processo." },
        { title: "Inovação Constante", description: "Sempre em busca das melhores práticas e tecnologias para entregar soluções de ponta." },
        { title: "Agilidade e Eficiência", description: "Entendemos que tempo é dinheiro. Trabalhamos com agilidade sem comprometer a qualidade." },
      ]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href={withLang('/')} 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('about','backHome')}
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-8 font-display text-black leading-tight"
          >
            {t('about','heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
          >
            {t('about','heroTagline')}
          </motion.p>
        </motion.div>

        {/* Nossa História */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="text-3xl md:text-4xl font-bold mb-8 text-black font-display"
              >
                {t('about','ourHistory')}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.0 }}
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
              >
                {historyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="relative"
            >
              <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/Kaleidos/imagens/nós.jpg"
                  alt="Equipe Kaleidos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">{t('about','since')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Nossa Equipe */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black font-display">
              {t('about','ourTeam')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about','teamSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="relative"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {[
                  // Co-founders primeiro
                  { 
                    name: "Gabriel Madureira", 
                    role: "Co-Founder",
                    image: "/Kaleidos/imagens/Equipe/Madureira.png",
                    description: "Pode ser considerado o lado criativo do cérebro da Kaleidos. Especialista no mercado cripto e copywriter, trouxe um novo paradigma nas estratégias de marketing para o mundo cripto, sabendo lidar com as pessoas da melhor forma.",
                    social: {
                      instagram: "https://www.instagram.com/gabrielmadureira",
                      twitter: "https://twitter.com/gabrielmadureira",
                      linkedin: "https://www.linkedin.com/in/gabrielmadureira",
                      email: "gabriel@kaleidos.digital"
                    }
                  },
                  { 
                    name: "Nathalia Maciente", 
                    role: "Co-founder",
                    image: "/Kaleidos/imagens/Equipe/Nathalia.png",
                    description: "É o lado atento e organizado do cérebro da Kaleidos. Não deixa nada passar pelo seu olhar atento, tornando cada conteúdo e estratégia feitos com extrema perfeição. Editora de vídeo e organizadora maior do time Kaleidos.",
                    social: {
                      instagram: "https://www.instagram.com/nathaliamaciente",
                      linkedin: "https://www.linkedin.com/in/nathaliamaciente",
                      email: "nathalia@kaleidos.digital"
                    }
                  },
                  // Copywriter
                  { 
                    name: "Caio Crispim", 
                    role: "Copywriter",
                    image: "/Kaleidos/imagens/Equipe/Caio.png",
                    description: "É o nosso escritor e criador sênior. Já passou por várias big techs do mercado cripto e, com milhares de conteúdos em seu histórico, consegue entregar cada texto da melhor forma possível.",
                    social: {
                      instagram: "https://www.instagram.com/caiocrispim",
                      linkedin: "https://www.linkedin.com/in/caiocrispim",
                      email: "caio@kaleidos.digital"
                    }
                  },
                  // Social Media
                  { 
                    name: "Gabriel Rebelo", 
                    role: "Social Media",
                    image: "/Kaleidos/imagens/Equipe/Rebelo.png",
                    description: "O social media criativo do time. Todos os posts passam por ele, e cria os melhores stories que você poderia encontrar. Entende o mercado cripto como poucos.",
                    social: {
                      instagram: "https://www.instagram.com/gabrielrebelo",
                      twitter: "https://twitter.com/gabrielrebelo",
                      linkedin: "https://www.linkedin.com/in/gabrielrebelo",
                      email: "gabriel.rebelo@kaleidos.digital"
                    }
                  },
                  // Editor de vídeo e Motion
                  { 
                    name: "Alef Damacena", 
                    role: "Editor de vídeo e Motion",
                    image: "/Kaleidos/imagens/Equipe/Alef.png",
                    description: "Especialista em edição de vídeo e motion, consegue trazer as melhores animações para os nossos conteúdos visuais.",
                    social: {
                      instagram: "https://www.instagram.com/alefdamaceno",
                      linkedin: "https://www.linkedin.com/in/alefdamaceno",
                      email: "alef@kaleidos.digital"
                    }
                  },
                ].map((member, index) => {
                  const TeamCard = () => {
                    const [isFlipped, setIsFlipped] = useState(false);
                    
                    return (
                      <div
                        className="relative w-full h-[400px] group [perspective:2000px]"
                        onMouseEnter={() => setIsFlipped(true)}
                        onMouseLeave={() => setIsFlipped(false)}
                      >
                        <div
                          className={`relative w-full h-full [transform-style:preserve-3d] transition-all duration-700 ${
                            isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                          }`}
                        >
                          {/* Front of card */}
                          <div
                            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden rounded-2xl bg-white border border-black transition-all duration-700 ${
                              isFlipped ? "opacity-0" : "opacity-100"
                            }`}
                            style={{
                              boxShadow: isFlipped 
                                ? '0 0 0 rgba(0, 0, 0, 0)' 
                                : '0 2px 8px rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            <div className="flex flex-col items-center justify-center h-full p-8">
                              <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-gray-200 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                  sizes="128px"
                                />
                              </div>
                              <h3 className="text-xl font-bold mb-2 text-black text-center">{member.name}</h3>
                              <p className="text-gray-500 font-medium text-center mb-4">{member.role}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>Passe o mouse</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>

                          {/* Back of card */}
                          <div
                            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 rounded-2xl bg-white border border-black flex flex-col transition-all duration-700 ${
                              !isFlipped ? "opacity-0" : "opacity-100"
                            }`}
                            style={{
                              boxShadow: !isFlipped 
                                ? '0 0 0 rgba(0, 0, 0, 0)' 
                                : '0 2px 8px rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            <div className="flex-1 space-y-4">
                              <div className="text-center">
                                <h3 className="text-lg font-bold mb-2 text-black">{member.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed text-center">
                                {member.description}
                              </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-200">
                              <div className="flex items-center justify-center gap-4">
                                {member.social.instagram && (
                                  <a
                                    href={member.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-pink-500 transition-colors"
                                    aria-label="Instagram"
                                  >
                                    <Instagram className="h-5 w-5" />
                                  </a>
                                )}
                                {member.social.twitter && (
                                  <a
                                    href={member.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                    aria-label="Twitter"
                                  >
                                    <Twitter className="h-5 w-5" />
                                  </a>
                                )}
                                {member.social.linkedin && (
                                  <a
                                    href={member.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                    aria-label="LinkedIn"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {member.social.email && (
                                  <a
                                    href={`mailto:${member.social.email}`}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Email"
                                  >
                                    <Mail className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.7 + (index * 0.1) }}
                        className="py-4"
                      >
                        <TeamCard />
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </motion.div>
        </motion.section>

        {/* Nossos Valores */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.9 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black font-display">
              {t('about','ourValues')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about','valuesSubtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {valuesItems.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2.3 + (index * 0.1) }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Nossos Números */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.9 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black font-display">
              {t('about','ourNumbers')}
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {t('about','numbersSubtitle')}
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 3.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">{isEn ? KALEIDOS_METRICS.videosEditados_en : KALEIDOS_METRICS.videosEditados}</div>
              <div className="text-gray-600 font-medium">{isEn ? 'Edited Videos' : 'Vídeos Editados'}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.7 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">{isEn ? KALEIDOS_METRICS.viewsReels_en : KALEIDOS_METRICS.viewsReels}</div>
              <div className="text-gray-600 font-medium">{isEn ? 'Reels Views' : 'Views nos Reels'}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.9 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">{isEn ? KALEIDOS_METRICS.lancamentos_en : KALEIDOS_METRICS.lancamentos}</div>
              <div className="text-gray-600 font-medium">{isEn ? 'Launches' : 'Lançamentos'}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">{isEn ? KALEIDOS_METRICS.satisfacaoCliente_en : KALEIDOS_METRICS.satisfacaoCliente}</div>
              <div className="text-gray-600 font-medium">{isEn ? 'Satisfaction' : 'Satisfação'}</div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* CTA Final */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 4.3 }}
            className="bg-black p-12 md:p-16 rounded-3xl text-white"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.5 }}
              className="text-3xl md:text-4xl font-bold mb-6 font-display"
            >
              {t('about','ctaTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.7 }}
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            >
              {t('about','ctaText')}
            </motion.p>
              <Link 
                href={withLang('/#ajuda-section')}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
                {t('about','ctaButton')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.section>
      </div>
      
      {/* Footer */}
      <FooterDemo />
    </main>
  );
} 