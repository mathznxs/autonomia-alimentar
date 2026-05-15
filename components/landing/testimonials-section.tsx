import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Helena, 72 anos',
    location: 'Sao Paulo, SP',
    content: 'Depois que comecei a receber as refeicoes da Autonomia Alimentar, minha vida mudou. Nao preciso mais me preocupar com cozinhar todos os dias e a comida e deliciosa!',
    rating: 5,
    highlight: 'Praticidade no dia a dia',
  },
  {
    name: 'Jose Carlos, 68 anos',
    location: 'Campinas, SP',
    content: 'Como diabetico, encontrar refeicoes saborosas e adequadas era um desafio. O Kit Controle Diabetes foi perfeito para mim. Minha glicemia nunca esteve tao controlada.',
    rating: 5,
    highlight: 'Controle da diabetes',
  },
  {
    name: 'Ana Paula (filha)',
    location: 'Santos, SP',
    content: 'Minha mae mora sozinha e eu ficava muito preocupada com a alimentacao dela. Agora tenho tranquilidade sabendo que ela recebe refeicoes nutritivas toda semana.',
    rating: 5,
    highlight: 'Tranquilidade para a familia',
  },
  {
    name: 'Roberto Almeida, 75 anos',
    location: 'Guarulhos, SP',
    content: 'Apos minha cirurgia cardiaca, precisei mudar a alimentacao. O Kit Cardiaco me ajudou muito na recuperacao. Recomendo para todos que precisam cuidar do coracao.',
    rating: 5,
    highlight: 'Saude do coracao',
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-cream py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">Depoimentos</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-lg text-olive">
            Historias reais de pessoas que transformaram sua relacao com a alimentacao.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-gold/20 bg-white">
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="h-10 w-10 text-gold/30" />
                
                {/* Content */}
                <p className="mt-4 text-lg leading-relaxed text-olive">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                {/* Highlight */}
                <div className="mt-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-forest">
                  {testimonial.highlight}
                </div>
                
                {/* Author */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest">
                      <span className="font-serif text-lg font-bold text-cream">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-forest">{testimonial.name}</p>
                      <p className="text-sm text-olive">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-2xl bg-white p-8">
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-forest">500+</p>
            <p className="text-olive">Familias atendidas</p>
          </div>
          <div className="h-12 w-px bg-gold/30" />
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-forest">4.9</p>
            <p className="text-olive">Avaliacao media</p>
          </div>
          <div className="h-12 w-px bg-gold/30" />
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-forest">98%</p>
            <p className="text-olive">Satisfacao</p>
          </div>
          <div className="h-12 w-px bg-gold/30" />
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-forest">2 anos</p>
            <p className="text-olive">No mercado</p>
          </div>
        </div>
      </div>
    </section>
  )
}
