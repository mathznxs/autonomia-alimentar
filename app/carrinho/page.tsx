'use client'

import Link from 'next/link'
import { useCart } from '@/components/cart-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'

export default function CarrinhoPage() {
  const { items, total, isLoading, updateQuantity, removeItem } = useCart()

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-cream flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-forest" />
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-cream py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream-dark">
                <ShoppingBag className="h-12 w-12 text-olive" />
              </div>
              <h1 className="mt-6 font-serif text-2xl font-bold text-forest">
                Seu carrinho esta vazio
              </h1>
              <p className="mt-4 text-olive">
                Explore nosso cardapio e adicione refeicoes deliciosas ao seu carrinho.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/cardapio">
                  <Button className="w-full bg-forest text-cream hover:bg-forest/90 sm:w-auto">
                    Ver cardapio
                  </Button>
                </Link>
                <Link href="/kits">
                  <Button variant="outline" className="w-full border-forest text-forest hover:bg-forest hover:text-cream sm:w-auto">
                    Ver kits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-forest">Seu Carrinho</h1>
          <p className="mt-2 text-olive">{items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const name = item.product?.name || item.kit?.name || 'Item'
                const description = item.product?.description || item.kit?.description || ''
                const price = item.product?.price || item.kit?.price || 0
                const isKit = !!item.kit_id

                return (
                  <Card key={item.id} className="border-gold/20">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-4">
                        {/* Image placeholder */}
                        <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-forest/10 to-gold/20 flex items-center justify-center">
                          <span className="font-serif text-2xl text-forest/30">{name.charAt(0)}</span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              {isKit && (
                                <span className="inline-block rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-forest mb-1">
                                  Kit Semanal
                                </span>
                              )}
                              <h3 className="font-serif text-lg font-bold text-forest">{name}</h3>
                              <p className="mt-1 text-sm text-olive line-clamp-2">{description}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-olive hover:text-red-600 transition-colors"
                              aria-label="Remover item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center gap-2 rounded-lg border border-gold/30 bg-white p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-cream transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center font-medium text-forest">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-cream transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="font-serif text-xl font-bold text-forest">
                              R$ {(Number(price) * item.quantity).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="border-gold sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forest">Resumo do Pedido</h2>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-olive">
                      <span>Subtotal</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-olive">
                      <span>Entrega</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                    <div className="border-t border-gold/30 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-forest">Total</span>
                        <span className="font-serif text-2xl font-bold text-forest">
                          R$ {total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full h-14 bg-gold text-lg text-forest hover:bg-gold/90">
                      Finalizar Pedido
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <div className="mt-6 rounded-lg bg-cream p-4">
                    <p className="text-sm text-olive text-center">
                      Entrega garantida em ate 48h uteis apos confirmacao do pagamento
                    </p>
                  </div>
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
