"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const CTA_LINK = "https://wa.me/5564992463702";

function BoldSilencie({ children }: { children: string }) {
  const parts = children.split(/(Silencie)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === "Silencie" ? <strong key={index}>{part}</strong> : part
      )}
    </>
  );
}

const faqs = [
  {
    question: "Nunca meditei. Posso fazer o Silencie?",
    answer: "Sim. As meditações são guiadas e progressivas. Você não precisa ter experiência prévia.",
  },
  {
    question: "Já medito. O programa ainda faz sentido para mim?",
    answer: "Sim. O Silencie aprofunda a prática, trazendo constância, estrutura e novos olhares sobre presença, mente e cotidiano.",
  },
  {
    question: "Quanto tempo por dia preciso dedicar?",
    answer: "Entre 15 a 20 minutos por dia.",
  },
  {
    question: "Haverá acompanhamento durante o programa?",
    answer: "Sim. O Silencie conta com um grupo exclusivo onde a Mentora dá suporte diário, além de encontros ao vivo.",
  },
  {
    question: "Por onde recebo os áudios de meditação?",
    answer: "Os áudios de meditação são enviados diariamente em uma comunidade exclusiva no WhatsApp, criada para sustentar a prática ao longo dos 21 dias. É nesse espaço que você recebe as orientações, os áudios e o acompanhamento do Silencie, caminhando junto com outras pessoas comprometidas com o processo.",
  },
  {
    question: "E se eu não conseguir fazer a meditação no horário que for enviada?",
    answer: "Você pode fazer a meditação no horário que fizer mais sentido para a sua rotina. Os áudios ficam disponíveis para que você pratique no seu tempo.",
  },
  {
    question: "Se eu perder um dia, atrapalha o processo?",
    answer: "Não. Você pode retomar no dia seguinte e seguir no seu ritmo.",
  },
];

const programContent = [
  {
    title: "Núcleo do Silencie",
    items: [
      "Programa de meditação guiada de 21 dias",
      "Práticas focadas em: presença, silêncio mental, autorresponsabilidade, consciência emocional e relação com pensamentos",
    ],
    image: "/photos/card-1.webp",
  },
  {
    title: "Encontros ao vivo",
    items: [
      "Dois encontros online ao vivo com a Mari Campos",
      "Espaço para aprofundar temas como: presença, respiração e sustentação da prática",
    ],
    image: "/photos/card-2.png",
  },
  {
    title: "Yoga",
    items: [
      "Uma aula de yoga presencial",
      "Uma aula de yoga online",
    ],
    image: "/photos/card-3.png",
  },
  {
    title: "Comunidade",
    items: [
      "Acesso a uma comunidade exclusiva no WhatsApp",
    ],
    image: "/photos/card-4.png",
  },
];

const rewards: { text: string; bold?: string; suffix?: string }[] = [
  { text: "Uma vaga de mentoria com Mari Campos" },
  { text: "Uma tiragem de carta (Oráculo)" },
  { text: "Um mês de aula de yoga" },
  { text: "Almofada de meditação" },
  { text: "Kit de produtos naturais e suplementos" },
  { text: "Uma vaga no programa de emagrecimento consciente ", bold: "Desinflame", suffix: " (Mari Ulhoa)" },
];

function FAQItem({
  question,
  answer,
  isLast = false,
}: {
  question: string;
  answer: string;
  isLast?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isLast ? "" : "border-b border-green/20"}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-medium text-foreground"><BoldSilencie>{question}</BoldSilencie></span>
        <span className="ml-4 text-2xl text-green">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-muted leading-relaxed"><BoldSilencie>{answer}</BoldSilencie></p>
      </div>
    </div>
  );
}

export default function Home() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isSoundOn) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsSoundOn(!isSoundOn);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section with Video Background */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ocean Sound */}
        <audio ref={audioRef} loop>
          <source
            src="https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3"
            type="audio/mpeg"
          />
        </audio>

        {/* Header Buttons */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-white transition-all hover:bg-white/30"
            aria-label={isSoundOn ? "Desativar som" : "Ativar som"}
          >
          {isSoundOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
          <span className="text-sm">{isSoundOn ? "Som ligado" : "Som desligado"}</span>
          </button>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 px-6 text-center text-white">
          <Image
            src="/logo-white.svg"
            alt="Silencie"
            width={480}
            height={121}
            priority
            className="mx-auto mb-12"
          />
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90 mb-12">
            O <strong>Silencie</strong> ensina, por meio da prática diária de meditação, como sair do piloto automático, parar de viver reativo e ansioso, e aprender a habitar a própria mente com mais clareza, gentileza e confiança.
          </p>
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-green px-8 py-4 text-lg font-medium text-white transition-all hover:bg-green/90"
          >
            Quero participar
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            className="opacity-70"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-8 text-3xl font-light tracking-tight text-green">
              O que é o <strong>Silencie</strong>?
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                O <strong>Silencie</strong> é um programa de meditação guiada de 21 dias, criado para pessoas que sentem a mente acelerada, cansada e sobrecarregada, e querem aprender, na prática, a desligar o piloto automático e criar mais clareza emocional no dia a dia.
              </p>
              <p>
                O <strong>Silencie</strong> cabe na vida real. É feito para ser praticado todos os dias, sem perfeccionismo.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/photos/mari.webp"
              alt="Mari Campos"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Training Benefits Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-green">
            Um treino diário, simples e guiado
          </h2>
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {[
              "Acalmar a mente",
              "Lidar melhor com pensamentos e emoções",
              "Sair da ansiedade constante",
              "Fortalecer a presença",
              "Criar um espaço interno mais estável",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-green/10 flex items-center justify-center text-green text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-lg text-muted">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-muted mb-4">Mesmo que você:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Nunca tenha meditado",
                `Ache que "não consegue parar a cabeça"`,
                "Tenha uma rotina corrida",
              ].map((item) => (
                <span key={item} className="rounded-full bg-green/10 px-4 py-2 text-sm text-green">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-green">
          Para quem é o <strong>Silencie</strong>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Sente a mente acelerada e cansada",
            "Tem dificuldade de manter constância em práticas de autocuidado",
            "Já fez cursos, jornadas ou processos, mas sente que 'não sustenta'",
            "Nunca meditou, mas sente que precisa aprender a silenciar por dentro",
            "Quer criar uma base emocional e mental mais estável",
            "Quer reduzir ruído interno, ruminação e autocrítica",
            "Está sempre com o corpo cansado e desconectado",
            "Está sempre se martirizando com comparação, culpa e excesso de controle",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 rounded-lg border border-green/20">
              <span className="text-green">•</span>
              <span className="text-muted">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Program Content Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-green">
            O que tem no programa
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {programContent.map((section) => (
              <div key={section.title} className="relative rounded-2xl overflow-hidden min-h-[280px]">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <h3 className="mb-4 text-xl font-medium text-white">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/90">
                        <span className="text-white">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section - Mari Campos */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/photos/mari2.jpg"
              alt="Mari Campos"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-8 text-3xl font-light tracking-tight text-green">
              Quem vai te guiar?
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                <strong className="text-foreground">Mari Campos</strong> é professora de yoga e meditação e facilitadora de processos de autoconhecimento.
              </p>
              <p>
                Há mais de uma década, dedica-se ao estudo, à prática e à transmissão de técnicas de meditação, yoga, respiração consciente e presença, conduzindo alunos e jornadas no Brasil e no exterior.
              </p>
              <p>
                Sua abordagem une profundidade, constância e acolhimento. Mari conduz pessoas em jornadas de reconexão interior com firmeza e sensibilidade, criando espaços seguros para o silêncio, a escuta e a transformação acontecerem de forma sustentada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-24 border-b border-green/10">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-center text-sm uppercase tracking-widest text-green/60 mb-4">Bônus exclusivos</p>
          <h2 className="mb-6 text-center text-3xl font-light tracking-tight text-green">
            O que você também recebe
          </h2>
          <p className="mb-12 text-center text-muted max-w-2xl mx-auto">
            Além do programa de 21 dias, quem se comprometer com a prática concorre a prêmios especiais ao longo da jornada.
          </p>
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {rewards.map((reward, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-green/20 bg-white min-h-[72px]">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
                  <span className="text-green">✦</span>
                </span>
                <span className="text-foreground">
                  {reward.text}
                  {reward.bold && <strong>{reward.bold}</strong>}
                  {reward.suffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="text-2xl font-light leading-relaxed text-green md:text-3xl">
            &ldquo;Não é sobre esvaziar a mente, mas sobre encontrar espaço dentro do caos.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-green/10" />

      {/* FAQ Section */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-green">
            Perguntas frequentes
          </h2>
          <div>
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} isLast={index === faqs.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-light tracking-tight text-green md:text-4xl">
            Pronto para o <strong>Silencie</strong>?
          </h2>
          <p className="mb-12 text-lg text-muted">
            Dê o primeiro passo em direção a uma vida mais presente e serena.
          </p>
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-green px-10 py-4 text-lg font-medium text-white transition-all hover:bg-green/90"
          >
            Começar minha jornada
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green/10 px-6 py-12 text-center">
        <Image
          src="/logo.svg"
          alt="Silencie"
          width={120}
          height={30}
          className="mx-auto mb-4"
        />
        <a
          href="https://www.instagram.com/maricamposyogi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mb-4 text-muted hover:text-green transition-colors"
          aria-label="Instagram de Mari Campos"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <p className="text-sm text-muted">
          <strong>Silencie</strong>. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
