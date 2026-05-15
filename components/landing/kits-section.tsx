import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, ArrowRight } from 'lucide-react'

const kitFeatures: Record<string, string[]> = {
  'kit-independencia': [
    '7 refeicoes variadas por semana',
    'Cardapio balanceado',
    'Ideal para manter autonomia',
    'Entrega semanal',
  ],
  'kit-proteina': [
    '7 refeicoes ricas em proteina',
    'Preserva massa muscular',
    'Aumenta energia e vitalidade',
    'Ideal para quem pratica exercicios',
  ],
  'kit-diabetes': [
    '7 refeicoes baixo indice glicemico',
    'Sem acucar adicionado',
    'Desenvolvido com nutricionistas',
    'Ajuda no controle da glicemia',
  ],
  'kit-cardiaco': [
    '7 refeicoes com baixo sodio',
    'Gorduras saudaveis',
    'Cuida da saude do coracao',
    'Sabor preservado',
  ],
}

const badgeColors: Record<string, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
}

export async function KitsSection() {
  const supabase = await createClient()
  
  const { data: kits } = await supabase
    .from('kits')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true })

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">Planos Semanais</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">
            Kits Alimentares
          </h2>
          <p className="mt-4 text-lg text-olive">
            Escolha o kit que melhor atende suas necessidades. Todos incluem entrega semanal e acompanhamento nutricional.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kits?.map((kit) => {
            const features = kitFeatures[kit.slug] || []
            const badgeColor = badgeColors[kit.badge_color || 'green']
            const discount = kit.original_price 
              ? Math.round((1 - kit.price / kit.original_price) * 100) 
              : 0

            return (
              <Card 
                key={kit.id} 
                className={`relative overflow-hidden border-2 transition-all hover:shadow-xl ${
                  kit.slug === 'kit-independencia' 
                    ? 'border-gold shadow-lg' 
                    : 'border-gold/20'
                }`}
              >
                {/* Popular badge */}
                {kit.slug === 'kit-independencia' && (
                  <div className="absolute -right-8 top-6 rotate-45 bg-gold px-10 py-1 text-xs font-bold text-forest">
                    Popular
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Badge */}
                  {kit.badge && (
                    <span className={`inline-block rounded-full ${badgeColor} px-3 py-1 text-xs font-medium text-white`}>
                      {kit.badge}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="mt-4 font-serif text-xl font-bold text-forest">{kit.name}</h3>
                  <p className="mt-2 text-sm text-olive line-clamp-2">{kit.description}</p>

                  {/* Price */}
                  <div className="mt-6">
                    {kit.original_price && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-olive line-through">
                          R$ {kit.original_price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          -{discount}%
                        </span>
                      </div>
                    )}
                    <p className="font-serif text-3xl font-bold text-forest">
                      R$ {kit.price.toFixed(2).replace('.', ',')}
                      <span className="text-base font-normal text-olive">/semana</span>
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-olive">
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={`/kits/${kit.slug}`} className="block mt-6">
                    <Button 
                      className={`w-full ${
                        kit.slug === 'kit-independencia'
                          ? 'bg-gold text-forest hover:bg-gold/90'
                          : 'bg-forest text-cream hover:bg-forest/90'
                      }`}
                    >
                      Escolher Kit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/kits">
            <Button variant="outline" size="lg" className="border-forest text-forest hover:bg-forest hover:text-cream">
              Ver todos os kits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
