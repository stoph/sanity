import React, { useState, useEffect, useMemo } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Stack, Text, Card, Flex, Button, TextInput, Spinner, Box } from '@sanity/ui'

interface ShopifyProduct {
  id: string
  handle: string
  title: string
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
  variants: {
    edges: Array<{
      node: {
        price: {
          amount: string
          currencyCode: string
        }
        availableForSale: boolean
      }
    }>
  }
}

interface ShopifyResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct
      }>
    }
  }
}

export function ProductSelector(props: StringInputProps) {
  const { onChange, value = '' } = props
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)

  // Fetch products from Shopify
  const fetchProducts = async (search: string = '') => {
    setLoading(true)
    setError(null)
    
    try {
      const query = `
        query getProducts($first: Int!, $query: String) {
          products(first: $first, query: $query) {
            edges {
              node {
                id
                handle
                title
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        first: 20,
        ...(search && { query: search }),
      }

      console.log('Sending query:', { query, variables })

      const response = await fetch('http://localhost:3000/api/shopify/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ShopifyResponse = await response.json()
      console.log('Response data:', data)
      
      if (data.data?.products?.edges) {
        setProducts(data.data.products.edges.map(edge => edge.node))
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  const debouncedSearch = useMemo(() => {
    const timeoutId = setTimeout(() => {
      if (showSearch) {
        fetchProducts(searchTerm)
      }
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, showSearch])

  useEffect(() => {
    return debouncedSearch
  }, [debouncedSearch])

  // Get selected product info
  const selectedProduct = products.find(p => p.handle === value)

  return (
    <Stack space={3}>
      {/* Current Selection */}
      {value && (
        <Card padding={3} tone="primary" border>
          <Flex align="center" justify="space-between">
            <Box flex={1}>
              {selectedProduct ? (
                <Flex align="center" gap={3}>
                  {selectedProduct.images.edges[0]?.node.url && (
                    <img
                      src={selectedProduct.images.edges[0].node.url}
                      alt={selectedProduct.images.edges[0].node.altText || selectedProduct.title}
                      style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                    />
                  )}
                  <Stack space={1}>
                    <Text weight="semibold">{selectedProduct.title}</Text>
                    <Text size={1} muted>
                      Handle: {selectedProduct.handle} • 
                      ${selectedProduct.variants.edges[0]?.node.price.amount || 'N/A'}
                    </Text>
                  </Stack>
                </Flex>
              ) : (
                <Text>Product: {value}</Text>
              )}
            </Box>
            <Button
              mode="ghost"
              tone="critical"
              text="Remove"
              onClick={() => onChange(unset())}
            />
          </Flex>
        </Card>
      )}

      {/* Search Toggle */}
      {!showSearch ? (
        <Button
          mode="default"
          text={value ? "Change Product" : "Select Product"}
          onClick={() => {
            setShowSearch(true)
            if (products.length === 0) {
              fetchProducts()
            }
          }}
        />
      ) : (
        <Stack space={3}>
          {/* Search Input */}
          <TextInput
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />

          {/* Loading */}
          {loading && (
            <Flex align="center" justify="center" padding={4}>
              <Spinner />
            </Flex>
          )}

          {/* Error */}
          {error && (
            <Card padding={3} tone="critical" border>
              <Text>{error}</Text>
            </Card>
          )}

          {/* Products List */}
          {!loading && products.length > 0 && (
            <Stack space={2}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  padding={3}
                  tone={value === product.handle ? 'primary' : 'default'}
                  border
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onChange(set(product.handle))
                    setShowSearch(false)
                  }}
                >
                  <Flex align="center" gap={3}>
                    {product.images.edges[0]?.node.url && (
                      <img
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                      />
                    )}
                    <Stack space={1} flex={1}>
                      <Text weight="semibold">{product.title}</Text>
                      <Text size={1} muted>
                        ${product.variants.edges[0]?.node.price.amount || 'N/A'}
                      </Text>
                      <Text size={1} muted>
                        Handle: {product.handle}
                      </Text>
                    </Stack>
                  </Flex>
                </Card>
              ))}
            </Stack>
          )}

          {/* No Results */}
          {!loading && products.length === 0 && searchTerm && (
            <Card padding={3} tone="caution" border>
              <Text>No products found for "{searchTerm}"</Text>
            </Card>
          )}

          {/* Cancel */}
          <Button
            mode="ghost"
            text="Cancel"
            onClick={() => setShowSearch(false)}
          />
        </Stack>
      )}
    </Stack>
  )
} 