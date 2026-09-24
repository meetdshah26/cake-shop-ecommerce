export type DeliveryLocation = { latitude: number; longitude: number }
export type SavedDelivery = { pincode: string; location: DeliveryLocation | null }

const delhiNcrPincodePrefixes = ['110', '121', '122', '201']

export function isDelhiNcrPincode(pincode: string) {
  return /^[1-9][0-9]{5}$/.test(pincode) && delhiNcrPincodePrefixes.includes(pincode.slice(0, 3))
}

export function isLocationInDelhiNcr(location: DeliveryLocation) {
  return location.latitude >= 28.2 && location.latitude <= 29.05 && location.longitude >= 76.65 && location.longitude <= 78.05
}

export function isDeliveryServiceable(delivery: SavedDelivery) {
  return isDelhiNcrPincode(delivery.pincode) || Boolean(delivery.location && isLocationInDelhiNcr(delivery.location))
}

export function readSavedDelivery(): SavedDelivery {
  try {
    const saved = JSON.parse(localStorage.getItem('crumb-delivery') || 'null') as SavedDelivery | null
    return saved && isDeliveryServiceable(saved) ? saved : { pincode: '', location: null }
  } catch {
    return { pincode: '', location: null }
  }
}
