import { NextRequest, NextResponse } from 'next/server'

const domain = process.env.SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

async function shopifyGraphQL(query: string, variables?: any) {
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
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      throw new Error('GraphQL query failed')
    }
    
    return data
  } catch (error) {
    console.error('Shopify API request failed:', error)
    throw error
  }
}

type RouteParams = {
  params: {
    handle: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { handle } = params

    if (!handle) {
      return NextResponse.json(
        { error: 'Product handle is required' },
        { status: 400 }
      )
    }

    const query = `
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
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
          variants(first: 10) {
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
        }
      }
    `

    const variables = { handle }
    const data = await shopifyGraphQL(query, variables)
    
    if (!data.data.productByHandle) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data.data.productByHandle)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
} 