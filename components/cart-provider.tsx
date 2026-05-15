'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Product, Kit, CartItem } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  itemCount: number
  total: number
  isLoading: boolean
  addProduct: (product: Product, quantity?: number) => Promise<void>
  addKit: (kit: Kit, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createClient()

  // Verificar usuario logado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id || null)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // Carregar carrinho do banco
  const refreshCart = useCallback(async () => {
    if (!userId) {
      setItems([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*),
          kit:kits(*)
        `)
        .eq('user_id', userId)

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }, [userId, supabase])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  // Calcular total
  const total = items.reduce((sum, item) => {
    const price = item.product?.price || item.kit?.price || 0
    return sum + price * item.quantity
  }, 0)

  // Contar itens
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Adicionar produto
  const addProduct = async (product: Product, quantity = 1) => {
    if (!userId) return

    const existingItem = items.find(item => item.product_id === product.id)

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity)
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: product.id,
          quantity,
        })

      if (!error) await refreshCart()
    }
  }

  // Adicionar kit
  const addKit = async (kit: Kit, quantity = 1) => {
    if (!userId) return

    const existingItem = items.find(item => item.kit_id === kit.id)

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity)
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          kit_id: kit.id,
          quantity,
        })

      if (!error) await refreshCart()
    }
  }

  // Atualizar quantidade
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeItem(itemId)
      return
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)

    if (!error) await refreshCart()
  }

  // Remover item
  const removeItem = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (!error) await refreshCart()
  }

  // Limpar carrinho
  const clearCart = async () => {
    if (!userId) return

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    if (!error) setItems([])
  }

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      isLoading,
      addProduct,
      addKit,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
