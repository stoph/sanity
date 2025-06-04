import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <span className="text-8xl mb-8 block">🚗</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the car you're looking for. It may have been sold or removed from our listings.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Browse All Cars
        </Link>
      </div>
    </div>
  )
} 