import { Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import { InstagramIcon } from './InstagramIcon'

export function Footer() {
  return <footer className='bg-cocoa text-white'><div className='page-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]'>
    <div><BrandLogo inverse /><p className='mt-5 max-w-sm text-sm leading-6 text-white/65'>100% eggless handcrafted cakes made fresh for birthdays, milestones and all the little moments worth celebrating.</p></div>
    <div><h3 className='mb-4 font-bold'>Quick links</h3><div className='grid gap-2 text-sm text-white/65'><Link to='/cakes'>Shop cakes</Link><Link to='/about'>Our story</Link><Link to='/contact'>Contact us</Link><Link to='/cart'>Your cart</Link></div></div>
    <div><h3 className='mb-4 font-bold'>Follow & visit</h3><div className='grid gap-3 text-sm text-white/65'><a href='https://www.instagram.com/velvet___whisk/' target='_blank' rel='noreferrer' className='flex gap-2 transition hover:text-white'><InstagramIcon size={17} /> @velvet___whisk</a><p className='flex gap-2'><Clock3 size={17} /> Every day · 9:00 AM — 9:00 PM</p></div></div>
  </div><div className='border-t border-white/10 py-5 text-center text-xs text-white/45'>© {new Date().getFullYear()} Velvet Whisk. All rights reserved.</div></footer>
}
