'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, ShoppingCart, User, X } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Cardapio', href: '/cardapio' },
  { name: 'Kits', href: '/kits' },
  { name: 'Como Funciona', href: '/#como-funciona' },
  { name: 'Contato', href: '/#contato' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const { itemCount } = useCart()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest">
            <span className="font-serif text-xl font-bold text-cream">A</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-xl font-bold text-forest">Autonomia</span>
            <span className="block text-sm text-olive">Alimentar</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-forest transition-colors hover:text-olive"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Carrinho */}
          <Link href="/carrinho">
            <Button variant="outline" size="lg" className="relative border-forest/20 bg-white hover:bg-forest hover:text-cream">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-forest">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Usuario */}
          {user ? (
            <Link href="/minha-conta">
              <Button variant="outline" size="lg" className="border-forest/20 bg-white hover:bg-forest hover:text-cream">
                <User className="h-5 w-5" />
                <span className="sr-only">Minha Conta</span>
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login" className="hidden sm:block">
              <Button size="lg" className="bg-forest text-cream hover:bg-forest/90">
                Entrar
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="lg" className="border-forest/20 bg-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-cream p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-gold/30 p-4">
                  <span className="font-serif text-lg font-bold text-forest">Menu</span>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-4 py-3 text-lg font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t border-gold/30 p-4">
                  {user ? (
                    <Link href="/minha-conta" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-forest text-cream hover:bg-forest/90" size="lg">
                        <User className="mr-2 h-5 w-5" />
                        Minha Conta
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-forest text-cream hover:bg-forest/90" size="lg">
                        Entrar
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
