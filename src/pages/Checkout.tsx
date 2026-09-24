import { ArrowLeft, CheckCircle2, MapPin, Navigation, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CakePhoto } from '../components/CakePhoto'
import { useCart } from '../context/CartContext'
import { readSavedDelivery } from '../utils/delivery'

type Customer = { name: string; mobile: string; address: string; area: string; city: string }
const emptyCustomer: Customer = { name: '', mobile: '', address: '', area: '', city: '' }

export function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(emptyCustomer)
  const delivery = readSavedDelivery()
  const deliveryFee = items.length ? 79 : 0
  const requiredComplete = customer.name.trim() && /^[6-9][0-9]{9}$/.test(customer.mobile) && customer.address.trim() && customer.area.trim() && customer.city.trim()
  const canPlaceOrder = Boolean(items.length && requiredComplete)
  const updateCustomer = (field: keyof Customer, value: string) => setCustomer((current) => ({ ...current, [field]: value }))
  const orderPreview = useMemo(() => items.map((item) => item.quantity + '× ' + item.name).join(', '), [items])
  const placeOrder = () => {
    if (!canPlaceOrder) return
    const order = { orderNumber: 'CAKE-' + Math.floor(1000 + Math.random() * 9000), customer, delivery, items, subtotal, deliveryFee, total: subtotal + deliveryFee }
    localStorage.setItem('velvet-whisk-last-order', JSON.stringify(order))
    clearCart()
    navigate('/confirmation')
  }
  if (!items.length) return <main className='page-shell grid min-h-[65vh] place-items-center py-20 text-center'><div><h1 className='font-display text-4xl text-cocoa'>Your basket is empty</h1><p className='mt-3 text-stone-500'>Add a cake before heading to checkout.</p><Link className='btn-primary mt-6' to='/cakes'>Explore cakes</Link></div></main>
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const deliveryLabel = delivery.pincode ? 'Pincode ' + delivery.pincode : 'Current location'

  return <main className='page-shell pb-20 pt-8 sm:pb-24 sm:pt-12'>
    <Link to='/cart' className='inline-flex items-center gap-2 text-sm font-bold text-stone-500 transition hover:text-berry'><ArrowLeft size={17} /> Back to basket</Link>
    <div className='mt-7 flex flex-col justify-between gap-6 border-b border-[#eadfd8] pb-8 sm:flex-row sm:items-end'>
      <div><p className='eyebrow'>Almost there</p><h1 className='mt-2 font-display text-5xl font-semibold text-cocoa sm:text-6xl'>Delivery details</h1><p className='mt-3 max-w-xl text-stone-500'>Tell us where to bring your freshly prepared order.</p></div>
      <div className='flex shrink-0 items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800'><span className='grid size-9 place-items-center rounded-full bg-white'><CheckCircle2 size={20} /></span><span><strong className='block text-sm'>Delivery area verified</strong><small className='flex items-center gap-1 text-emerald-700'><MapPin size={12} /> {deliveryLabel}</small></span></div>
    </div>

    <div className='mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]'>
      <div className='grid min-w-0 gap-6'>
        <section className='form-card transition-shadow focus-within:shadow-soft'><span className='step-number'>1</span><div><div className='flex items-center justify-between gap-4'><h2 className='form-title'>Customer information</h2><span className='hidden text-xs font-semibold text-stone-400 sm:block'>Required fields *</span></div><div className='mt-6 grid gap-5 sm:grid-cols-2'><div><label className='field-label' htmlFor='full-name'>Full name *</label><input id='full-name' autoComplete='name' className='field-input' placeholder='Your full name' value={customer.name} onChange={(event) => updateCustomer('name', event.target.value)} /></div><div><label className='field-label' htmlFor='mobile'>Mobile number *</label><input id='mobile' autoComplete='tel' className='field-input' inputMode='numeric' maxLength={10} placeholder='10-digit mobile number' value={customer.mobile} onChange={(event) => updateCustomer('mobile', event.target.value.replace(/[^0-9]/g, ''))} /></div></div></div></section>

        <section className='form-card transition-shadow focus-within:shadow-soft'><span className='step-number'>2</span><div><h2 className='form-title'>Delivery address</h2><p className='mt-1 text-sm text-stone-500'>Add the complete address so the order reaches you smoothly.</p><div className='mt-6 grid gap-5 sm:grid-cols-2'><div className='sm:col-span-2'><label className='field-label' htmlFor='address'>House / flat and street *</label><input id='address' autoComplete='street-address' className='field-input' placeholder='House number, building and street' value={customer.address} onChange={(event) => updateCustomer('address', event.target.value)} /></div><div><label className='field-label' htmlFor='area'>Area / locality *</label><input id='area' autoComplete='address-level3' className='field-input' placeholder='Your locality' value={customer.area} onChange={(event) => updateCustomer('area', event.target.value)} /></div><div><label className='field-label' htmlFor='city'>City *</label><input id='city' autoComplete='address-level2' className='field-input' placeholder='Your city' value={customer.city} onChange={(event) => updateCustomer('city', event.target.value)} /></div></div></div></section>
      </div>

      <aside className='sticky top-28 overflow-hidden rounded-[1.75rem] border border-[#eadfd8] bg-white shadow-soft'>
        <div className='flex items-end justify-between bg-cocoa px-6 py-5 text-white'><div><p className='text-xs font-bold uppercase tracking-[.18em] text-white/55'>Order summary</p><h2 className='mt-1 font-display text-3xl font-semibold'>Your order</h2></div><span className='rounded-full bg-white/10 px-3 py-1 text-xs font-bold'>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span></div>
        <div className='p-6'><div className='max-h-64 space-y-4 overflow-auto pr-1'>{items.map((item) => <div key={item.cartId} className='flex items-center gap-3'><CakePhoto index={item.imageIndex} collection={item.imageCollection} src={item.image} alt={item.name} className='size-16 shrink-0 rounded-xl ring-1 ring-[#eadfd8]' /><div className='min-w-0 flex-1'><h3 className='truncate font-bold text-cocoa'>{item.name}</h3><p className='mt-0.5 text-xs text-stone-500'>{item.quantity} × {item.size}</p></div><span className='text-sm font-bold text-cocoa'>₹{item.itemPrice * item.quantity}</span></div>)}</div>
          <div className='mt-6 grid gap-3 border-y border-dashed border-[#dfd0c8] py-5 text-sm'><p className='flex justify-between text-stone-500'><span>Subtotal</span><span>₹{subtotal}</span></p><p className='flex justify-between text-stone-500'><span>Delivery fee</span><span>₹{deliveryFee}</span></p><p className='mt-1 flex justify-between text-xl font-bold text-cocoa'><span>Total</span><span className='text-berry'>₹{subtotal + deliveryFee}</span></p></div>
          <button disabled={!canPlaceOrder} onClick={placeOrder} className='btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40'>Place order <Navigation size={18} /></button>
          {!canPlaceOrder && <p className='mt-3 text-center text-xs font-medium text-stone-500'>Complete all required details to place your order.</p>}
          <p className='mt-4 flex items-center justify-center gap-1 text-center text-xs text-stone-400'><ShieldCheck size={14} /> Demo order · no payment collected</p><span className='sr-only'>{orderPreview}</span>
        </div>
      </aside>
    </div>
  </main>
}
