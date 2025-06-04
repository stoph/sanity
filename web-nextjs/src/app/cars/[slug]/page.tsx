import { sanityFetch } from '@/sanity/live'
import { carQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { CarQueryResult } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

function getCarTitle(car: NonNullable<CarQueryResult>): string {
  if (car.titleOverride) {
    return car.titleOverride
  }
  const trim = car.trim ? ` ${car.trim}` : ''
  return `${car.year} ${car.make} ${car.model}${trim}`
}

function formatPrice(price?: number, negotiable?: boolean): string {
  if (!price) return 'Price on request'
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
  return negotiable ? `${formatted} (Negotiable)` : formatted
}

function formatMileage(mileage?: number): string {
  if (!mileage) return 'Not specified'
  return new Intl.NumberFormat('en-US').format(mileage) + ' miles'
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function CarDetailPage({ params }: PageProps) {
  const { data: car } = await sanityFetch({ query: carQuery, params: { slug: params.slug } })

  if (!car) {
    notFound()
  }

  const mainPhoto = car.photos.find((photo: any) => photo.isMainPhoto) || car.photos[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              🚗 Finding Cars
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{getCarTitle(car)}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video relative">
                {mainPhoto ? (
                  <Image
                    src={urlFor(mainPhoto.asset)?.width(800).height(450).url() || ''}
                    alt={mainPhoto.alt || getCarTitle(car)}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-6xl">🚗</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {car.availabilityStatus === 'available' ? 'Available' : car.availabilityStatus.replace('-', ' ').toUpperCase()}
                </div>
              </div>
              
              {/* Photo Gallery */}
              {car.photos.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {car.photos.slice(0, 8).map((photo: any, index: number) => (
                      <div key={index} className="aspect-square relative rounded overflow-hidden">
                        <Image
                          src={urlFor(photo.asset)?.width(150).height(150).url() || ''}
                          alt={photo.alt || `${getCarTitle(car)} - Photo ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                  {car.photos.length > 8 && (
                    <p className="text-center text-gray-600 text-sm mt-2">
                      +{car.photos.length - 8} more photos
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {getCarTitle(car)}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Year:</dt>
                      <dd className="font-medium">{car.year}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Make:</dt>
                      <dd className="font-medium">{car.make}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Model:</dt>
                      <dd className="font-medium">{car.model}</dd>
                    </div>
                    {car.trim && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Trim:</dt>
                        <dd className="font-medium">{car.trim}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Mileage:</dt>
                      <dd className="font-medium">{formatMileage(car.mileage)}</dd>
                    </div>
                    {car.condition && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Condition:</dt>
                        <dd className="font-medium capitalize">{car.condition}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <dl className="space-y-2">
                    {car.bodyStyle && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Body Style:</dt>
                        <dd className="font-medium capitalize">{car.bodyStyle}</dd>
                      </div>
                    )}
                    {car.transmission && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Transmission:</dt>
                        <dd className="font-medium capitalize">{car.transmission}</dd>
                      </div>
                    )}
                    {car.fuelType && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Fuel Type:</dt>
                        <dd className="font-medium capitalize">{car.fuelType}</dd>
                      </div>
                    )}
                    {car.drivetrain && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Drivetrain:</dt>
                        <dd className="font-medium">{car.drivetrain.toUpperCase()}</dd>
                      </div>
                    )}
                    {car.exteriorColor && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Exterior Color:</dt>
                        <dd className="font-medium">{car.exteriorColor}</dd>
                      </div>
                    )}
                    {car.interiorColor && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Interior Color:</dt>
                        <dd className="font-medium">{car.interiorColor}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {car.vin && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">VIN:</dt>
                    <dd className="font-mono text-sm">{car.vin}</dd>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {car.description && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  {/* This would need proper portable text rendering in a real app */}
                  <p className="text-gray-700 leading-relaxed">
                    {car.description.map((block: any, index: number) => 
                      block._type === 'block' ? (
                        <span key={index}>
                          {block.children?.map((child: any) => child.text).join(' ')}
                        </span>
                      ) : null
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatPrice(car.price, car.negotiable)}
                </div>
                <p className="text-gray-600 text-sm">
                  Listed on {formatDate(car.publishedAt)}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-700">
                📍 {car.location.city}, {car.location.state}
              </p>
              {car.saleLocation && (
                <p className="text-gray-600 text-sm mt-2">
                  Available at: {car.saleLocation}
                </p>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Seller</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {car.contactInfo.firstName} {car.contactInfo.lastName}
                  </p>
                </div>
                <div className="space-y-2">
                  <a
                    href={`mailto:${car.contactInfo.email}?subject=Interested in ${getCarTitle(car)}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    ✉️ {car.contactInfo.email}
                  </a>
                  <a
                    href={`tel:${car.contactInfo.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    📞 {car.contactInfo.phone}
                  </a>
                </div>
                {car.contactInfo.preferredContact && (
                  <p className="text-gray-600 text-sm">
                    Prefers contact via {car.contactInfo.preferredContact}
                  </p>
                )}
              </div>
              
              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Send Message
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Save to Favorites
                </button>
              </div>
            </div>

            {/* Back to Listings */}
            <div className="text-center">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to all cars
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
