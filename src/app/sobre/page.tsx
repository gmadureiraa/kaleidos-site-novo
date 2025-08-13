"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Target, Users, Award, Lightbulb, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import Image from "next/image";

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

  const teamItems = (isEn
    ? [
        { name: "Creative Designers", role: "Visual & UX/UI", description: "Experts in creating interfaces that delight and convert" },
        { name: "Video Editors", role: "Motion & Storytelling", description: "Visual storytellers whose work goes viral" },
        { name: "Digital Strategists", role: "Marketing & Growth", description: "Specialists in strategies that deliver results" },
        { name: "Developers", role: "Tech & Innovation", description: "Creators of innovative technological solutions" },
        { name: "Data Analysts", role: "Insights & Performance", description: "Experts in metrics and optimization" },
        { name: "Project Managers", role: "Coordination & Delivery", description: "Ensure everything is delivered on time and with quality" },
      ]
    : [
        { name: "Designers Criativos", role: "Visual & UX/UI", description: "Especialistas em criar interfaces que encantam e convertem" },
        { name: "Editores de Vídeo", role: "Motion & Storytelling", description: "Contadores de histórias visuais que viralizam" },
        { name: "Estrategistas Digitais", role: "Marketing & Growth", description: "Especialistas em estratégias que geram resultados" },
        { name: "Desenvolvedores", role: "Tech & Innovation", description: "Criadores de soluções tecnológicas inovadoras" },
        { name: "Analistas de Dados", role: "Insights & Performance", description: "Especialistas em métricas e otimização" },
        { name: "Gestores de Projeto", role: "Coordination & Delivery", description: "Garantem que tudo seja entregue no prazo e com qualidade" },
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
            
            <div className="flex items-center gap-3">
              <Image
                src="/logo/Logos-01.svg"
                alt="Kaleidos Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
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
                  src="/Imagens/nós.jpg"
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

        {/* Nossos Valores */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.4 }}
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
            transition={{ duration: 1.5, delay: 1.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {valuesItems.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.8 + (index * 0.1) }}
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

        {/* Nossa Equipe */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.4 }}
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
            transition={{ duration: 1.5, delay: 2.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamItems.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2.8 + (index * 0.1) }}
                className="text-center group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">{member.name}</h3>
                <p className="text-gray-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
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
            transition={{ duration: 1.5, delay: 3.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black font-display">
              {t('about','ourNumbers')}
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.8 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {t('about','numbersSubtitle')}
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 4.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">150+</div>
              <div className="text-gray-600 font-medium">Vídeos Editados</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.4 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">20M+</div>
              <div className="text-gray-600 font-medium">Views nos Reels</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.6 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">50+</div>
              <div className="text-gray-600 font-medium">Lançamentos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.8 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">98%</div>
              <div className="text-gray-600 font-medium">Satisfação</div>
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
            transition={{ duration: 1.5, delay: 5.0 }}
            className="bg-black p-12 md:p-16 rounded-3xl text-white"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 5.2 }}
              className="text-3xl md:text-4xl font-bold mb-6 font-display"
            >
              {t('about','ctaTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 5.4 }}
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
    </main>
  );
} 