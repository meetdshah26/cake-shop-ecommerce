import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Cake } from '../data/cakes'

export type CartItem = Cake & { cartId: string; size: string; quantity: number; message: string; itemPrice: number }
type CartContextValue = { items: CartItem[]; itemCount: number; subtotal: number; addItem: (cake: Cake, size?: string, quantity?: number, message?: string, itemPrice?: number) => void; updateQuantity: (cartId: string, quantity: number) => void; removeItem: (cartId: string) => void; clearCart: () => void }
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => { try { return JSON.parse(localStorage.getItem('velvet-whisk-cart') || '[]') } catch { return [] } })
  useEffect(() => {
    localStorage.setItem('velvet-whisk-cart', JSON.stringify(items))
  }, [items])
  const addItem = (cake: Cake, size = '0.5 kg', quantity = 1, message = '', itemPrice = cake.price) => {
    const cartId = cake.id + '-' + size + '-' + message
    setItems((current) => { const found = current.find((item) => item.cartId === cartId); return found ? current.map((item) => item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...cake, cartId, size, quantity, message, itemPrice }] })
  }
  const updateQuantity = (cartId: string, quantity: number) => setItems((current) => current.map((item) => item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item))
  const removeItem = (cartId: string) => setItems((current) => current.filter((item) => item.cartId !== cartId))
  const clearCart = () => setItems([])
  const value = useMemo(() => ({ items, itemCount: items.reduce((sum, item) => sum + item.quantity, 0), subtotal: items.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0), addItem, updateQuantity, removeItem, clearCart }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used inside CartProvider'); return context }
