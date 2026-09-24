import { CakeSlice, ChefHat, ChevronDown, Cookie, Heart, HeartHandshake, Menu, Palette, PartyPopper, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { BrandLogo } from './BrandLogo'

const links = [['/', 'Home'], ['/cakes', 'Cakes'], ['/about', 'About'], ['/contact', 'Contact']]
const menuCategories = [
  { name: 'Birthday', icon: CakeSlice },
  { name: 'Anniversary', icon: Heart },
  { name: 'Wedding', icon: HeartHandshake },
  { name: 'Kids', icon: PartyPopper },
  { name: 'Designer', icon: Palette },
  { name: 'Cheesecake', icon: CakeSlice },
  { name: 'Cupcake', icon: ChefHat },
  { name: 'Brownie', icon: Cookie },
  { name: 'Tea Cake', icon: ChefHat },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const linkClass = ({ isActive }: { isActive: boolean }) => 'transition hover:text-berry ' + (isActive ? 'font-bold text-berry' : 'text-stone-600')
  return <header className='sticky top-0 z-50 border-b border-[#eadfd8] bg-cream/95 backdrop-blur'>
    <div className='page-shell flex h-20 items-center justify-between'>
      <Link to='/' className='flex items-center text-cocoa' onClick={() => setOpen(false)} aria-label='Velvet Whisk home'><BrandLogo compact /></Link>
      <nav className='hidden items-center gap-8 md:flex' aria-label='Main navigation'><NavLink to='/' className={linkClass}>Home</NavLink><NavLink to='/cakes' className={linkClass}>Cakes</NavLink><div className='relative' onMouseEnter={() => setDesktopMenuOpen(true)} onMouseLeave={() => setDesktopMenuOpen(false)}><button type='button' onClick={() => setDesktopMenuOpen((current) => !current)} onFocus={() => setDesktopMenuOpen(true)} aria-expanded={desktopMenuOpen} className='flex items-center gap-1 py-7 text-stone-600 transition hover:text-berry'>Menu <ChevronDown size={16} className={'transition ' + (desktopMenuOpen ? 'rotate-180' : '')} /></button><div className={'absolute left-1/2 top-[4.5rem] z-50 w-[440px] -translate-x-1/2 overflow-hidden rounded-3xl border border-[#eadfd8] bg-white shadow-soft transition ' + (desktopMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0')}><div className='flex items-center justify-between border-b border-[#eadfd8] bg-blush/40 px-5 py-4'><div><p className='text-xs font-bold uppercase tracking-[.18em] text-gold'>Our menu</p><p className='mt-1 text-sm text-stone-500'>Find something for every celebration</p></div><CakeSlice className='text-berry' size={26} /></div><div className='grid grid-cols-2 gap-1 p-3'>{menuCategories.map(({ name, icon: Icon }) => <Link key={name} to={'/cakes?category=' + encodeURIComponent(name)} onClick={() => setDesktopMenuOpen(false)} className='flex items-center gap-3 rounded-2xl p-2.5 text-sm font-semibold text-stone-600 transition hover:bg-blush hover:text-berry'><span className='grid size-9 shrink-0 place-items-center rounded-xl bg-blush text-berry'><Icon size={17} /></span>{name}</Link>)}</div><Link to='/cakes' onClick={() => setDesktopMenuOpen(false)} className='flex items-center justify-center gap-2 border-t border-[#eadfd8] bg-cream px-5 py-3 text-sm font-bold text-berry transition hover:bg-blush'>View all cakes <ChevronDown size={15} className='-rotate-90' /></Link></div></div><NavLink to='/about' className={linkClass}>About</NavLink><NavLink to='/contact' className={linkClass}>Contact</NavLink></nav>
      <div className='flex items-center gap-2'>
        <Link to='/cart' aria-label={'Cart with ' + itemCount + ' items'} className='relative grid size-11 place-items-center rounded-full border border-[#dfd0c8] text-cocoa transition hover:bg-blush'><ShoppingBag size={20} />{itemCount > 0 && <span className='absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-berry text-[10px] font-bold text-white'>{itemCount}</span>}</Link>
        <Link to='/cakes' className='btn-primary hidden sm:inline-flex'>Order now</Link>
        <button className='grid size-11 place-items-center md:hidden' onClick={() => setOpen(!open)} aria-label='Toggle menu'>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav className='max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#eadfd8] bg-cream px-5 py-5 md:hidden'>{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => 'block rounded-xl px-4 py-3 ' + (isActive ? 'bg-blush font-bold text-berry' : 'text-stone-700')}>{label}</NavLink>)}<div className='mt-3 border-t border-[#eadfd8] pt-4'><p className='px-4 pb-2 text-xs font-bold uppercase tracking-[.18em] text-gold'>Menu categories</p><div className='grid grid-cols-2 gap-1'>{menuCategories.map(({ name, icon: Icon }) => <Link key={name} to={'/cakes?category=' + encodeURIComponent(name)} onClick={() => setOpen(false)} className='flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-stone-600 hover:bg-blush hover:text-berry'><Icon size={16} className='shrink-0 text-berry' />{name}</Link>)}</div></div></nav>}
  </header>
}
