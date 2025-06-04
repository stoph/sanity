import {defineField, defineType} from 'sanity'

const US_STATES = [
  {title: 'Alabama', value: 'AL'},
  {title: 'Alaska', value: 'AK'},
  {title: 'Arizona', value: 'AZ'},
  {title: 'Arkansas', value: 'AR'},
  {title: 'California', value: 'CA'},
  {title: 'Colorado', value: 'CO'},
  {title: 'Connecticut', value: 'CT'},
  {title: 'Delaware', value: 'DE'},
  {title: 'Florida', value: 'FL'},
  {title: 'Georgia', value: 'GA'},
  {title: 'Hawaii', value: 'HI'},
  {title: 'Idaho', value: 'ID'},
  {title: 'Illinois', value: 'IL'},
  {title: 'Indiana', value: 'IN'},
  {title: 'Iowa', value: 'IA'},
  {title: 'Kansas', value: 'KS'},
  {title: 'Kentucky', value: 'KY'},
  {title: 'Louisiana', value: 'LA'},
  {title: 'Maine', value: 'ME'},
  {title: 'Maryland', value: 'MD'},
  {title: 'Massachusetts', value: 'MA'},
  {title: 'Michigan', value: 'MI'},
  {title: 'Minnesota', value: 'MN'},
  {title: 'Mississippi', value: 'MS'},
  {title: 'Missouri', value: 'MO'},
  {title: 'Montana', value: 'MT'},
  {title: 'Nebraska', value: 'NE'},
  {title: 'Nevada', value: 'NV'},
  {title: 'New Hampshire', value: 'NH'},
  {title: 'New Jersey', value: 'NJ'},
  {title: 'New Mexico', value: 'NM'},
  {title: 'New York', value: 'NY'},
  {title: 'North Carolina', value: 'NC'},
  {title: 'North Dakota', value: 'ND'},
  {title: 'Ohio', value: 'OH'},
  {title: 'Oklahoma', value: 'OK'},
  {title: 'Oregon', value: 'OR'},
  {title: 'Pennsylvania', value: 'PA'},
  {title: 'Rhode Island', value: 'RI'},
  {title: 'South Carolina', value: 'SC'},
  {title: 'South Dakota', value: 'SD'},
  {title: 'Tennessee', value: 'TN'},
  {title: 'Texas', value: 'TX'},
  {title: 'Utah', value: 'UT'},
  {title: 'Vermont', value: 'VT'},
  {title: 'Virginia', value: 'VA'},
  {title: 'Washington', value: 'WA'},
  {title: 'West Virginia', value: 'WV'},
  {title: 'Wisconsin', value: 'WI'},
  {title: 'Wyoming', value: 'WY'},
]

export const car = defineType({
  name: 'car',
  title: 'Car',
  type: 'document',
  icon: () => '🚗',
  groups: [
    {name: 'basic', title: 'Basic Information'},
    {name: 'details', title: 'Vehicle Details'},
    {name: 'location', title: 'Location'},
    {name: 'contact', title: 'Contact Information'},
    {name: 'sale', title: 'Sale Information'},
    {name: 'media', title: 'Photos & Media'},
    {name: 'meta', title: 'Meta Information'},
  ],
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(1900).max(new Date().getFullYear() + 1),
      group: 'basic',
    }),
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      validation: (rule) => rule.required().max(50),
      group: 'basic',
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (rule) => rule.required().max(100),
      group: 'basic',
    }),
    defineField({
      name: 'trim',
      title: 'Trim/Edition',
      type: 'string',
      description: 'e.g., LX, Sport, Limited, etc.',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'vin',
      title: 'VIN',
      type: 'string',
      description: 'Vehicle Identification Number',
      // validation: (rule) => rule.length(17),
      group: 'details',
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage',
      type: 'number',
      validation: (rule) => rule.min(0),
      group: 'details',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          {title: 'Excellent', value: 'excellent'},
          {title: 'Good', value: 'good'},
          {title: 'Fair', value: 'fair'},
          {title: 'Poor', value: 'poor'},
          {title: 'Project/Parts', value: 'project'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'bodyStyle',
      title: 'Body Style',
      type: 'string',
      options: {
        list: [
          {title: 'Sedan', value: 'sedan'},
          {title: 'Coupe', value: 'coupe'},
          {title: 'Hatchback', value: 'hatchback'},
          {title: 'SUV', value: 'suv'},
          {title: 'Truck', value: 'truck'},
          {title: 'Convertible', value: 'convertible'},
          {title: 'Wagon', value: 'wagon'},
          {title: 'Van', value: 'van'},
          {title: 'Other', value: 'other'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          {title: 'Manual', value: 'manual'},
          {title: 'Automatic', value: 'automatic'},
          {title: 'CVT', value: 'cvt'},
          {title: 'Semi-Automatic', value: 'semi-automatic'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          {title: 'Gasoline', value: 'gasoline'},
          {title: 'Diesel', value: 'diesel'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Electric', value: 'electric'},
          {title: 'Plug-in Hybrid', value: 'plugin-hybrid'},
          {title: 'Other', value: 'other'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'drivetrain',
      title: 'Drivetrain',
      type: 'string',
      options: {
        list: [
          {title: 'Front-Wheel Drive (FWD)', value: 'fwd'},
          {title: 'Rear-Wheel Drive (RWD)', value: 'rwd'},
          {title: 'All-Wheel Drive (AWD)', value: 'awd'},
          {title: '4-Wheel Drive (4WD)', value: '4wd'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'exteriorColor',
      title: 'Exterior Color',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'interiorColor',
      title: 'Interior Color',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'location',
      options: {
        columns: 2,
      },
      fields: [
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: US_STATES,
          },
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
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
              description: 'Alternative text for accessibility',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'isMainPhoto',
              title: 'Main Photo',
              type: 'boolean',
              description: 'Use as the primary photo for this car',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1).max(20),
      group: 'media',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email',
          validation: (rule) => rule.required(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'preferredContact',
          title: 'Preferred Contact Method',
          type: 'string',
          options: {
            list: [
              {title: 'Email', value: 'email'},
              {title: 'Phone', value: 'phone'},
              {title: 'Text', value: 'text'},
            ],
          },
          initialValue: 'email',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available for Sale', value: 'available'},
          {title: 'Sold', value: 'sold'},
          {title: 'Not for Sale', value: 'not-for-sale'},
          {title: 'Under Contract', value: 'under-contract'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
      group: 'sale',
    }),
    defineField({
      name: 'price',
      title: 'Asking Price',
      type: 'number',
      hidden: ({document}) => document?.availabilityStatus !== 'available' && document?.availabilityStatus !== 'under-contract',
      group: 'sale',
    }),
    defineField({
      name: 'negotiable',
      title: 'Price Negotiable',
      type: 'boolean',
      hidden: ({document}) => document?.availabilityStatus !== 'available' && document?.availabilityStatus !== 'under-contract',
      initialValue: true,
      group: 'sale',
    }),
    defineField({
      name: 'saleLocation',
      title: 'Where Available for Sale',
      type: 'string',
      description: 'Dealership, private sale location, or other details',
      hidden: ({document}) => document?.availabilityStatus !== 'available',
      group: 'sale',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.year} ${doc.make} ${doc.model} ${doc.trim || ''}`.trim(),
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Car',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'meta',
    }),
    defineField({
      name: 'titleOverride',
      title: 'Title Override',
      type: 'string',
      description: 'Optional custom title. Leave blank to auto-generate from Year, Make, Model.',
      group: 'meta',
    }),
  ],
  preview: {
    select: {
      titleOverride: 'titleOverride',
      make: 'make',
      model: 'model',
      year: 'year',
      trim: 'trim',
      media: 'photos.0',
      status: 'availabilityStatus',
      price: 'price',
    },
    prepare(selection) {
      const {titleOverride, make, model, year, trim, media, status, price} = selection
      const statusEmoji: Record<string, string> = {
        available: '🟢',
        sold: '🔴',
        'not-for-sale': '⚪',
        'under-contract': '🟡',
      }
      
      // Use title override if provided, otherwise generate from year/make/model
      const displayTitle = titleOverride || (year && make && model 
        ? `${year} ${make} ${model}${trim ? ` ${trim}` : ''}`
        : 'Untitled Car')
      
      const priceText = price ? ` - $${price.toLocaleString()}` : ''
      
      return {
        title: displayTitle,
        subtitle: `${statusEmoji[status as string] || ''} ${status?.replace('-', ' ').toUpperCase()}${priceText}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
    {
      title: 'Year (oldest first)',
      name: 'yearAsc',
      by: [{field: 'year', direction: 'asc'}],
    },
    {
      title: 'Make A-Z',
      name: 'makeAsc',
      by: [{field: 'make', direction: 'asc'}],
    },
    {
      title: 'Price (low to high)',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Price (high to low)',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}],
    },
    {
      title: 'Recently Added',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
}) 