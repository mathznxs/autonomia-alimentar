import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { ArrowLeft, Flame, Beef, Wheat, Droplet, Leaf, Clock, Scale, AlertTriangle } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <Link href="/cardapio" className="inline-flex items-center gap-2 text-olive hover:text-forest mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao cardapio
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-forest/10 to-gold/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-9xl text-forest/20">{product.name.charAt(0)}</span>
              </div>
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {product.is_diabetic_friendly && (
                  <span className="rounded-full bg-green-500 px-3 py-1.5 text-sm font-medium text-white">
                    Ideal para Diabeticos
                  </span>
                )}
                {product.is_heart_healthy && (
                  <span className="rounded-full bg-red-500 px-3 py-1.5 text-sm font-medium text-white">
                    Saude Cardiaca
                  </span>
                )}
                {product.is_high_protein && (
                  <span className="rounded-full bg-blue-500 px-3 py-1.5 text-sm font-medium text-white">
                    Alta Proteina
                  </span>
                )}
                {product.is_low_sodium && (
                  <span className="rounded-full bg-orange-500 px-3 py-1.5 text-sm font-medium text-white">
                    Baixo Sodio
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-sm font-medium text-olive">{product.category?.name}</p>
              <h1 className="mt-2 font-serif text-3xl font-bold text-forest lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-olive leading-relaxed">
                {product.description}
              </p>

              {/* Meta info */}
              <div className="mt-6 flex flex-wrap gap-4">
                {product.serving_size && (
                  <div className="flex items-center gap-2 text-olive">
                    <Scale className="h-5 w-5 text-gold" />
                    <span>Porcao: {product.serving_size}</span>
                  </div>
                )}
                {product.preparation_time && (
                  <div className="flex items-center gap-2 text-olive">
                    <Clock className="h-5 w-5 text-gold" />
                    <span>Preparo: {product.preparation_time}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mt-8">
                <p className="font-serif text-4xl font-bold text-forest">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Add to cart */}
              <div className="mt-6">
                <AddToCartButton product={product} />
              </div>

              {/* Nutrition info */}
              <Card className="mt-8 border-gold/20">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-forest mb-4">
                    Informacoes Nutricionais
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {product.calories && (
                      <div className="flex items-center gap-3 rounded-lg bg-cream p-3">
                        <Flame className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-sm text-olive">Calorias</p>
                          <p className="font-semibold text-forest">{product.calories} kcal</p>
                        </div>
                      </div>
                    )}
                    {product.protein && (
                      <div className="flex items-center gap-3 rounded-lg bg-cream p-3">
                        <Beef className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-sm text-olive">Proteinas</p>
                          <p className="font-semibold text-forest">{product.protein}g</p>
                        </div>
                      </div>
                    )}
                    {product.carbs && (
                      <div className="flex items-center gap-3 rounded-lg bg-cream p-3">
                        <Wheat className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-sm text-olive">Carboidratos</p>
                          <p className="font-semibold text-forest">{product.carbs}g</p>
                        </div>
                      </div>
                    )}
                    {product.fat && (
                      <div className="flex items-center gap-3 rounded-lg bg-cream p-3">
                        <Droplet className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-sm text-olive">Gorduras</p>
                          <p className="font-semibold text-forest">{product.fat}g</p>
                        </div>
                      </div>
                    )}
                    {product.fiber && (
                      <div className="flex items-center gap-3 rounded-lg bg-cream p-3">
                        <Leaf className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-sm text-olive">Fibras</p>
                          <p className="font-semibold text-forest">{product.fiber}g</p>
                        </div>
                      </div>
                    )}
                    {product.sodium && (
                      <div className="flex items-center gap-3 rounded-lg bg-cream p-3">
                        <Droplet className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-sm text-olive">Sodio</p>
                          <p className="font-semibold text-forest">{product.sodium}mg</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <Card className="mt-6 border-gold/20">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold text-forest mb-4">
                      Ingredientes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ingredient: string) => (
                        <span 
                          key={ingredient} 
                          className="rounded-full bg-cream px-3 py-1 text-sm text-forest"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Allergens */}
              {product.allergens && product.allergens.length > 0 && (
                <Card className="mt-6 border-orange-200 bg-orange-50">
                  <CardContent className="p-6">
                    <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-orange-700 mb-4">
                      <AlertTriangle className="h-5 w-5" />
                      Alergenicos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen: string) => (
                        <span 
                          key={allergen} 
                          className="rounded-full bg-orange-200 px-3 py-1 text-sm font-medium text-orange-800"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
