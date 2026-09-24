import { ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useDelivery } from '../context/DeliveryContext'
import type { Cake } from '../data/cakes'
import { CakePhoto } from './CakePhoto'

const badgeColors: Record<string, string> = {
  Bestseller: 'bg-[#ed3e88] text-white',
  'Brownie Bestseller': 'bg-[#8b5e3c] text-white',
  'Most Loved': 'bg-[#ef476f] text-white',
  Signature: 'bg-[#7c4dbe] text-white',
  'Kids Favourite': 'bg-[#f2a900] text-cocoa',
  'Wedding Special': 'bg-[#b76e79] text-white',
  'Classic Choice': 'bg-[#8b5e3c] text-white',
  'Just Launched': 'bg-[#ff7043] text-white',
  'Party Pick': 'bg-[#168f78] text-white',
  'Tea-Time Pick': 'bg-[#c47c2d] text-white',
}

const alternatePromotions: Record<number, string[]> = {
  1: ['Chocolate Lovers Pick', 'Trending Today'],
  2: ['Anniversary Favourite', 'Velvet Delight'],
  6: ['Handcrafted Beauty', 'Designer Pick'],
  7: ['Berry Bliss', 'New Arrival'],
  9: ['Fudgy Favourite', 'Box of Joy'],
}

function CakePromoBadge({ label, cakeId }: { label: string; cakeId: number }) {
  const promotionColors = ['bg-[#ed3e88] text-white', 'bg-[#168f78] text-white', 'bg-[#ff7043] text-white']
  const promotionTexts = [label, ...(alternatePromotions[cakeId] || [])]
  const promotions = promotionTexts.map((text, index) => ({ text, color: index === 0 ? badgeColors[label] || 'bg-berry text-white' : promotionColors[index] }))
  const [activePromotion, setActivePromotion] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActivePromotion((current) => (current + 1) % promotions.length)
    }, 2400 + (cakeId % 3) * 250)
    return () => window.clearInterval(intervalId)
  }, [cakeId, promotions.length])

  const promotion = promotions[activePromotion]
  return <span key={promotion.text} aria-hidden='true' className={'cake-badge-attract absolute left-4 top-4 rounded-md border border-white/70 px-3 py-1 text-xs font-bold shadow ' + promotion.color}>{promotion.text}</span>
}

export function CakeCard({ cake }: { cake: Cake }) {
  const { addItem } = useCart()
  const { requestDelivery } = useDelivery()
  const navigate = useNavigate()

  const addToCart = () => {
    requestDelivery(() => {
      addItem(cake)
      navigate('/cart')
    })
  }

  return <article className='group relative overflow-hidden rounded-[1.75rem] border border-[#eadfd8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft'>
    <Link to={'/cakes/' + cake.id} className='absolute inset-0 z-10' aria-label={'View details for ' + cake.name} />
    <div className='relative overflow-hidden'><CakePhoto index={cake.imageIndex} collection={cake.imageCollection} className='aspect-[4/3] transition duration-500 group-hover:scale-[1.03]' />{cake.badge && <CakePromoBadge label={cake.badge} cakeId={cake.id} />}</div>
    <div className='p-5'><div className='mb-2 flex items-start justify-between gap-3'><div><p className='mb-1 text-xs font-bold uppercase tracking-[.18em] text-gold'>{cake.category}</p><h3 className='font-display text-2xl font-semibold text-cocoa'>{cake.name}</h3></div><p className='whitespace-nowrap font-bold text-berry'>₹{cake.price}<span className='text-xs font-medium text-stone-500'>+</span></p></div>
    <p className='mb-5 min-h-12 text-sm leading-6 text-stone-600'>{cake.description}</p><button onClick={addToCart} className='btn-primary relative z-20 w-full !px-4 !py-2.5 text-sm'><ShoppingBag size={16} /> Add to cart</button></div>
  </article>
}
