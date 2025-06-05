import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Articles
      S.listItem()
        .title('Articles')
        .schemaType('article')
        .icon(() => '📝')
        .child(
          S.documentList()
            .title('Articles')
            .filter('_type == "article"')
            .apiVersion('2025-06-01')
        ),
      
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
                  S.documentList()
                    .title('Available Cars')
                    .filter('_type == "car" && availabilityStatus == "available"')
                    .apiVersion('2025-06-01')
                ),
              S.listItem()
                .title('Sold Cars')
                .schemaType('car')
                .icon(() => '🚗')
                .child(
                  S.documentList()
                    .title('Sold Cars')
                    .filter('_type == "car" && availabilityStatus == "sold"')
                    .apiVersion('2025-06-01')
                ),
              S.listItem()
                .title('Pending Cars')
                .schemaType('car')
                .icon(() => '⏳')
                .child(
                  S.documentList()
                    .title('Pending Cars')
                    .filter('_type == "car" && availabilityStatus == "pending"')
                    .apiVersion('2025-06-01')
                ),
              S.listItem()
                .title('All Cars')
                .schemaType('car')
                .icon(() => '🚗')
                .child(
                  S.documentList()
                    .title('All Cars')
                    .filter('_type == "car"')
                    .apiVersion('2025-06-01')
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
                  S.documentList()
                    .title('Landing Page')
                    .filter('_type == "page" && pageType == "landing"')
                    .apiVersion('2025-06-01')
                ),
              S.listItem()
                .title('Article Pages')
                .schemaType('page')
                .icon(() => '📝')
                .child(
                  S.documentList()
                    .title('Article Pages')
                    .filter('_type == "page" && pageType == "article"')
                    .apiVersion('2025-06-01')
                ),
              S.listItem()
                .title('General Pages')
                .schemaType('page')
                .icon(() => '📄')
                .child(
                  S.documentList()
                    .title('General Pages')
                    .filter('_type == "page" && pageType == "general"')
                    .apiVersion('2025-06-01')
                ),
                S.listItem()
                .title('Other Pages')
                .schemaType('page')
                .icon(() => '📄')
                .child(
                  S.documentList()
                    .title('General Pages')
                    .filter('_type == "page"')
                    .apiVersion('2025-06-01')
                ),
            ])
        ),
    ]) 