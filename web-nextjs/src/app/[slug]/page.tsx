import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/live'
import { pageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import ProductShowcase from '@/components/ProductShowcase'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PageRoute({ params }: Props) {
  const { slug } = await params
  const { data: page } = await sanityFetch({ 
    query: pageQuery, 
    params: { slug } 
  })

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">
              🚗 Finding Cars
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{page.title}</span>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
              {page.description && (
                <p className="text-gray-600 mt-2">{page.description}</p>
              )}
            </div>
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <Link
                href="/cars"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🚗</span>
                <span>Cars</span>
              </Link>
              <Link
                href="/shop"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>🛍️</span>
                <span>Shop</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Image */}
        {page.featuredImage?.asset && (
          <div className="mb-8">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={urlFor(page.featuredImage.asset)?.width(800).height(450).url() || ''}
                alt={page.featuredImage.alt || page.title || ''}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <PortableText 
            value={page.content || []}
            components={{
              types: {
                image: ({ value }) => (
                  <div className="my-8">
                    <div className="relative rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(value.asset)?.width(800).url() || ''}
                        alt={value.alt || ''}
                        width={800}
                        height={450}
                        className="object-cover"
                      />
                    </div>
                    {value.caption && (
                      <p className="text-sm text-gray-600 text-center mt-2">
                        {value.caption}
                      </p>
                    )}
                  </div>
                ),
                productShowcase: ({ value }) => (
                  <ProductShowcase
                    productHandle={value.productHandle}
                    displayStyle={value.displayStyle || 'card'}
                    customNote={value.customNote}
                  />
                ),
              },
              marks: {
                link: ({ children, value }) => (
                  <a
                    href={value.href}
                    target={value.blank ? '_blank' : undefined}
                    rel={value.blank ? 'noopener noreferrer' : undefined}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </article>

        {/* Meta Information */}
        {page.publishedAt && (
          <div className="mt-12 pt-8 border-t text-sm text-gray-600">
            <p>
              Published on {new Date(page.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 Finding Cars. Built with Next.js and Sanity.
          </p>
        </div>
      </footer>
    </div>
  )
} 