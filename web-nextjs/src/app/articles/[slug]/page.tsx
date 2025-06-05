import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/live'
import { articleQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import ProductShowcase from '@/components/ProductShowcase'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const { data: article } = await sanityFetch({ 
    query: articleQuery, 
    params: { slug } 
  })

  if (!article) {
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
            <Link href="/articles" className="hover:text-blue-600">
              Articles
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{article.title}</span>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
              {article.excerpt && (
                <p className="text-gray-600 mt-2">{article.excerpt}</p>
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
        {/* Article Meta */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            {article.author && (
              <span>By {article.author}</span>
            )}
            {article.publishedAt && (
              <span>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Featured Image */}
        {article.featuredImage?.asset && (
          <div className="mb-8">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={urlFor(article.featuredImage.asset)?.width(800).height(450).url() || ''}
                alt={article.featuredImage.alt || article.title || ''}
                fill
                className="object-cover"
              />
            </div>
            {article.featuredImage.caption && (
              <p className="text-sm text-gray-600 text-center mt-2">
                {article.featuredImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <PortableText 
            value={article.content || []}
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

        {/* Back to Articles */}
        <div className="mt-12 pt-8 border-t">
          <Link
            href="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Articles
          </Link>
        </div>
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