'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Loader2 } from 'lucide-react'
import type { Kit } from '@/lib/types'

interface Props {
  kit: Kit
}

export function AddKitToCartButton({ kit }: Props) {
  const router = useRouter()
  const { addKit } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const supabase = createClient()

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    // Verificar se usuario esta logado
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push(`/auth/login?redirect=/kits/${kit.slug}`)
      return
    }

    try {
      await addKit(kit, 1)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      size="lg"
      className={`w-full mt-6 h-14 text-lg transition-all ${
        isAdded 
          ? 'bg-green-600 hover:bg-green-600' 
          : 'bg-gold text-forest hover:bg-gold/90'
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Adicionando...
        </>
      ) : isAdded ? (
        'Adicionado ao carrinho!'
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao carrinho
        </>
      )}
    </Button>
  )
}
