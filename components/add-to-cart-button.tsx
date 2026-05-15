'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Loader2, Plus, Minus } from 'lucide-react'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export function AddToCartButton({ product }: Props) {
  const router = useRouter()
  const { addProduct } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const supabase = createClient()

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    // Verificar se usuario esta logado
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push(`/auth/login?redirect=/cardapio/${product.id}`)
      return
    }

    try {
      await addProduct(product, quantity)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Quantity selector */}
      <div className="flex items-center gap-3 rounded-lg border border-gold/30 bg-white p-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-cream text-forest hover:bg-forest hover:text-cream transition-colors"
          aria-label="Diminuir quantidade"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-12 text-center text-lg font-semibold text-forest">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-cream text-forest hover:bg-forest hover:text-cream transition-colors"
          aria-label="Aumentar quantidade"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to cart button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`flex-1 h-14 text-lg transition-all ${
          isAdded 
            ? 'bg-green-600 hover:bg-green-600' 
            : 'bg-forest hover:bg-forest/90'
        } text-cream`}
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
    </div>
  )
}
