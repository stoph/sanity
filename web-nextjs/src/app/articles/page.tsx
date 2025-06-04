import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/live'
import { pagesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { PagesQueryResult } from '@/sanity/types'

export default async function ArticlesPage() {
  const { data: allPages } = await sanityFetch({ query: pagesQuery })
  
  // Filter for articles only
  const articles = allPages?.filter(page => page.pageType === 'article') || []

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
            <span className="text-gray-900 font-medium">Articles</span>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📝 Articles</h1>
              <p className="text-gray-600 mt-2">Latest automotive insights and news</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
            <p className="text-gray-600">
              Check back soon for the latest automotive insights and news.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                All Articles ({articles.length})
              </h2>
              <p className="text-gray-600">
                Browse our complete collection of automotive articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: PagesQueryResult[0]) => {
                if (!article.slug?.current) return null;
                
                return (
                  <Link
                    key={article._id}
                    href={`/${article.slug.current}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-video relative">
                      {article.featuredImage?.asset ? (
                        <Image
                          src={urlFor(article.featuredImage.asset)?.width(400).height(225).url() || ''}
                          alt={article.featuredImage.alt || article.title || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-4xl">📝</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                        Article
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {article.description}
                        </p>
                      )}
                      {article.publishedAt && (
                        <p className="text-gray-500 text-xs">
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
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