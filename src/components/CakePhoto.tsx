type CakePhotoProps = {
  index: number
  className?: string
  variant?: 'front' | 'top'
  collection?: 'cakes' | 'bakes'
  src?: string
  alt?: string
}

export function CakePhoto({ index, className = '', variant = 'front', collection = 'cakes', src, alt = 'Handcrafted eggless bakery product' }: CakePhotoProps) {
  if (src) return <img src={src} alt={alt} className={'block w-full object-cover ' + className} />
  return <div role='img' aria-label='Handcrafted eggless bakery product' className={'cake-photo cake-photo-' + index + ' cake-photo--' + variant + ' cake-photo--' + collection + ' ' + className} />
}
