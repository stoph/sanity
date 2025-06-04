'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getShopifyUrl } from '@/lib/shopify'
import type { ShopifyProduct } from '@/types/shopify'

type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
  endCursor: string | null
}

type ProductEdge = {
  cursor: string
  node: ShopifyProduct
}

type ShopClientProps = {
  initialProducts: ProductEdge[]
  initialPageInfo: PageInfo
}

export default function ShopClient({ initialProducts, initialPageInfo }: ShopClientProps) {
  const [products, setProducts] = useState(initialProducts)
  const [pageInfo, setPageInfo] = useState(initialPageInfo)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const loadMore = async () => {
    if (!pageInfo.hasNextPage || loading) return

    setLoading(true)
    try {
      const response = await fetch('/api/shop/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first: 24,
          after: pageInfo.endCursor,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(prev => [...prev, ...data.products])
      setPageInfo(data.pageInfo)
      setCurrentPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more products:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPage = async (after?: string, page?: number) => {
    setLoading(true)
    try {
      const response = await fetch('/api/shop/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first: 24,
          after: after,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data.products)
      setPageInfo(data.pageInfo)
      setCurrentPage(page || 1)
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Error loading page:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Products ({products.length}+)
        </h2>
        <div className="text-sm text-gray-600">
          Page {currentPage}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🛍️</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available</h3>
          <p className="text-gray-600">Check back soon for new items!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((productEdge: ProductEdge) => {
              const product = productEdge.node
              const mainImage = product.images.edges[0]?.node
              const price = product.priceRange.minVariantPrice
              const isAvailable = product.variants.edges.some((variant: any) => variant.node.availableForSale)

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/shop/${product.handle}`}>
                    <div className="aspect-square relative">
                      {mainImage ? (
                        <Image
                          src={mainImage.url}
                          alt={mainImage.altText || product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-6xl">📦</span>
                        </div>
                      )}
                      {!isAvailable && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          Sold Out
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/shop/${product.handle}`}>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {product.title}
                      </h3>
                    </Link>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description.substring(0, 100)}
                        {product.description.length > 100 && '...'}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          href={`/shop/${product.handle}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Details
                        </Link>
                        <a
                          href={getShopifyUrl(product.handle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          <div className="mt-12 flex justify-center space-x-4">
            {currentPage > 1 && (
              <button
                onClick={() => loadPage(undefined, 1)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First Page
              </button>
            )}
            
            {pageInfo.hasNextPage && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More</span>
                )}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  )
} 