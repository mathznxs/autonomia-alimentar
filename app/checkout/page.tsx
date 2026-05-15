'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-provider'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, CheckCircle, Loader2, CreditCard, Banknote } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: 'SP',
    zip: '',
    deliveryDate: '',
    deliveryTime: 'manha',
    paymentMethod: 'pix',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login?redirect=/checkout')
        return
      }

      // Criar pedido
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total,
          delivery_address: formData.address,
          delivery_city: formData.city,
          delivery_state: formData.state,
          delivery_zip: formData.zip,
          delivery_date: formData.deliveryDate,
          delivery_time_slot: formData.deliveryTime,
          payment_method: formData.paymentMethod,
          notes: formData.notes,
          status: 'pending',
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Criar itens do pedido
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        kit_id: item.kit_id,
        quantity: item.quantity,
        unit_price: item.product?.price || item.kit?.price || 0,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Limpar carrinho
      await clearCart()
      
      setOrderId(order.id)
      setIsComplete(true)
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-cream py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="mt-6 font-serif text-2xl font-bold text-forest">
                Pedido Realizado!
              </h1>
              <p className="mt-4 text-olive">
                Seu pedido foi recebido com sucesso. Voce recebera um email com os detalhes e instrucoes de pagamento.
              </p>
              {orderId && (
                <p className="mt-4 text-sm text-olive">
                  Numero do pedido: <span className="font-mono font-medium text-forest">{orderId.slice(0, 8).toUpperCase()}</span>
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/">
                  <Button className="w-full bg-forest text-cream hover:bg-forest/90 sm:w-auto">
                    Voltar ao inicio
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

  if (items.length === 0) {
    router.push('/carrinho')
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href="/carrinho" className="inline-flex items-center gap-2 text-olive hover:text-forest mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao carrinho
          </Link>

          <h1 className="font-serif text-3xl font-bold text-forest">Finalizar Pedido</h1>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Endereco */}
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forest mb-6">Endereco de Entrega</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="address" className="text-forest">Endereco completo</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Rua, numero, complemento"
                        required
                        className="mt-1 h-12 border-gold/30 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-forest">Cidade</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="mt-1 h-12 border-gold/30 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-forest">CEP</Label>
                      <Input
                        id="zip"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="00000-000"
                        required
                        className="mt-1 h-12 border-gold/30 bg-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Entrega */}
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forest mb-6">Data de Entrega</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="deliveryDate" className="text-forest">Data preferida</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        required
                        className="mt-1 h-12 border-gold/30 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-forest">Horario</Label>
                      <div className="mt-1 flex gap-3">
                        {[
                          { value: 'manha', label: 'Manha (8h-12h)' },
                          { value: 'tarde', label: 'Tarde (13h-18h)' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, deliveryTime: option.value })}
                            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                              formData.deliveryTime === option.value
                                ? 'border-forest bg-forest text-cream'
                                : 'border-gold/30 bg-white text-forest hover:bg-cream'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pagamento */}
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forest mb-6">Forma de Pagamento</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: 'pix', label: 'PIX', icon: Banknote, desc: 'Aprovacao instantanea' },
                      { value: 'cartao', label: 'Cartao', icon: CreditCard, desc: 'Credito ou debito' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: option.value })}
                        className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                          formData.paymentMethod === option.value
                            ? 'border-forest bg-forest text-cream'
                            : 'border-gold/30 bg-white text-forest hover:bg-cream'
                        }`}
                      >
                        <option.icon className="h-6 w-6" />
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className={`text-sm ${formData.paymentMethod === option.value ? 'text-cream/80' : 'text-olive'}`}>
                            {option.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Observacoes */}
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forest mb-6">Observacoes</h2>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Alguma instrucao especial para entrega ou preparo?"
                    rows={4}
                    className="border-gold/30 bg-white"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="border-gold sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-forest">Resumo</h2>

                  <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-olive">
                          {item.quantity}x {item.product?.name || item.kit?.name}
                        </span>
                        <span className="text-forest font-medium">
                          R$ {((item.product?.price || item.kit?.price || 0) * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3 border-t border-gold/30 pt-4">
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

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 h-14 bg-gold text-lg text-forest hover:bg-gold/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Confirmar Pedido'
                    )}
                  </Button>

                  <Alert className="mt-4 bg-cream border-gold/30">
                    <AlertDescription className="text-sm text-olive">
                      Ao confirmar, voce concorda com nossos termos de servico. O pagamento sera processado apos a confirmacao.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
