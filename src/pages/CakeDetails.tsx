import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CakeCard } from '../components/CakeCard'
import { CakePhoto } from '../components/CakePhoto'
import { useCart } from '../context/CartContext'
import { useDelivery } from '../context/DeliveryContext'
import { cakes, sizeMultipliers } from '../data/cakes'

const gallery = [
  { label: 'Front view', variant: 'front' as const, detail: false },
  { label: 'Top view', variant: 'top' as const, detail: false },
  { label: 'Close-up', variant: 'front' as const, detail: true },
]

export function CakeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const cake = cakes.find((item) => item.id === Number(id))
  const { addItem } = useCart()
  const { requestDelivery } = useDelivery()
  const [size, setSize] = useState('0.5 kg')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSelectedImage((current) => (current + 1) % gallery.length)
    }, 3500)

    return () => window.clearInterval(intervalId)
  }, [gallery.length])

  if (!cake) return <main className='page-shell py-24 text-center'><h1 className='font-display text-4xl text-cocoa'>Cake not found</h1><Link to='/cakes' className='btn-primary mt-6'>Explore cakes</Link></main>
  const price = Math.round(cake.price * sizeMultipliers[size])
  const similarCakes = cakes
    .filter((item) => item.id !== cake.id)
    .sort((first, second) => Number(second.category === cake.category) - Number(first.category === cake.category))
    .slice(0, 3)
  const showPreviousImage = () => setSelectedImage((current) => (current - 1 + gallery.length) % gallery.length)
  const showNextImage = () => setSelectedImage((current) => (current + 1) % gallery.length)
  const handleAdd = () => {
    requestDelivery(() => {
      addItem(cake, size, quantity, message, price)
      navigate('/cart')
    })
  }
  return <main className='page-shell py-10 sm:py-16'><Link to='/cakes' className='mb-7 inline-flex items-center gap-1 text-sm font-bold text-stone-500 hover:text-berry'><ChevronLeft size={18} /> Back to all cakes</Link>
    <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'><div><div className='group/gallery relative overflow-hidden rounded-[2.25rem] shadow-soft'><CakePhoto key={selectedImage} index={cake.imageIndex} collection={cake.imageCollection} variant={gallery[selectedImage].variant} className={'aspect-square cake-slide-enter ' + (gallery[selectedImage].detail ? 'cake-photo--detail' : '')} /><button type='button' onClick={showPreviousImage} aria-label='Show previous cake image' className='gallery-arrow left-4'><ChevronLeft size={24} /></button><button type='button' onClick={showNextImage} aria-label='Show next cake image' className='gallery-arrow right-4'><ChevronRight size={24} /></button><div className='absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 px-3 py-2 backdrop-blur'>{gallery.map((image, index) => <button key={image.label} type='button' onClick={() => setSelectedImage(index)} aria-label={'Show ' + image.label} aria-pressed={selectedImage === index} className={'size-2.5 rounded-full transition ' + (selectedImage === index ? 'scale-125 bg-berry' : 'bg-stone-300 hover:bg-stone-500')} />)}</div></div><p className='mt-3 text-center text-xs font-bold uppercase tracking-[.14em] text-stone-400'>{gallery[selectedImage].label}</p></div>
      <section className='self-center'><p className='eyebrow'>{cake.category} collection</p><h1 className='mt-3 font-display text-5xl font-semibold text-cocoa sm:text-6xl'>{cake.name}</h1><p className='mt-5 text-base leading-7 text-stone-600'>{cake.description}</p>
      <div className='mt-7 flex items-end gap-2'><span className='font-display text-4xl font-semibold text-berry'>₹{price}</span><span className='mb-1 text-sm text-stone-500'>for {size}</span></div>
      <div className='mt-8'><label className='field-label'>Choose a size</label><div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>{Object.keys(sizeMultipliers).map((item) => <button key={item} onClick={() => setSize(item)} className={'rounded-xl border px-3 py-3 text-sm font-bold transition ' + (size === item ? 'border-berry bg-blush text-berry' : 'border-[#dfd0c8] bg-white text-stone-600 hover:border-berry')}>{item}</button>)}</div></div>
      <div className='mt-6'><label htmlFor='cake-message' className='field-label'>Cake message <span className='font-normal text-stone-400'>(optional)</span></label><input id='cake-message' maxLength={45} value={message} onChange={(event) => setMessage(event.target.value)} placeholder='Happy Birthday Rahul ♥' className='field-input' /><p className='mt-1 text-right text-xs text-stone-400'>{message.length}/45</p></div>
      <div className='mt-6 flex flex-col gap-3 sm:flex-row'><div className='flex h-13 items-center justify-between rounded-xl border border-[#dfd0c8] bg-white px-2 sm:w-36'><button aria-label='Decrease quantity' className='grid size-10 place-items-center' onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={17} /></button><strong>{quantity}</strong><button aria-label='Increase quantity' className='grid size-10 place-items-center' onClick={() => setQuantity(quantity + 1)}><Plus size={17} /></button></div><button onClick={handleAdd} className='btn-primary flex-1'><ShoppingBag size={19} /> Add to cart · ₹{price * quantity}</button></div>
      <p className='mt-5 text-center text-xs text-stone-500 sm:text-left'>Freshly prepared after you order · Store below 5°C</p>
      <div className='mt-8 rounded-3xl border border-[#eadfd8] bg-white p-6'><h2 className='font-display text-3xl font-semibold text-cocoa'>About this cake</h2><p className='mt-3 leading-7 text-stone-600'>{cake.details}</p><div className='mt-5 flex flex-wrap gap-2'><span className='detail-chip'>100% eggless</span><span className='detail-chip'>Freshly baked</span><span className='detail-chip'>Hand-finished</span><span className='detail-chip'>Custom message</span></div></div></section>
    </div>
    <section className='border-t border-[#eadfd8] py-16 sm:py-24'><div className='section-heading'><p className='eyebrow justify-center'>More to love</p><h2>You may also like</h2><p>More handcrafted, 100% eggless cakes for your next sweet celebration.</p></div><div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>{similarCakes.map((similarCake) => <CakeCard key={similarCake.id} cake={similarCake} />)}</div></section>
  </main>
}
