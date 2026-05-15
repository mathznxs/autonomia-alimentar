import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone } from 'lucide-react'

export function CTASection() {
  return (
    <section id="contato" className="bg-forest py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Comece hoje sua jornada para uma alimentacao mais saudavel
          </h2>
          <p className="mt-6 text-lg text-cream/80">
            Junte-se a mais de 500 familias que ja transformaram sua relacao com a alimentacao. 
            Experimente sem compromisso - satisfacao garantida ou seu dinheiro de volta.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/kits">
              <Button size="lg" className="w-full bg-gold text-lg text-forest hover:bg-gold/90 sm:w-auto px-8 py-6">
                Escolher meu kit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+5511999999999">
              <Button size="lg" variant="outline" className="w-full border-2 border-cream text-lg text-cream hover:bg-cream hover:text-forest sm:w-auto px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Falar com especialista
              </Button>
            </a>
          </div>
          
          <p className="mt-6 text-sm text-cream/60">
            Sem compromisso. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  )
}
