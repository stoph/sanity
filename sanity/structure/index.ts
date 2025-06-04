import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Cars with sub-categories
      S.listItem()
        .title('Cars')
        .icon(() => '🚗')
        .child(
          S.list()
            .title('Cars')
            .items([
              S.listItem()
                .title('Available Cars')
                .schemaType('car')
                .icon(() => '🚙')
                .child(
                  S.documentList().title('Available Cars').filter('_type == "car" && availabilityStatus == "available"')
                ),
              S.listItem()
                .title('Sold Cars')
                .schemaType('car')
                .icon(() => '🚗')
                .child(
                  S.documentList().title('Sold Cars').filter('_type == "car" && availabilityStatus == "sold"')
                ),
              S.listItem()
                .title('Pending Cars')
                .schemaType('car')
                .icon(() => '⏳')
                .child(
                  S.documentList().title('Pending Cars').filter('_type == "car" && availabilityStatus == "pending"')
                ),
              S.listItem()
                .title('All Cars')
                .schemaType('car')
                .icon(() => '🚗')
                .child(
                  S.documentList().title('All Cars').filter('_type == "car"')
                ),
            ])
        ),
      
      // Pages with sub-categories
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Landing Page')
                .schemaType('page')
                .icon(() => '🏠')
                .child(
                  S.documentList().title('Landing Page').filter('_type == "page" && pageType == "landing"')
                ),
              S.listItem()
                .title('About Pages')
                .schemaType('page')
                .icon(() => '👥')
                .child(
                  S.documentList().title('About Pages').filter('_type == "page" && pageType == "about"')
                ),
              S.listItem()
                .title('Contact Pages')
                .schemaType('page')
                .icon(() => '📞')
                .child(
                  S.documentList().title('Contact Pages').filter('_type == "page" && pageType == "contact"')
                ),
              S.listItem()
                .title('Article Pages')
                .schemaType('page')
                .icon(() => '📝')
                .child(
                  S.documentList().title('Article Pages').filter('_type == "page" && pageType == "article"')
                ),
              S.listItem()
                .title('General Pages')
                .schemaType('page')
                .icon(() => '📄')
                .child(
                  S.documentList().title('General Pages').filter('_type == "page" && pageType == "general"')
                ),
            ])
        ),
    ]) 