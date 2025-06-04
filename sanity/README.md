# Sanity Studio - Content Management System

> **📚 Learning Project:** This Sanity Studio setup is for exploring CMS concepts and testing integrations. Perfect for learning Sanity's features!

The Sanity Studio for the @stoph car directory and e-commerce platform. This is where all content is managed including cars, pages, articles, and product showcases.

## 🎯 Overview

This Sanity Studio instance provides content management for:
- **Car Listings**: Comprehensive car directory with specifications, photos, and contact details
- **Pages**: Landing pages, about pages, contact pages with flexible content blocks
- **Articles**: Blog-style content with rich text and embedded product showcases
- **Product Showcases**: Integration points for Shopify products within content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Access to the Sanity project (ID: `zkf9qp2j`)

### Installation & Development

```bash
# Install dependencies
npm install

# Start the Studio in development mode
npm run dev
```

Studio will be available at `http://localhost:3333`

### Production Build

```bash
# Build for production
npm run build

# Deploy to Sanity Cloud
npx sanity deploy
```

## 📋 Content Types

### 🚗 Cars
Complete car listings with:
- **Basic Info**: Year, Make, Model, Trim
- **Specifications**: Body style, transmission, fuel type, drivetrain, colors
- **Pricing**: Price, negotiable status, availability status
- **Media**: Multiple photos with main photo selection
- **Location**: City and state (US states dropdown)
- **Contact**: Owner details with preferred contact method
- **Meta**: SEO title override, slug, featured status

### 📄 Pages
Flexible page system supporting:
- **Page Types**: Landing, About, Contact, Article, General
- **Content Blocks**: Rich text with embedded images and product showcases
- **Landing Pages**: Special fields for hero sections, features, CTAs
- **Contact Pages**: Contact information fields (email, phone, address, hours)

### 🛍️ Product Showcases
Shopify product integration:
- **Product Selection**: Search and select products from your Shopify store
- **Display Styles**: Card, Banner, or Minimal presentation
- **Custom Notes**: Optional context or promotional text
- **Live Preview**: See how products will appear in content

## 🎨 Studio Features

### Custom Structure
- **Hierarchical Navigation**: Organized sidebar with Cars and Pages sections
- **Smart Grouping**: Cars by availability status, Pages by type
- **Visual Previews**: Rich previews with status indicators and pricing

### Content Organization
- **Cars Section**:
  - Available Cars
  - Sold Cars  
  - Pending Cars
  - All Cars
- **Pages Section**:
  - Landing Pages
  - About Pages
  - Contact Pages
  - Article Pages
  - General Pages

### Advanced Features
- **Auto-generated Titles**: Smart car titles from Year/Make/Model/Trim
- **Custom Product Selector**: Live search and preview of Shopify products
- **Conditional Fields**: Context-aware form fields
- **Rich Text Editor**: Full formatting with embedded content blocks

## ⚙️ Configuration

### Project Settings
- **Project ID**: `zkf9qp2j`
- **Dataset**: `production`
- **API Version**: `2023-05-03`

### Schema Structure
```
schemaTypes/
├── car.ts              # Car directory schema
├── page.ts             # Flexible page system
└── components/
    ├── productShowcase.ts    # Shopify product embeds
    └── ProductSelector.tsx   # Custom product picker
```

### Custom Components
- **ProductSelector**: Custom input for selecting Shopify products with live search
- **TitleInput**: Smart title generation for cars with override capability

## 🔗 Integration

### Next.js Frontend
Content is consumed by the Next.js frontend via:
- **GROQ Queries**: Optimized content fetching
- **Live Preview**: Real-time content updates during editing
- **Image Optimization**: Sanity CDN integration

### Shopify Connection
Product data is fetched from Shopify via:
- **Storefront API**: Product search and selection in Studio
- **Real-time Sync**: Product showcases stay current with inventory

## 🚀 Deployment

### Sanity Cloud
```bash
# Deploy Studio to Sanity Cloud
npx sanity deploy
```

Studio will be available at your custom Sanity URL.

### Local Development
For local development, the Studio runs on `http://localhost:3333` and connects to the production dataset.

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Custom Input Components](https://www.sanity.io/docs/custom-input-widgets)
