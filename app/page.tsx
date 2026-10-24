import Image from "next/image";
import { getSiteContent } from "@/lib/supabase";
import Hero from "./components/Hero";
import Faq, { type FaqItem } from "./components/Faq";
import TestimonialsCarousel, {
  type Testimonial,
} from "./components/TestimonialsCarousel";

export const dynamic = "force-dynamic";

interface GeneralContent {
  price: number;
  start_date: string;
  header_title: string;
  payment_link: string;
  whatsapp_number: string;
  header_description: string;
}

interface ProgramIncludes {
  meditation: string[];
  meetings: string[];
  bonus: string[];
}

// Títulos e imagens dos cards são fixos; apenas as listas vêm do painel.
const PROGRAM_CARDS: {
  title: string;
  image: string;
  key: keyof ProgramIncludes;
}[] = [
  { title: "Meditação guiada", image: "/photos/card-1.webp", key: "meditation" },
  { title: "Encontros e Yoga", image: "/photos/card-2.png", key: "meetings" },
  { title: "Bônus exclusivos", image: "/photos/card-3.png", key: "bonus" },
];

export default async function Home() {
  const content = await getSiteContent("silencie");

  const general = (content.general ?? {}) as GeneralContent;
  const programIncludes = (content.program_includes ?? {}) as ProgramIncludes;
  const rewards = (content.rewards ?? []) as string[];
  const dailyTraining = (content.daily_training ?? []) as string[];
  const testimonials = (content.testimonials ?? []) as Testimonial[];
  const faq = (content.faq ?? []) as FaqItem[];

  const CTA_LINK = general.payment_link;

  const WHATSAPP_URL = `https://wa.me/${general.whatsapp_number}?text=Oi%2C%20Mari!%0AVim%20pelo%20site%20e%20queria%20tirar%20algumas%20d%C3%BAvidas%20sobre%20o%20Silencie%20antes%20de%20me%20inscrever.`;

  const formattedPrice =
    typeof general.price === "number"
      ? general.price.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null;

  const formattedStartDate = general.start_date
    ? new Date(general.start_date + "T00:00:00").toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-background text-green font-sans">
      <Hero
        title={general.header_title || "Silencie"}
        description={general.header_description || ""}
      />

      {/* About Section */}
      <section className="mx-auto max-w-4xl px-6 pt-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-8 text-3xl font-light tracking-tight text-green">
              O que é o <strong>Silencie</strong>?
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-green">
              <p>
                O <strong>Silencie</strong> é um programa de meditação guiada de 21 dias, criado para pessoas que sentem a mente acelerada, cansada e sobrecarregada, e querem aprender, na prática, a desligar o piloto automático e criar mais clareza emocional no dia a dia.
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

      {/* Program Content Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-green">
            Durante os 21 dias do <strong>Silencie</strong> você vai receber
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {PROGRAM_CARDS.map((card) => {
              const items = programIncludes[card.key] ?? [];
              if (items.length === 0) return null;
              return (
                <div key={card.title} className="rounded-2xl border border-green/20 p-8">
                  <h3 className="mb-4 text-xl font-medium text-green">{card.title}</h3>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-green">
                        <span className="text-green">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      {rewards.length > 0 && (
        <section className="pb-24 border-b border-green/10">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-6 text-center text-3xl font-light tracking-tight text-green">
              Premiações por comprometimento
            </h2>
            <p className="mb-12 text-center text-green max-w-2xl mx-auto">
              Durante os 21 dias, vamos reconhecer quem realmente se comprometer com o processo. As pessoas mais engajadas ganham:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {rewards.map((reward, index) => (
                <div key={index} className="flex items-center gap-4 p-5 rounded-lg bg-white">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
                    <span className="text-green text-lg">✦</span>
                  </span>
                  <span className="text-green">{reward}</span>
                </div>
              ))}
            </div>
            {CTA_LINK && (
              <div className="mt-12 text-center">
                <a
                  href={CTA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-green px-8 py-4 text-lg font-medium text-white transition-all hover:bg-green/90"
                >
                  Quero participar
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* For Who Section */}
      {dailyTraining.length > 0 && (
        <section className="py-24 bg-green">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-white">
              Um treino diário, simples e guiado que vai te ajudar
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {dailyTraining.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4">
                  <span className="text-white/80 mt-1">•</span>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Even If Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-lg text-green mb-4">Mesmo que você:</p>
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

      {/* Pricing Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-green">
            Pronto para o <strong>Silencie</strong>?
          </h2>
          <p className="mb-4 text-green/80">
            Dê o primeiro passo em direção a uma vida mais presente e serena.
          </p>
          {formattedStartDate && (
            <p className="mb-12 text-sm text-green/60">
              Início do programa:{" "}
              <strong className="text-green">{formattedStartDate}</strong>
            </p>
          )}

          <div className="space-y-8">
            {formattedPrice && (
              <div className="space-y-2">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-green/60 text-xl">R$</span>
                  <span className="text-5xl md:text-6xl font-light text-green">
                    {formattedPrice}
                  </span>
                </div>
              </div>
            )}

            {CTA_LINK && (
              <div className="pt-4">
                <a
                  href={CTA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full rounded-full bg-green px-8 py-4 text-lg font-medium text-white transition-all hover:bg-green/90"
                >
                  Garantir minha vaga
                </a>
              </div>
            )}
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
            <div className="space-y-6 text-lg leading-relaxed text-green">
              <p>
                <strong className="text-green">Mari Campos</strong> é professora de yoga e meditação e facilitadora de processos de autoconhecimento.
              </p>
              <p>
                Há mais de uma década, dedica-se ao estudo, à prática e à transmissão de técnicas de meditação, yoga, respiração consciente e presença, conduzindo alunos e jornadas no Brasil e no exterior.
              </p>
              <p>
                Sua abordagem une profundidade, constância e acolhimento. Mari conduz pessoas em jornadas de reconexão interior com firmeza e sensibilidade, criando espaços seguros para o silêncio, a escuta e a transformação acontecerem de forma sustentada.
              </p>
            </div>
            {general.whatsapp_number && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-green/20 px-6 py-3 text-green transition-all hover:bg-green/5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Tem alguma dúvida? Fale comigo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="text-2xl font-light leading-relaxed text-green md:text-3xl">
            &ldquo;Não é sobre esvaziar a mente, mas sobre encontrar espaço dentro do caos.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 border-t border-b border-green/10">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-green">
              O que dizem sobre a experiência
            </h2>
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faq.length > 0 && (
        <section className="py-24 bg-green">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-white">
              Perguntas frequentes
            </h2>
            <Faq items={faq} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-green/10 px-6 py-12 text-center">
        <Image
          src="/mari-campos-logo-green.png"
          alt="Mari Campos"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <a
          href="https://www.instagram.com/maricamposyogi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mb-4 text-green hover:text-green/80 transition-colors"
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
        <p className="text-sm text-green">
          <strong>Silencie</strong>. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
