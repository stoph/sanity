import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/live'
import { carsQuery, featuredCarsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { CarsQueryResult, FeaturedCarsQueryResult } from '@/sanity/types'

function getCarTitle(car: CarsQueryResult[0] | FeaturedCarsQueryResult[0]): string {
  if (car.titleOverride) {
    return car.titleOverride
  }
  const trim = car.trim ? ` ${car.trim}` : ''
  return `${car.year} ${car.make} ${car.model}${trim}`
}

function formatPrice(price?: number): string {
  if (!price) return 'Price on request'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function formatMileage(mileage?: number): string {
  if (!mileage) return 'Mileage not specified'
  return new Intl.NumberFormat('en-US').format(mileage) + ' miles'
}

export default async function CarsPage() {
  const [{ data: cars }, { data: featuredCars }] = await Promise.all([
    sanityFetch({ query: carsQuery }),
    sanityFetch({ query: featuredCarsQuery }),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">
              🚗 Finding Cars
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Cars</span>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🚗 Cars</h1>
              <p className="text-gray-600 mt-2">Discover your perfect car from our curated collection</p>
            </div>
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <Link
                href="/shop"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🛍️</span>
                <span>Shop</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Cars Section */}
        {featuredCars.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car: CarsQueryResult[0] | FeaturedCarsQueryResult[0]) => {
                if (!car.slug?.current || !car.location || !car.photos?.[0]?.asset) return null;
                
                return (
                  <Link
                    key={car._id}
                    href={`/cars/${car.slug.current}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={urlFor(car.photos[0].asset)?.width(400).height(225).url() || ''}
                        alt={car.photos[0].alt || getCarTitle(car)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                        Featured
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {getCarTitle(car)}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {car.location.city}, {car.location.state}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">
                          {formatPrice(car.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* All Cars Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Cars ({cars.length})
            </h2>
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🚗</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars available</h3>
              <p className="text-gray-600">Check back soon for new listings!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car: CarsQueryResult[0] | FeaturedCarsQueryResult[0]) => {
                if (!car.slug?.current || !car.location) return null;
                
                return (
                  <Link
                    key={car._id}
                    href={`/cars/${car.slug.current}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative">
                      {car.photos?.[0]?.asset ? (
                        <Image
                          src={urlFor(car.photos[0].asset)?.width(400).height(225).url() || ''}
                          alt={car.photos[0].alt || getCarTitle(car)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-4xl">🚗</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Available
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {getCarTitle(car)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {car.location.city}, {car.location.state}
                      </p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{formatMileage(car.mileage)}</p>
                        {car.condition && (
                          <p className="capitalize">Condition: {car.condition}</p>
                        )}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">
                          {formatPrice(car.price)}
                        </span>
                        <span className="text-blue-600 font-medium group-hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 Finding Cars. Built with Next.js and Sanity.
          </p>
        </div>
      </footer>
    </div>
  )
} 