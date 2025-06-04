export interface ShopifyImage {
  id: string
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyPrice {
  amount: string
  currencyCode: string
}

export interface ShopifyVariant {
  id: string
  title: string
  availableForSale: boolean
  priceV2: ShopifyPrice
  selectedOptions: {
    name: string
    value: string
  }[]
}

export interface ShopifyProductOption {
  name: string
  values: string[]
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml?: string
  priceRange: {
    minVariantPrice: ShopifyPrice
    maxVariantPrice?: ShopifyPrice
  }
  images: {
    edges: {
      node: ShopifyImage
    }[]
  }
  variants: {
    edges: {
      node: ShopifyVariant
    }[]
  }
  options?: ShopifyProductOption[]
  vendor?: string
  productType?: string
  tags?: string[]
}

export interface ShopifyProductEdge {
  node: ShopifyProduct
}

export interface ProductsResponse {
  data: {
    products: {
      edges: ShopifyProductEdge[]
    }
  }
} 