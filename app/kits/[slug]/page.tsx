import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { AddKitToCartButton } from '@/components/add-kit-to-cart-button'
import { ArrowLeft, Check, Star } from 'lucide-react'

const kitDetails: Record<string, { icon: string; benefits: string[]; included: string[] }> = {
  'kit-independencia': {
    icon: 'A',
    benefits: [
      'Mantenha sua independencia alimentar',
      'Refeicoes variadas para nao enjoar',
      'Balanceamento nutricional garantido',
      'Preparacao rapida em minutos',
    ],
    included: [
      '3 opcoes de cafe da manha',
      '4 opcoes de almoco',
      '3 opcoes de jantar',
      'Mix de lanches saudaveis',
    ],
  },
  'kit-proteina': {
    icon: 'P',
    benefits: [
      'Mantem e fortalece a massa muscular',
      'Ideal para recuperacao pos-exercicio',
      'Aumenta sensacao de saciedade',
      'Melhora a disposicao no dia a dia',
    ],
    included: [
      'Refeicoes com minimo 25g de proteina',
      'Ovos, frango, peixe e carne magra',
      'Acompanhamentos nutritivos',
      'Lanches proteicos',
    ],
  },
  'kit-diabetes': {
    icon: 'D',
    benefits: [
      'Controle glicemico facilitado',
      'Sem picos de acucar no sangue',
      'Desenvolvido por especialistas',
      'Sabor preservado sem acucar',
    ],
    included: [
      'Refeicoes com baixo IG (< 55)',
      'Sem acucar adicionado',
      'Carboidratos complexos',
      'Rica em fibras',
    ],
  },
  'kit-cardiaco': {
    icon: 'C',
    benefits: [
      'Protege a saude do seu coracao',
      'Reduz sodio sem perder sabor',
      'Gorduras saudaveis (omega-3)',
      'Ajuda a controlar pressao arterial',
    ],
    included: [
      'Maximo 500mg de sodio por refeicao',
      'Peixes ricos em omega-3',
      'Legumes e vegetais variados',
      'Temperos naturais',
    ],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function KitDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: kit } = await supabase
    .from('kits')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!kit) {
    notFound()
  }

  const details = kitDetails[slug] || kitDetails['kit-independencia']
  const discount = kit.original_price 
    ? Math.round((1 - kit.price / kit.original_price) * 100) 
    : 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <Link href="/kits" className="inline-flex items-center gap-2 text-olive hover:text-forest mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos kits
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left - Image/Visual */}
            <div>
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-forest to-olive overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
                  <span className="font-serif text-9xl font-bold opacity-30">{details.icon}</span>
                  <h2 className="font-serif text-3xl font-bold mt-4">{kit.name}</h2>
                  <p className="text-cream/80 mt-2">{kit.meals_per_week} refeicoes por semana</p>
                </div>
                {/* Badge */}
                {kit.badge && (
                  <div className="absolute left-4 top-4 rounded-full bg-gold px-4 py-2 text-sm font-bold text-forest">
                    {kit.badge}
                  </div>
                )}
              </div>

              {/* Reviews */}
              <Card className="mt-6 border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="font-semibold text-forest">4.9</span>
                    <span className="text-olive">(127 avaliacoes)</span>
                  </div>
                  <p className="mt-4 text-olive italic">
                    &ldquo;Este kit mudou minha vida. Agora tenho refeicoes saudaveis sem precisar cozinhar!&rdquo;
                  </p>
                  <p className="mt-2 text-sm text-forest font-medium">- Maria Helena, 72 anos</p>
                </CardContent>
              </Card>
            </div>

            {/* Right - Details */}
            <div>
              <h1 className="font-serif text-3xl font-bold text-forest lg:text-4xl">
                {kit.name}
              </h1>
              <p className="mt-4 text-lg text-olive leading-relaxed">
                {kit.description}
              </p>

              {/* Price Card */}
              <Card className="mt-8 border-gold bg-white">
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-4">
                    <p className="font-serif text-4xl font-bold text-forest">
                      R$ {Number(kit.price).toFixed(2).replace('.', ',')}
                    </p>
                    <span className="text-olive">/semana</span>
                  </div>
                  {kit.original_price && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-olive line-through">
                        R$ {Number(kit.original_price).toFixed(2).replace('.', ',')}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Economia de {discount}%
                      </span>
                    </div>
                  )}

                  <AddKitToCartButton kit={kit} />

                  <p className="mt-4 text-center text-sm text-olive">
                    Cancele quando quiser. Sem compromisso.
                  </p>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="mt-6 border-gold/20">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-forest mb-4">
                    Beneficios
                  </h3>
                  <ul className="space-y-3">
                    {details.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-olive">
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* What's included */}
              <Card className="mt-6 border-gold/20">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-forest mb-4">
                    O que esta incluso
                  </h3>
                  <ul className="space-y-3">
                    {details.included.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-olive">
                        <Check className="h-5 w-5 flex-shrink-0 text-gold mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
