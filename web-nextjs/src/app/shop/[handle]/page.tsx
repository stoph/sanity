import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, formatPrice, getShopifyUrl } from '@/lib/shopify'
import type { ShopifyProduct, ShopifyVariant } from '@/types/shopify'

interface PageProps {
  params: Promise<{
    handle: string
  }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params
  const product: ShopifyProduct = await getProduct(handle)

  if (!product || !product.id) {
    notFound()
  }

  const mainImage = product.images.edges[0]?.node
  const price = product.priceRange.minVariantPrice
  const maxPrice = product.priceRange.maxVariantPrice
  const variants = product.variants.edges.map(edge => edge.node)
  const availableVariants = variants.filter(variant => variant.availableForSale)
  const isAvailable = availableVariants.length > 0

  // Check if product has price range
  const hasPriceRange = maxPrice && parseFloat(price.amount) !== parseFloat(maxPrice.amount)

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
            <Link href="/shop" className="hover:text-blue-600">
              Shop
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-8xl">📦</span>
                </div>
              )}
            </div>
            
            {/* Image Gallery */}
            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.slice(0, 8).map((imageEdge, index) => (
                  <div key={imageEdge.node.id} className="aspect-square relative rounded overflow-hidden bg-white shadow-sm">
                    <Image
                      src={imageEdge.node.url}
                      alt={imageEdge.node.altText || `${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {hasPriceRange ? (
                    `${formatPrice(price.amount, price.currencyCode)} - ${formatPrice(maxPrice!.amount, maxPrice!.currencyCode)}`
                  ) : (
                    formatPrice(price.amount, price.currencyCode)
                  )}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isAvailable ? 'In Stock' : 'Sold Out'}
                </div>
              </div>

              {/* Buy Now Button */}
              <a
                href={getShopifyUrl(product.handle)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-6 rounded-lg font-medium text-center block transition-colors ${
                  isAvailable
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAvailable ? 'Buy Now on Shopify' : 'Out of Stock'}
              </a>
            </div>

            {/* Product Details */}
            {(product.vendor || product.productType) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <dl className="space-y-2">
                  {product.vendor && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand:</dt>
                      <dd className="font-medium">{product.vendor}</dd>
                    </div>
                  )}
                  {product.productType && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type:</dt>
                      <dd className="font-medium">{product.productType}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Variants */}
            {variants.length > 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Options</h3>
                <div className="space-y-3">
                  {variants.map((variant: ShopifyVariant) => (
                    <div 
                      key={variant.id} 
                      className={`p-3 rounded border ${
                        variant.availableForSale 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{variant.title}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">
                            {formatPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
                          </span>
                          {!variant.availableForSale && (
                            <span className="text-xs text-red-600 font-medium">Sold Out</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            {product.descriptionHtml ? (
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}
          </div>
        )}

        {/* Back to Shop */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Shop
          </Link>
        </div>
      </main>
    </div>
  )
} 