import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Flame, Beef, Leaf } from 'lucide-react'

export async function CatalogPreviewSection() {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .limit(6)

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">Nosso Cardapio</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">
              Refeicoes Selecionadas
            </h2>
          </div>
          <Link href="/cardapio">
            <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-cream">
              Ver cardapio completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-gold/20 bg-white transition-all hover:shadow-lg">
              <CardContent className="p-0">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-forest/10 to-gold/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-4xl text-forest/30">{product.name.charAt(0)}</span>
                  </div>
                  {/* Badges */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {product.is_diabetic_friendly && (
                      <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        Diabeticos
                      </span>
                    )}
                    {product.is_heart_healthy && (
                      <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        Cardiaco
                      </span>
                    )}
                    {product.is_high_protein && (
                      <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                        Proteina+
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <p className="text-sm font-medium text-olive">{product.category?.name}</p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-forest">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-olive">{product.description}</p>
                  
                  {/* Nutrition info */}
                  <div className="mt-4 flex items-center gap-4 text-sm text-olive">
                    {product.calories && (
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-gold" />
                        <span>{product.calories} kcal</span>
                      </div>
                    )}
                    {product.protein && (
                      <div className="flex items-center gap-1">
                        <Beef className="h-4 w-4 text-gold" />
                        <span>{product.protein}g prot</span>
                      </div>
                    )}
                    {product.fiber && (
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-gold" />
                        <span>{product.fiber}g fibra</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-serif text-2xl font-bold text-forest">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <Link href={`/cardapio/${product.id}`}>
                      <Button size="sm" className="bg-forest text-cream hover:bg-forest/90">
                        Ver detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
