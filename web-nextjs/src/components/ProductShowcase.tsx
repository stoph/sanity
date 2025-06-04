"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/types/shopify'

interface ProductShowcaseProps {
  productHandle: string
  displayStyle: 'card' | 'banner' | 'minimal'
  customNote?: string
}

interface ProductShowcaseData {
  product: ShopifyProduct | null
  loading: boolean
  error: string | null
}

export default function ProductShowcase({ productHandle, displayStyle, customNote }: ProductShowcaseProps) {
  const [data, setData] = useState<ProductShowcaseData>({
    product: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }))
        
        const response = await fetch(`/api/shopify/product/${productHandle}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        
        const product = await response.json()
        setData({ product, loading: false, error: null })
      } catch (error) {
        console.error('Error fetching product:', error)
        setData({
          product: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load product'
        })
      }
    }

    if (productHandle) {
      fetchProduct()
    }
  }, [productHandle])

  if (data.loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    )
  }

  if (data.error || !data.product) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          {data.error || `Product "${productHandle}" not found`}
        </p>
      </div>
    )
  }

  const product = data.product
  const productUrl = `/shop/${product.handle}`
  const price = product.variants.edges[0]?.node.priceV2
  const image = product.images.edges[0]?.node
  const isAvailable = product.variants.edges[0]?.node.availableForSale

  // Card Style (Default)
  if (displayStyle === 'card') {
    return (
      <div className="my-8 not-prose">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/3">
              {image?.url ? (
                <div className="aspect-square relative">
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">🛍️</span>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {product.title}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {price && (
                <p className="text-2xl font-bold text-blue-600 mb-3">
                  ${price.amount} {price.currencyCode}
                </p>
              )}
              
              {product.description && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
              )}
              
              {customNote && (
                <p className="text-gray-700 bg-blue-50 p-3 rounded-md mb-4 text-sm">
                  💡 {customNote}
                </p>
              )}
              
              <Link
                href={productUrl}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Product
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Banner Style
  if (displayStyle === 'banner') {
    return (
      <div className="my-6 not-prose">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-4">
            {/* Product Image */}
            {image?.url ? (
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 text-xl">🛍️</span>
              </div>
            )}
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {product.title}
              </h4>
              {price && (
                <p className="text-blue-600 font-medium">
                  ${price.amount} {price.currencyCode}
                </p>
              )}
              {customNote && (
                <p className="text-sm text-gray-600 truncate">
                  {customNote}
                </p>
              )}
            </div>
            
            {/* CTA */}
            <Link
              href={productUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Minimal Style
  if (displayStyle === 'minimal') {
    return (
      <div className="my-4 not-prose">
        <div className="inline-flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border">
          <span className="text-lg">🛍️</span>
          <span className="font-medium text-gray-900">{product.title}</span>
          {price && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-blue-600 font-medium">
                ${price.amount}
              </span>
            </>
          )}
          <Link
            href={productUrl}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Product →
          </Link>
        </div>
        {customNote && (
          <p className="text-sm text-gray-600 mt-2 ml-1">
            💡 {customNote}
          </p>
        )}
      </div>
    )
  }

  return null
} 