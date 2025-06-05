import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Landing Page', value: 'landing' },
          { title: 'Article Page', value: 'article' },
          { title: 'General Page', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'A brief description for SEO purposes',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    }),
    // Hero Section (for landing pages)
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading for hero section (landing pages)',
      hidden: ({ document }) => document?.pageType !== 'landing',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle text for hero section',
      hidden: ({ document }) => document?.pageType !== 'landing',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      hidden: ({ document }) => document?.pageType !== 'landing',
    }),
    defineField({
      name: 'heroButtons',
      title: 'Hero Call-to-Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Internal path (e.g., /cars) or external URL',
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ],
              },
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.pageType !== 'landing',
    }),
    // Features Section (for landing pages)
    defineField({
      name: 'features',
      title: 'Features Section',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Feature',
          fields: [
            {
              name: 'icon',
              title: 'Icon (Emoji)',
              type: 'string',
              description: 'Single emoji character',
            },
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.pageType !== 'landing',
    }),
    // Contact Information (for contact pages)
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'text',
        },
      ],
      hidden: ({ document }) => document?.pageType !== 'contact',
    }),
    // Main Content
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
        {
          type: 'productShowcase',
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, pageType } = selection
      return {
        title,
        subtitle: pageType ? `${pageType} page` : 'Page',
        media: selection.media,
      }
    },
  },
}) 