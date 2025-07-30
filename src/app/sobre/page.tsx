"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Target, Users, Award, Lightbulb, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
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
            Kaleidos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Transformamos ideias em experiências digitais que viralizam e conectam marcas com suas audiências de forma autêntica e impactante.
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
                Nossa História
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.0 }}
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
              >
                <p>
                  A Kaleidos nasceu da paixão por criar conteúdo que não apenas vende, mas que conecta e transforma. 
                  Começamos como uma pequena equipe de criativos apaixonados por tecnologia e design.
                </p>
                <p>
                  Nossa jornada evoluiu de edição de vídeos simples para estratégias completas de marketing digital. 
                  Descobrimos que o verdadeiro poder está na combinação de criatividade, tecnologia e dados.
                </p>
                <p>
                  Hoje, somos uma equipe multidisciplinar que acredita que cada marca tem uma história única para contar. 
                  Nossa missão é transformar essas histórias em experiências digitais que viralizam e convertem.
                </p>
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
                  <p className="text-sm font-medium">Desde 2023</p>
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
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os pilares que guiam cada projeto e decisão
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Sparkles,
                title: "Criatividade Sem Limites",
                description: "Acreditamos que não há limites para a criatividade. Cada projeto é uma oportunidade de inovar e surpreender."
              },
              {
                icon: Target,
                title: "Resultados Mensuráveis",
                description: "Não criamos apenas conteúdo bonito. Criamos estratégias que geram resultados reais e mensuráveis."
              },
              {
                icon: Users,
                title: "Foco no Cliente",
                description: "O sucesso do nosso cliente é o nosso sucesso. Trabalhamos lado a lado para alcançar os objetivos."
              },
              {
                icon: Award,
                title: "Excelência em Tudo",
                description: "Do primeiro contato à entrega final, buscamos a excelência em cada detalhe do processo."
              },
              {
                icon: Lightbulb,
                title: "Inovação Constante",
                description: "Sempre em busca das melhores práticas e tecnologias para entregar soluções de ponta."
              },
              {
                icon: Zap,
                title: "Agilidade e Eficiência",
                description: "Entendemos que tempo é dinheiro. Trabalhamos com agilidade sem comprometer a qualidade."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.8 + (index * 0.1) }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
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
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profissionais apaixonados por criar experiências digitais extraordinárias
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Designers Criativos",
                role: "Visual & UX/UI",
                description: "Especialistas em criar interfaces que encantam e convertem"
              },
              {
                name: "Editores de Vídeo",
                role: "Motion & Storytelling",
                description: "Contadores de histórias visuais que viralizam"
              },
              {
                name: "Estrategistas Digitais",
                role: "Marketing & Growth",
                description: "Especialistas em estratégias que geram resultados"
              },
              {
                name: "Desenvolvedores",
                role: "Tech & Innovation",
                description: "Criadores de soluções tecnológicas inovadoras"
              },
              {
                name: "Analistas de Dados",
                role: "Insights & Performance",
                description: "Especialistas em métricas e otimização"
              },
              {
                name: "Gestores de Projeto",
                role: "Coordination & Delivery",
                description: "Garantem que tudo seja entregue no prazo e com qualidade"
              }
            ].map((member, index) => (
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
              Nossos Números
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.8 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Resultados que falam por si só
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
              Pronto para fazer parte da nossa história?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 5.4 }}
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Vamos criar algo incrível juntos e transformar sua marca em uma referência no digital
            </motion.p>
            <Link 
              href="/#ajuda-section"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Vamos Conversar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
} 