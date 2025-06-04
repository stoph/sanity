export interface Car {
  _id: string
  titleOverride?: string
  year: number
  make: string
  model: string
  trim?: string
  bodyStyle?: string
  transmission?: string
  fuelType?: string
  drivetrain?: string
  exteriorColor?: string
  interiorColor?: string
  vin?: string
  price?: number
  negotiable?: boolean
  mileage?: number
  condition?: string
  description?: any[] // Portable text array
  location: {
    city: string
    state: string
  }
  availabilityStatus: 'available' | 'sold' | 'not-for-sale' | 'under-contract'
  saleLocation?: string
  photos: CarPhoto[]
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    preferredContact?: 'email' | 'phone' | 'text'
  }
  publishedAt: string
  slug: {
    current: string
  }
  featured?: boolean
}

export interface CarPhoto {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  isMainPhoto?: boolean
}

export interface CarListItem {
  _id: string
  titleOverride?: string
  year: number
  make: string
  model: string
  trim?: string
  price?: number
  mileage?: number
  condition?: string
  location: {
    city: string
    state: string
  }
  availabilityStatus: 'available' | 'sold' | 'not-for-sale' | 'under-contract'
  photos: CarPhoto[]
  publishedAt: string
  slug: {
    current: string
  }
} 