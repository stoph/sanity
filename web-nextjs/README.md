# Next.js Frontend - @stoph

> **🧪 Test Application:** This is a learning project for exploring Next.js App Router, Shopify integration, and modern React patterns. Not for production!

The frontend application for the @stoph car directory and e-commerce platform. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Overview

This Next.js application provides:
- **Car Directory**: Browse and search car listings with detailed specifications
- **E-commerce Shop**: Shopify-powered product catalog with pagination
- **Content Pages**: Dynamic pages managed through Sanity CMS
- **Product Showcases**: Embedded Shopify products within rich content
- **SEO Optimization**: Server-side rendering with proper meta tags

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Shopify store with Storefront API access
- Access to the Sanity project (configured in `../sanity`)

### Environment Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your Shopify credentials to `.env.local`:**
   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
   ```

### Development

**Start the development server:**
```bash
npm run dev
```

Application available at: `http://localhost:3000`

**Note:** Ensure the Sanity Studio is also running at `http://localhost:3333` for full functionality.

## 🏗️ Architecture

### App Router Structure
```
src/app/
├── page.tsx                    # Landing page with hero, features, articles
├── cars/
│   ├── page.tsx               # Car directory listing
│   └── [slug]/page.tsx        # Individual car detail pages
├── shop/
│   ├── page.tsx               # Product catalog with pagination
│   └── [handle]/page.tsx      # Product detail pages
├── articles/page.tsx          # Article listing page
├── [slug]/page.tsx           # Dynamic pages from Sanity
└── api/
    ├── shop/products/         # Product pagination API
    └── shopify/
        ├── products/          # Product search API (for Studio)
        └── product/[handle]/  # Individual product API
```

### Key Features

- **Server-Side Rendering**: Fast initial page loads with SEO benefits
- **Dynamic Content**: Real-time content updates from Sanity CMS
- **Client-Side Pagination**: Smooth shopping experience with cursor-based pagination
- **Product Integration**: Seamless Shopify product embedding in content
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛍️ E-commerce Integration

### Shopify Storefront API
- **Product Catalog**: GraphQL queries for product listings
- **Pagination**: Cursor-based pagination for large catalogs
- **Product Details**: Individual product pages with variants and pricing
- **Search**: Product search functionality for Sanity Studio

### Product Showcases
Products can be embedded within Sanity content with three display styles:
- **Card**: Large showcase with detailed product information
- **Banner**: Compact horizontal layout
- **Minimal**: Inline text with product link

## 📝 Content Management

### Sanity Integration
- **GROQ Queries**: Optimized content fetching from Sanity
- **Live Preview**: Real-time content updates during editing
- **Rich Content**: PortableText rendering with custom components
- **Image Optimization**: Sanity CDN with Next.js Image component

### Dynamic Routing
- **Cars**: `/cars/[slug]` for individual car pages
- **Products**: `/shop/[handle]` for Shopify product pages  
- **Pages**: `/[slug]` for flexible Sanity-managed pages
- **Articles**: `/articles` listing and individual article pages

## 🎨 Styling & UI

### Tailwind CSS
- **Utility-First**: Rapid UI development with utility classes
- **Responsive Design**: Mobile-first breakpoint system
- **Custom Components**: Reusable component library
- **Dark Mode Ready**: Prepared for theme switching

### Components
```
src/components/
├── ProductShowcase.tsx        # Embedded Shopify products
├── ShopClient.tsx            # Client-side shop pagination
└── [Other components]        # Additional UI components
```

## 🔧 API Routes

### Internal APIs
- **`/api/shop/products`**: Product pagination for shop page
- **`/api/shopify/products`**: Product search (CORS enabled for Studio)
- **`/api/shopify/product/[handle]`**: Individual product data

### CORS Configuration
API routes include CORS headers to allow Sanity Studio access for product selection.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard:**
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
   ```
3. **Deploy:** Automatic deployments on git push

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔗 Related Documentation

- [**Sanity Studio Setup**](../sanity/README.md) - Content management system
- [**Main Project README**](../README.md) - Complete monorepo overview

## 📚 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity with GROQ queries
- **E-commerce**: Shopify Storefront API
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image + Sanity CDN
