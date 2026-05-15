import { ClipboardList, Truck, UtensilsCrossed, Heart } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Escolha seu plano',
    description: 'Selecione o kit que melhor atende suas necessidades nutricionais ou monte seu proprio cardapio.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Preparamos com carinho',
    description: 'Nossos chefs e nutricionistas preparam suas refeicoes com ingredientes frescos e de qualidade.',
  },
  {
    icon: Truck,
    title: 'Entregamos na sua casa',
    description: 'Receba suas refeicoes congeladas, prontas para aquecer. Entrega semanal garantida.',
  },
  {
    icon: Heart,
    title: 'Aproveite com saude',
    description: 'Desfrute de refeicoes nutritivas sem preocupacao. Mais tempo para o que realmente importa.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">Simples e Pratico</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-lg text-olive">
            Em apenas 4 passos simples, voce garante uma alimentacao saudavel e pratica para o seu dia a dia.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-y-1/2 bg-gold/30 lg:block" />
              )}
              
              {/* Icon */}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream">
                <step.icon className="h-10 w-10 text-forest" />
                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-forest">
                  {index + 1}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="mt-6 font-serif text-xl font-bold text-forest">{step.title}</h3>
              <p className="mt-3 text-olive leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
