import { ArrowRight, CheckCircle2, MapPin, PartyPopper } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CartItem } from '../context/CartContext'

type LastOrder = { orderNumber: string; customer: { name: string; mobile: string; address: string; area: string; city: string; state: string }; delivery: { pincode: string; location: { latitude: number; longitude: number } | null }; items: CartItem[]; subtotal: number; deliveryFee: number; total: number }

export function OrderConfirmation() {
  let order: LastOrder | null = null
  try { order = JSON.parse(localStorage.getItem('velvet-whisk-last-order') || 'null') } catch { order = null }
  if (!order) return <main className='page-shell grid min-h-[65vh] place-items-center py-20 text-center'><div><h1 className='font-display text-4xl text-cocoa'>No recent order found</h1><Link to='/cakes' className='btn-primary mt-6'>Explore cakes</Link></div></main>
  return <main className='bg-blush/40 py-14 sm:py-20'><div className='page-shell max-w-3xl'><div className='rounded-[2.5rem] bg-white p-6 text-center shadow-soft sm:p-10'><span className='mx-auto grid size-20 place-items-center rounded-full bg-green-50 text-green-600'><CheckCircle2 size={42} /></span><p className='mt-6 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[.18em] text-gold'><PartyPopper size={17} /> Order placed successfully!</p><h1 className='mt-2 font-display text-5xl font-semibold text-cocoa'>Thank you, {order.customer.name.split(' ')[0]}.</h1><p className='mx-auto mt-3 max-w-lg text-stone-500'>Your sweet celebration is now in the works. We will call you shortly to confirm this demo order.</p>
    <div className='mx-auto mt-8 inline-flex rounded-full bg-blush px-5 py-2 text-sm font-bold text-berry'>Order #{order.orderNumber}</div>
    <div className='mt-9 grid gap-6 border-y border-[#eadfd8] py-8 text-left sm:grid-cols-2'><div><h2 className='font-display text-2xl font-semibold text-cocoa'>Your cakes</h2><div className='mt-3 space-y-2'>{order.items.map((item) => <p key={item.cartId} className='flex justify-between gap-4 text-sm text-stone-600'><span>{item.quantity}× {item.name} · {item.size}</span><strong className='text-cocoa'>₹{item.itemPrice * item.quantity}</strong></p>)}</div></div><div><h2 className='font-display text-2xl font-semibold text-cocoa'>Delivery</h2><p className='mt-3 flex gap-2 text-sm leading-6 text-stone-600'><MapPin size={17} className='mt-1 shrink-0 text-berry' />{order.customer.address}, {order.customer.area}, {order.customer.city}, {order.customer.state}<br />{order.delivery.location ? 'Location coordinates selected' : 'Pincode ' + order.delivery.pincode}</p></div></div>
    <div className='mt-6 flex items-center justify-between text-lg font-bold text-cocoa'><span>Total</span><span>₹{order.total}</span></div><Link to='/cakes' className='btn-primary mt-8'>Continue shopping <ArrowRight size={18} /></Link></div></div></main>
}
