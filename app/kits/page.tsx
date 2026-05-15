import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'

const kitFeatures: Record<string, string[]> = {
  'kit-independencia': [
    '7 refeicoes variadas por semana',
    'Cardapio balanceado e nutritivo',
    'Ideal para manter sua autonomia',
    'Entrega semanal garantida',
    'Sem compromisso - cancele quando quiser',
  ],
  'kit-proteina': [
    '7 refeicoes ricas em proteina',
    'Preserva massa muscular',
    'Aumenta energia e vitalidade',
    'Ideal para quem pratica exercicios',
    'Preparado por nutricionistas',
  ],
  'kit-diabetes': [
    '7 refeicoes baixo indice glicemico',
    'Sem acucar adicionado',
    'Desenvolvido com endocrinologistas',
    'Ajuda no controle da glicemia',
    'Ingredientes selecionados',
  ],
  'kit-cardiaco': [
    '7 refeicoes com baixo sodio',
    'Gorduras saudaveis (omega-3)',
    'Cuida da saude do coracao',
    'Sabor preservado sem excesso de sal',
    'Aprovado por cardiologistas',
  ],
}

const badgeColors: Record<string, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
}

export default async function KitsPage() {
  const supabase = await createClient()
  
  const { data: kits } = await supabase
    .from('kits')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream">
        {/* Hero */}
        <section className="bg-forest py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Kits Alimentares
            </h1>
            <p className="mt-4 text-lg text-cream/80 max-w-2xl mx-auto">
              Planos semanais completos para cada necessidade. Escolha o kit ideal para voce e receba refeicoes nutritivas toda semana.
            </p>
          </div>
        </section>

        {/* Kits Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
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
                      <div className="absolute -right-12 top-8 rotate-45 bg-gold px-14 py-1.5 text-sm font-bold text-forest">
                        Mais Popular
                      </div>
                    )}

                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                        {/* Left side - Info */}
                        <div className="flex-1">
                          {/* Badge */}
                          {kit.badge && (
                            <span className={`inline-block rounded-full ${badgeColor} px-4 py-1 text-sm font-medium text-white`}>
                              {kit.badge}
                            </span>
                          )}

                          {/* Title */}
                          <h2 className="mt-4 font-serif text-2xl font-bold text-forest lg:text-3xl">
                            {kit.name}
                          </h2>
                          <p className="mt-3 text-olive leading-relaxed">{kit.description}</p>

                          {/* Features */}
                          <ul className="mt-6 space-y-3">
                            {features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-olive">
                                <Check className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right side - Price & CTA */}
                        <div className="mt-8 lg:mt-0 lg:w-64 lg:text-center">
                          {/* Price */}
                          <div className="rounded-xl bg-cream p-6">
                            {kit.original_price && (
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-lg text-olive line-through">
                                  R$ {Number(kit.original_price).toFixed(2).replace('.', ',')}
                                </span>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                  -{discount}%
                                </span>
                              </div>
                            )}
                            <p className="font-serif text-4xl font-bold text-forest">
                              R$ {Number(kit.price).toFixed(2).replace('.', ',')}
                            </p>
                            <p className="text-olive mt-1">por semana</p>
                          </div>

                          {/* CTA */}
                          <Link href={`/kits/${kit.slug}`} className="block mt-4">
                            <Button 
                              size="lg"
                              className={`w-full ${
                                kit.slug === 'kit-independencia'
                                  ? 'bg-gold text-forest hover:bg-gold/90'
                                  : 'bg-forest text-cream hover:bg-forest/90'
                              }`}
                            >
                              Escolher este kit
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>

                          <p className="mt-3 text-sm text-olive">
                            Sem compromisso
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-forest text-center mb-10">
              Todos os kits incluem
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Entrega Semanal', description: 'Receba suas refeicoes toda semana no dia combinado' },
                { title: 'Embalagem Termica', description: 'Mantem a temperatura ideal durante o transporte' },
                { title: 'Suporte Nutricional', description: 'Acesso a nutricionistas para tirar duvidas' },
                { title: 'Flexibilidade Total', description: 'Pause ou cancele quando quiser, sem multa' },
              ].map((benefit) => (
                <div key={benefit.title} className="text-center p-6 rounded-xl bg-cream">
                  <h3 className="font-serif text-lg font-bold text-forest">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-olive">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
