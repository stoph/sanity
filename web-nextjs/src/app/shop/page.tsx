import Link from 'next/link'
import { getProductsWithPagination } from '@/lib/shopify'
import ShopClient from './ShopClient'

export default async function ShopPage() {
  // Load initial 24 products server-side
  const { products: initialProducts, pageInfo } = await getProductsWithPagination(24)

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
            <span className="text-gray-900 font-medium">Shop</span>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🛍️ Shop</h1>
              <p className="text-gray-600 mt-2">Discover amazing products from our collection</p>
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
                href="/cars"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🚗</span>
                <span>Cars</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShopClient 
          initialProducts={initialProducts} 
          initialPageInfo={pageInfo}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 Finding Cars. Built with Next.js and Shopify.
          </p>
        </div>
      </footer>
    </div>
  )
} 