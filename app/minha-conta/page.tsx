'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Package, LogOut, Loader2, Save, CheckCircle } from 'lucide-react'
import type { Profile, Order } from '@/lib/types'

export default function MinhaContaPage() {
  const router = useRouter()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState('perfil')

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: 'SP',
    zip_code: '',
  })

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login?redirect=/minha-conta')
        return
      }

      // Carregar perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        setFormData({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          city: profileData.city || '',
          state: profileData.state || 'SP',
          zip_code: profileData.zip_code || '',
        })
      }

      // Carregar pedidos
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setOrders(ordersData || [])
      setIsLoading(false)
    }

    loadData()
  }, [supabase, router])

  const handleSave = async () => {
    setIsSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id)

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
    setIsSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-forest">Minha Conta</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-gold/20">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('perfil')}
                      className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                        activeTab === 'perfil'
                          ? 'bg-forest text-cream'
                          : 'text-forest hover:bg-cream'
                      }`}
                    >
                      <User className="h-5 w-5" />
                      Meu Perfil
                    </button>
                    <button
                      onClick={() => setActiveTab('pedidos')}
                      className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                        activeTab === 'pedidos'
                          ? 'bg-forest text-cream'
                          : 'text-forest hover:bg-cream'
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      Meus Pedidos
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      Sair
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'perfil' && (
                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-bold text-forest mb-6">Dados Pessoais</h2>

                    {isSaved && (
                      <Alert className="mb-6 bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                          Dados salvos com sucesso!
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Label htmlFor="full_name" className="text-forest">Nome completo</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          className="mt-1 h-12 border-gold/30 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-forest">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                          className="mt-1 h-12 border-gold/30 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip_code" className="text-forest">CEP</Label>
                        <Input
                          id="zip_code"
                          value={formData.zip_code}
                          onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                          placeholder="00000-000"
                          className="mt-1 h-12 border-gold/30 bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address" className="text-forest">Endereco</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Rua, numero, complemento"
                          className="mt-1 h-12 border-gold/30 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-forest">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="mt-1 h-12 border-gold/30 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-forest">Estado</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="mt-1 h-12 border-gold/30 bg-white"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="mt-6 bg-forest text-cream hover:bg-forest/90"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar alteracoes
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'pedidos' && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-bold text-forest">Historico de Pedidos</h2>

                  {orders.length === 0 ? (
                    <Card className="border-gold/20">
                      <CardContent className="p-8 text-center">
                        <Package className="h-12 w-12 mx-auto text-olive" />
                        <p className="mt-4 text-olive">Voce ainda nao fez nenhum pedido.</p>
                        <Link href="/cardapio">
                          <Button className="mt-4 bg-forest text-cream hover:bg-forest/90">
                            Explorar cardapio
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    orders.map((order) => (
                      <Card key={order.id} className="border-gold/20">
                        <CardContent className="p-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-sm text-olive">Pedido</p>
                              <p className="font-mono font-medium text-forest">
                                #{order.id.slice(0, 8).toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-olive">Data</p>
                              <p className="font-medium text-forest">
                                {new Date(order.created_at).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-olive">Status</p>
                              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {order.status === 'pending' ? 'Pendente' :
                                 order.status === 'confirmed' ? 'Confirmado' :
                                 order.status === 'delivered' ? 'Entregue' : order.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-olive">Total</p>
                              <p className="font-serif text-xl font-bold text-forest">
                                R$ {Number(order.total).toFixed(2).replace('.', ',')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
