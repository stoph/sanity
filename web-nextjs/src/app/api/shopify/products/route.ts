import { NextRequest, NextResponse } from 'next/server'

const domain = process.env.SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

// CORS headers for Sanity studio
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3333',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, variables } = body

    const data = await shopifyGraphQL(query, variables)

    return NextResponse.json(data, {
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Error in Shopify API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products from Shopify' },
      { 
        status: 500,
        headers: corsHeaders,
      }
    )
  }
} 