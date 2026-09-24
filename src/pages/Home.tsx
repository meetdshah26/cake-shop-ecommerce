import { ArrowRight, ChefHat, Gem, Palette, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CakeCard } from '../components/CakeCard'
import { cakes } from '../data/cakes'

export function Home() {
  return <main>
    <section className='relative min-h-[680px] overflow-hidden bg-[#f7e8dd]'>
      <img src='/images/hero-cake.png' alt='Chocolate celebration cake with raspberries' className='absolute inset-0 size-full object-cover object-[65%_center]' />
      <div className='absolute inset-0 bg-gradient-to-r from-[#fff9f2] via-[#fff9f2]/90 to-transparent' />
      <div className='page-shell relative flex min-h-[680px] items-center py-20'><div className='max-w-2xl'>
        <p className='eyebrow'><Sparkles size={15} /> Baked fresh, made personal</p>
        <h1 className='mt-5 font-display text-5xl font-semibold leading-[.98] text-cocoa sm:text-6xl lg:text-7xl'>Made with love, baked for your <em className='font-normal text-berry'>special moments.</em></h1>
        <p className='mt-7 max-w-lg text-base leading-7 text-stone-600 sm:text-lg'>Thoughtfully handcrafted 100% eggless cakes made with fine ingredients, fresh cream and a little extra joy.</p>
        <div className='mt-9 flex flex-wrap gap-3'><Link to='/cakes' className='btn-primary'>Explore cakes <ArrowRight size={18} /></Link><Link to='/cakes' className='btn-secondary'>Order now</Link></div>
        <div className='mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-600'><span>✦ 100% eggless</span><span>✦ Baked daily</span><span>✦ Custom messages</span></div>
      </div></div>
    </section>
    <section className='section-space page-shell'><div className='section-heading'><p className='eyebrow justify-center'>Our favourites</p><h2>Cakes everyone is talking about</h2><p>Beautifully finished, irresistibly soft and ready to make the day sweeter.</p></div><div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>{cakes.slice(0, 6).map((cake) => <CakeCard key={cake.id} cake={cake} />)}</div></section>
    <section className='bg-blush/60'><div className='section-space page-shell'><div className='section-heading'><p className='eyebrow justify-center'>The Kash & Crumbs promise</p><h2>Goodness in every little detail</h2></div><div className='grid gap-5 md:grid-cols-3'>
      {[['100% eggless', 'Every recipe is completely egg-free, without compromising on softness or flavour.', ChefHat], ['Fine ingredients', 'Real chocolate, fresh cream and carefully sourced flavours.', Gem], ['Made for you', 'Custom finishes and heartfelt messages for your moment.', Palette]].map(([title, text, Icon]) => <div key={title as string} className='rounded-3xl bg-white p-7 text-center shadow-sm'><span className='mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-blush text-berry'><Icon size={26} /></span><h3 className='font-display text-2xl font-semibold text-cocoa'>{title as string}</h3><p className='mt-2 text-sm leading-6 text-stone-600'>{text as string}</p></div>)}
    </div></div></section>
    <section className='page-shell py-20'><div className='overflow-hidden rounded-[2.5rem] bg-cocoa px-6 py-14 text-center text-white sm:px-12'><p className='text-sm font-bold uppercase tracking-[.22em] text-[#e8ad72]'>A celebration is waiting</p><h2 className='mx-auto mt-3 max-w-xl font-display text-4xl font-semibold sm:text-5xl'>Ready to order your perfect cake?</h2><p className='mx-auto mt-4 max-w-lg text-white/65'>Pick a favourite, add your message, and we will make it especially for you.</p><Link to='/cakes' className='btn-light mt-8'>Order now <ArrowRight size={18} /></Link></div></section>
  </main>
}
