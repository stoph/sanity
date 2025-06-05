import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/live'
import { landingPageQuery, featuredCarsQuery, recentArticlesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { FeaturedCarsQueryResult, RecentArticlesQueryResult } from '@/sanity/types'

function getCarTitle(car: FeaturedCarsQueryResult[0]): string {
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

export default async function LandingPage() {
  // Fetch landing page content and featured cars from Sanity
  const [{ data: landingPage }, { data: featuredCars }, { data: recentArticles }] = await Promise.all([
    sanityFetch({ query: landingPageQuery }),
    sanityFetch({ query: featuredCarsQuery }),
    sanityFetch({ query: recentArticlesQuery })
  ])

  // Fallback content if no landing page is set up in Sanity yet
  const defaultContent = {
    heroTitle: "Find Your Perfect Car",
    heroSubtitle: "Discover quality pre-owned vehicles with detailed inspection reports and transparent pricing.",
    features: [
      { icon: "🔍", title: "Quality Inspection", description: "Every car undergoes thorough inspection" },
      { icon: "💰", title: "Fair Pricing", description: "Transparent, market-competitive prices" },
      { icon: "🛠️", title: "Expert Support", description: "Professional guidance throughout your journey" }
    ],
    heroButtons: [
      { text: "Browse Cars", link: "/cars", style: "primary" },
      { text: "Shop Products", link: "/shop", style: "secondary" }
    ]
  }

  const content = landingPage || defaultContent

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              🚗 Finding Cars
            </Link>
            <div className="flex space-x-6">
              <Link
                href="/cars"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🚗</span>
                <span>Cars</span>
              </Link>
              <Link
                href="/shop"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🛍️</span>
                <span>Shop</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        {/* Hero Background Image */}
        {landingPage?.heroImage?.asset && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(landingPage.heroImage.asset)?.width(1920).height(1080).url() || ''}
              alt={landingPage.heroImage.alt || ''}
              fill
              className="object-cover opacity-20"
            />
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {content.heroTitle || "Find Your Perfect Car"}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {content.heroSubtitle || "Discover quality pre-owned vehicles with detailed inspection reports and transparent pricing."}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {content.heroButtons?.map((button, index) => (
              <Link
                key={index}
                href={button.link || '/cars'}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  button.style === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {button.text}
              </Link>
            )) || (
              <>
                <Link
                  href="/cars"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Cars
                </Link>
                <Link
                  href="/shop"
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Shop Products
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      {featuredCars && featuredCars.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Vehicles
              </h2>
              <p className="text-gray-600">
                Handpicked cars from our premium collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredCars.slice(0, 3).map((car: FeaturedCarsQueryResult[0]) => {
                if (!car.slug?.current || !car.location) return null;
                
                return (
                  <Link
                    key={car._id}
                    href={`/cars/${car.slug.current}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
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
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                        Featured
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {getCarTitle(car)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        📍 {car.location?.city ? `${car.location.city}${car.location.state ? `, ${car.location.state}` : ''}` : 'Location TBD'}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(car.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="text-center">
              <Link
                href="/cars"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View All Cars
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Finding Cars
            </h2>
            <p className="text-gray-600">
              Your trusted partner in finding the perfect vehicle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.features || defaultContent.features).map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      {recentArticles && recentArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-gray-600">
                Stay informed with our latest automotive insights and news
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recentArticles.map((article: RecentArticlesQueryResult[0]) => {
                if (!article.slug?.current) return null;
                
                return (
                  <Link
                    key={article._id}
                    href={`/articles/${article.slug.current}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-video relative">
                      {article.featuredImage?.asset ? (
                        <Image
                          src={urlFor(article.featuredImage.asset)?.width(400).height(225).url() || ''}
                          alt={article.featuredImage.alt || article.title || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-4xl">📝</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                        Article
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      {article.publishedAt && (
                        <p className="text-gray-500 text-xs">
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="text-center">
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                View All Articles
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">🚗 Finding Cars</h3>
              <p className="text-gray-300 mb-4">
                Your trusted destination for quality pre-owned vehicles and automotive products.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/cars" className="hover:text-white">Browse Cars</Link></li>
                <li><Link href="/shop" className="hover:text-white">Shop Products</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/financing" className="hover:text-white">Financing</Link></li>
                <li><Link href="/warranty" className="hover:text-white">Warranty</Link></li>
                <li><Link href="/service" className="hover:text-white">Service</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Finding Cars. Built with Next.js and Sanity.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
