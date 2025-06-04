import { NextResponse } from 'next/server'

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  // Check environment variables
  if (!domain || !token) {
    return NextResponse.json({
      error: 'Missing environment variables',
      domain: !!domain,
      token: !!token
    }, { status: 500 })
  }

  // Test basic shop query
  const query = `{
    shop {
      name
      description
    }
  }`

  try {
    const response = await fetch(`https://${domain}/api/2023-07/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    })

    const data = await response.json()

    return NextResponse.json({
      success: true,
      status: response.status,
      data,
      config: {
        domain,
        tokenLength: token.length
      }
    })

  } catch (error) {
    return NextResponse.json({
      error: 'API call failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 