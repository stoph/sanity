# @stoph

> **🚨 Learning Project:** This is a test repository for learning Sanity CMS, Next.js, and Shopify integration. Not intended for production use!

A modern car directory and e-commerce platform built with Next.js, Sanity CMS, and Shopify integration.

## 🚗 Overview

This monorepo contains a complete car directory solution with integrated e-commerce functionality, content management, and product showcasing capabilities.

**Purpose:** Exploring and learning modern web development patterns with:
- Sanity CMS for content management
- Next.js App Router for frontend development  
- Shopify Storefront API for e-commerce integration
- TypeScript for type safety
- Tailwind CSS for styling

## 📁 Project Structure

```
@stoph/
├── sanity/                  # Sanity Studio (CMS Backend)
│   ├── schemaTypes/          # Content schemas (cars, pages, products)
│   ├── structure/            # Custom studio organization
│   └── sanity.config.ts      # Studio configuration
├── web-nextjs/              # Next.js Frontend
│   ├── src/app/             # App Router pages and API routes
│   ├── src/components/      # React components
│   ├── src/sanity/         # Sanity client and queries
│   └── src/types/          # TypeScript definitions
└── README.md               # This file
```

## ✨ Features

- **🚗 Car Directory**: Browse and manage car listings with detailed specifications
- **🛍️ E-commerce Shop**: Shopify-powered product catalog with pagination
- **📝 Content Management**: Flexible page and article system via Sanity CMS
- **🎯 Product Showcases**: Embed Shopify products within Sanity content blocks
- **📱 Responsive Design**: Modern, mobile-first UI built with Tailwind CSS
- **🔍 SEO Optimized**: Server-side rendering with proper meta tags

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Shopify store with Storefront API access
- A Sanity project

### 1. Start Sanity Studio (Content Management)

```bash
cd sanity
npm install
npm run dev
```

Studio available at: `http://localhost:3333`

### 2. Start Next.js Frontend

```bash
cd web-nextjs
npm install
cp .env.example .env.local
# Add your Shopify credentials to .env.local
npm run dev
```

Frontend available at: `http://localhost:3000`

## 🏗️ Architecture

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **CMS**: Sanity Studio for content management
- **E-commerce**: Shopify Storefront API integration
- **Database**: Sanity's hosted backend
- **Deployment**: Vercel (Next.js) + Sanity Cloud (Studio)

## 📚 Documentation

- [**Sanity Studio Setup**](./sanity/README.md) - Content management system configuration
- [**Next.js Frontend Setup**](./web-nextjs/README.md) - Frontend application setup and deployment

## 🛠️ Development Workflow

1. **Content Creation**: Use Sanity Studio to manage cars, pages, and articles
2. **Frontend Development**: Next.js app consumes Sanity content via GROQ queries
3. **E-commerce Integration**: Shopify products are fetched via GraphQL API
4. **Deployment**: Deploy frontend to Vercel, Studio to Sanity Cloud

## 🌟 Key Integrations

- **Sanity ↔ Next.js**: Real-time content updates with live preview
- **Shopify ↔ Next.js**: Product catalog with client-side pagination
- **Sanity ↔ Shopify**: Product showcases embedded in rich content

## 📄 License

Private project for @stoph 