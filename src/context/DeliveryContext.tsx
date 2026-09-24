import { CheckCircle2, LocateFixed, MapPin, X } from 'lucide-react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { isDelhiNcrPincode, isDeliveryServiceable, isLocationInDelhiNcr, readSavedDelivery } from '../utils/delivery'
import type { SavedDelivery } from '../utils/delivery'

type DeliveryContextValue = { requestDelivery: (onConfirmed: () => void) => void }

const DeliveryContext = createContext<DeliveryContextValue | null>(null)

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [delivery, setDelivery] = useState<SavedDelivery>(readSavedDelivery)
  const [isOpen, setIsOpen] = useState(false)
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading'>('idle')
  const pendingAction = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isOpen])

  const finish = (nextDelivery: SavedDelivery) => {
    setDelivery(nextDelivery)
    localStorage.setItem('crumb-delivery', JSON.stringify(nextDelivery))
    setIsOpen(false)
    setError('')
    pendingAction.current?.()
    pendingAction.current = null
  }

  const requestDelivery = (onConfirmed: () => void) => {
    if (isDeliveryServiceable(delivery)) {
      onConfirmed()
      return
    }
    pendingAction.current = onConfirmed
    setPincode('')
    setError('')
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setError('')
    pendingAction.current = null
  }

  const confirmPincode = () => {
    if (!isDelhiNcrPincode(pincode)) {
      setError('Sorry, we currently deliver only within Delhi NCR. Please enter a Delhi NCR pincode.')
      return
    }
    finish({ pincode, location: null })
  }

  const shareLocation = () => {
    if (!navigator.geolocation) {
      setError('Location access is unavailable. Please enter your pincode instead.')
      return
    }
    setGeoStatus('loading')
    setError('')
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoStatus('idle')
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      if (!isLocationInDelhiNcr(location)) {
        setError('Sorry, your current location is outside our Delhi NCR delivery area.')
        return
      }
      finish({ pincode: '', location })
    }, () => {
      setGeoStatus('idle')
      setError('We could not access your location. Please allow access or enter your pincode.')
    }, { enableHighAccuracy: false, timeout: 10000 })
  }

  return <DeliveryContext.Provider value={{ requestDelivery }}>
    {children}
    {isOpen && <div className='fixed inset-0 z-[100] grid place-items-center bg-cocoa/55 p-4 backdrop-blur-sm' role='presentation' onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
      <section role='dialog' aria-modal='true' aria-labelledby='delivery-check-title' className='relative w-full max-w-lg rounded-[2rem] bg-cream p-6 shadow-2xl sm:p-8'>
        <button type='button' onClick={close} aria-label='Close delivery check' className='absolute right-4 top-4 grid size-10 place-items-center rounded-full text-stone-500 transition hover:bg-white hover:text-berry'><X size={20} /></button>
        <span className='grid size-12 place-items-center rounded-full bg-blush text-berry'><MapPin size={23} /></span>
        <p className='eyebrow mt-5'>Delivery check</p>
        <h2 id='delivery-check-title' className='mt-2 pr-8 font-display text-3xl font-semibold text-cocoa sm:text-4xl'>Do we deliver to you?</h2>
        <p className='mt-3 leading-6 text-stone-600'>We currently serve Delhi NCR only. Share your location or enter your pincode before adding this cake.</p>
        <button type='button' onClick={shareLocation} disabled={geoStatus === 'loading'} className='btn-secondary mt-6 w-full disabled:cursor-wait disabled:opacity-60'><LocateFixed size={18} /> {geoStatus === 'loading' ? 'Checking location…' : 'Use my current location'}</button>
        <div className='my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-stone-400'><span className='h-px flex-1 bg-[#dfd0c8]' />or<span className='h-px flex-1 bg-[#dfd0c8]' /></div>
        <label className='field-label' htmlFor='delivery-pincode'>Delivery pincode</label>
        <div className='flex flex-col gap-3 sm:flex-row'><input autoFocus id='delivery-pincode' className='field-input' inputMode='numeric' maxLength={6} placeholder='Enter 6-digit pincode' value={pincode} onChange={(event) => { setPincode(event.target.value.replace(/[^0-9]/g, '').slice(0, 6)); setError('') }} onKeyDown={(event) => { if (event.key === 'Enter') confirmPincode() }} /><button type='button' onClick={confirmPincode} className='btn-primary shrink-0'><CheckCircle2 size={18} /> Check & add</button></div>
        {error && <p role='alert' className='mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700'>{error}</p>}
        <p className='mt-5 text-center text-xs text-stone-400'>Your location is used only to check delivery availability.</p>
      </section>
    </div>}
  </DeliveryContext.Provider>
}

export function useDelivery() {
  const context = useContext(DeliveryContext)
  if (!context) throw new Error('useDelivery must be used inside DeliveryProvider')
  return context
}
