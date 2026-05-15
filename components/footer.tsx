import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e Descricao */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold">
                <span className="font-serif text-xl font-bold text-forest">A</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold">Autonomia</span>
                <span className="block text-sm text-gold">Alimentar</span>
              </div>
            </div>
            <p className="mt-4 text-cream/80 leading-relaxed">
              Promovendo independencia, seguranca alimentar e qualidade de vida para idosos atraves de refeicoes nutritivas e personalizadas.
            </p>
          </div>

          {/* Links Rapidos */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-4">Links Rapidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cardapio" className="text-cream/80 hover:text-gold transition-colors">
                  Cardapio
                </Link>
              </li>
              <li>
                <Link href="/kits" className="text-cream/80 hover:text-gold transition-colors">
                  Kits Alimentares
                </Link>
              </li>
              <li>
                <Link href="/#como-funciona" className="text-cream/80 hover:text-gold transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/#depoimentos" className="text-cream/80 hover:text-gold transition-colors">
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-cream/80 hover:text-gold transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-cream/80">(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-cream/80">contato@autonomiaalimentar.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-cream/80">Sao Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-cream/80">Seg a Sex: 8h as 18h</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="flex h-12 w-12 items-center justify-center rounded-full bg-olive transition-colors hover:bg-gold hover:text-forest"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="flex h-12 w-12 items-center justify-center rounded-full bg-olive transition-colors hover:bg-gold hover:text-forest"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="flex h-12 w-12 items-center justify-center rounded-full bg-olive transition-colors hover:bg-gold hover:text-forest"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-olive/30">
              <p className="text-sm text-cream/80">
                Receba nossas novidades e dicas de nutricao para a terceira idade.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-olive/50 text-center">
          <p className="text-cream/60 text-sm">
            &copy; {new Date().getFullYear()} Autonomia Alimentar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
