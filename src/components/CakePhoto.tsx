type CakePhotoProps = {
  index: number
  className?: string
  variant?: 'front' | 'top'
  collection?: 'cakes' | 'bakes'
}

export function CakePhoto({ index, className = '', variant = 'front', collection = 'cakes' }: CakePhotoProps) {
  return <div role='img' aria-label='Handcrafted eggless bakery product' className={'cake-photo cake-photo-' + index + ' cake-photo--' + variant + ' cake-photo--' + collection + ' ' + className} />
}
