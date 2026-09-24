type BrandLogoProps = {
  inverse?: boolean
  compact?: boolean
}

export function BrandLogo({ inverse = false, compact = false }: BrandLogoProps) {
  return <span className={'inline-flex items-center gap-3 ' + (inverse ? 'text-white' : 'text-cocoa')}>
    <img src='/images/velvet-whisk-logo.png' alt='' className={'shrink-0 rounded-full object-cover shadow-sm ' + (compact ? 'size-14' : 'size-20')} />
    <span className='leading-none'><strong className={'block font-display font-semibold tracking-[.08em] ' + (compact ? 'text-xl' : 'text-2xl')}>VELVET WHISK</strong><small className={'mt-1 block text-[9px] font-bold uppercase tracking-[.24em] ' + (inverse ? 'text-white/45' : 'text-stone-400')}>100% eggless bakery</small></span>
  </span>
}
