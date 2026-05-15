import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Shield, Truck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-dark py-16 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-forest/10 blur-3xl" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 text-sm font-medium text-forest">
              <Heart className="h-4 w-4 text-forest" />
              Cuidado que nutre
            </div>
            
            <h1 className="font-serif text-4xl font-bold leading-tight text-forest sm:text-5xl lg:text-6xl">
              Alimentacao saudavel para sua{' '}
              <span className="text-olive">independencia</span>
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-olive lg:text-xl">
              Refeicoes nutritivas e personalizadas, preparadas com carinho e entregues na sua casa. 
              Promovemos autonomia, seguranca alimentar e qualidade de vida para a terceira idade.
            </p>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-forest">
                <Shield className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium">Nutricionistas especializados</span>
              </div>
              <div className="flex items-center gap-2 text-forest">
                <Truck className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium">Entrega garantida</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/kits">
                <Button size="lg" className="w-full bg-forest text-lg text-cream hover:bg-forest/90 sm:w-auto px-8 py-6">
                  Ver Kits Alimentares
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cardapio">
                <Button size="lg" variant="outline" className="w-full border-2 border-forest text-lg text-forest hover:bg-forest hover:text-cream sm:w-auto px-8 py-6">
                  Explorar Cardapio
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="h-10 w-10 rounded-full border-2 border-cream bg-olive/30 flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-forest">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-forest">+500 familias</p>
                <p className="text-xs text-olive">confiam em nos</p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative lg:order-last">
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* Main card */}
              <div className="absolute inset-0 rounded-3xl bg-white p-6 shadow-2xl">
                <div className="h-full rounded-2xl bg-gradient-to-br from-forest/5 to-gold/20 p-6 flex flex-col items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-forest flex items-center justify-center mb-4">
                    <span className="font-serif text-4xl font-bold text-cream">A</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest text-center">Refeicoes com Amor</h3>
                  <p className="mt-2 text-olive text-center">Preparadas por chefs especializados</p>
                  
                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4 w-full">
                    <div className="text-center p-3 rounded-xl bg-white/80">
                      <p className="font-serif text-2xl font-bold text-forest">17+</p>
                      <p className="text-xs text-olive">Refeicoes</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/80">
                      <p className="font-serif text-2xl font-bold text-forest">4</p>
                      <p className="text-xs text-olive">Kits</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/80">
                      <p className="font-serif text-2xl font-bold text-forest">5</p>
                      <p className="text-xs text-olive">Categorias</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -left-4 top-1/4 rounded-xl bg-gold px-4 py-2 shadow-lg">
                <p className="text-sm font-bold text-forest">Sem conservantes</p>
              </div>
              <div className="absolute -right-4 bottom-1/4 rounded-xl bg-forest px-4 py-2 shadow-lg">
                <p className="text-sm font-bold text-cream">100% Natural</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
