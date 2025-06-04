import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <span className="text-8xl mb-8 block">📦</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be incorrect.
        </p>
        <Link
          href="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mr-4"
        >
          Browse All Products
        </Link>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
} 