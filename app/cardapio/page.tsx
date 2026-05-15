import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flame, Beef, Leaf } from 'lucide-react'
import { CategoryFilter } from '@/components/category-filter'

interface Props {
  searchParams: Promise<{ categoria?: string }>
}

export default async function CardapioPage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createClient()
  
  // Buscar categorias
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  // Buscar produtos
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('name')

  if (params.categoria) {
    const category = categories?.find(c => c.slug === params.categoria)
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data: products } = await query

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream">
        {/* Hero */}
        <section className="bg-forest py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Nosso Cardapio
            </h1>
            <p className="mt-4 text-lg text-cream/80 max-w-2xl mx-auto">
              Refeicoes nutritivas preparadas com ingredientes frescos. Escolha suas favoritas e receba em casa.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-gold/20 bg-white py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <CategoryFilter 
              categories={categories || []} 
              selectedCategory={params.categoria} 
            />
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {products && products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-gold/20 bg-white transition-all hover:shadow-lg">
                    <CardContent className="p-0">
                      {/* Image placeholder */}
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-forest/10 to-gold/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-5xl text-forest/30">{product.name.charAt(0)}</span>
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
                              <span>{product.protein}g</span>
                            </div>
                          )}
                          {product.fiber && (
                            <div className="flex items-center gap-1">
                              <Leaf className="h-4 w-4 text-gold" />
                              <span>{product.fiber}g</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Price and CTA */}
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-serif text-2xl font-bold text-forest">
                            R$ {Number(product.price).toFixed(2).replace('.', ',')}
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
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-olive">Nenhum produto encontrado nesta categoria.</p>
                <Link href="/cardapio">
                  <Button variant="outline" className="mt-4 border-forest text-forest hover:bg-forest hover:text-cream">
                    Ver todos os produtos
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
