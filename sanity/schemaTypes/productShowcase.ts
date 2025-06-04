import { defineType, defineField } from 'sanity'
import { ProductSelector } from './components/ProductSelector'

export const productShowcase = defineType({
  name: 'productShowcase',
  title: 'Product Showcase',
  type: 'object',
  fields: [
    defineField({
      name: 'productHandle',
      title: 'Product',
      type: 'string',
      description: 'Select a product from your Shopify store',
      validation: (Rule) => Rule.required(),
      components: {
        input: ProductSelector,
      },
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Card (Default)', value: 'card' },
          { title: 'Banner', value: 'banner' },
          { title: 'Minimal', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customNote',
      title: 'Custom Note',
      type: 'text',
      rows: 2,
      description: 'Optional custom description or context for this product',
    }),
  ],
  preview: {
    select: {
      productHandle: 'productHandle',
      displayStyle: 'displayStyle',
      customNote: 'customNote',
    },
    prepare({ productHandle, displayStyle, customNote }) {
      const title = productHandle ? `Product: ${productHandle}` : 'Product Showcase'
      const subtitle = [displayStyle, customNote].filter(Boolean).join(' • ')
      
      return {
        title,
        subtitle: subtitle || 'No product selected',
        media: () => '🛍️',
      }
    },
  },
}) 