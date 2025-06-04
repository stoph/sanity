import { NextRequest, NextResponse } from 'next/server'
import { getProductsWithPagination } from '@/lib/shopify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { first = 24, after } = body

    const { products, pageInfo } = await getProductsWithPagination(first, after)

    return NextResponse.json({
      products,
      pageInfo
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 