const domain = process.env.SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

async function ShopifyData(query: string, variables?: any) {
  const URL = `https://${domain}/api/2023-07/graphql.json`

  const options = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables })
  }

  try {
    const response = await fetch(URL, options)
    
    if (!response.ok) {
      console.error('Shopify API Error:', response.status, response.statusText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Debug logging
    console.log('Shopify API Response:', JSON.stringify(data, null, 2))
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      throw new Error('GraphQL errors: ' + JSON.stringify(data.errors))
    }
    
    return data
  } catch (error) {
    console.error('Shopify API Error:', error)
    throw new Error("Products not fetched: " + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

// Get products with pagination support
export async function getProductsWithPagination(first: number = 24, after?: string) {
  // Debug environment variables
  console.log('Shopify Config:', {
    domain: domain || 'NOT SET',
    hasToken: !!storefrontAccessToken,
    tokenLength: storefrontAccessToken?.length || 0
  })

  const query = `
    query getProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const variables = { first, after }
  const response = await ShopifyData(query, variables)
  
  // Add more detailed checking
  if (!response || !response.data) {
    console.error('No data in response:', response)
    return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null } }
  }
  
  if (!response.data.products) {
    console.error('No products in response.data:', response.data)
    return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null } }
  }
  
  const products = response.data.products.edges || []
  const pageInfo = response.data.products.pageInfo
  
  console.log(`Found ${products.length} products`)
  console.log('Page info:', pageInfo)
  
  return { products, pageInfo }
}

// Get all products (legacy function for backwards compatibility)
export async function getProductsInCollection() {
  const result = await getProductsWithPagination(24)
  return result.products
}

// Get single product by handle
export async function getProduct(handle: string) {
  const query = `{
    product(handle: "${handle}") {
      id
      title
      handle
      description
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
      vendor
      productType
      tags
    }
  }`

  const response = await ShopifyData(query)
  const product = response.data.product ? response.data.product : []
  return product
}

// Helper function to format price
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

// Generate Shopify product URL
export function getShopifyUrl(handle: string): string {
  return `https://${domain}/products/${handle}`
} 