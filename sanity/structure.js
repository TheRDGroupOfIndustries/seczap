// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Seczap CMS")
    .items([
      // Homepage Items
      S.listItem()
        .title("Homepage Content")
        .child(
          S.list()
            .title("Homepage Content")
            .items([
              S.documentTypeListItem("hero").title("Hero Section"),
              S.documentTypeListItem("about").title("About Section"),
              S.documentTypeListItem("readyToSecure").title(
                "Ready to Secure Section"
              ),
              S.documentTypeListItem("faqs").title("FAQs Section"),
            ])
        ),

      // Blog Items
      S.listItem()
        .title("Blog Content")
        .child(
          S.list()
            .title("Blog Content")
            .items([
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("post").title("Blog Posts"),
              S.documentTypeListItem("category").title("Categories"),
            ])
        ),

      S.divider(),

      // Other document types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "hero",
            "about",
            "readyToSecure",
            "faqs",
            "author",
            "post",
            "category",
          ].includes(item.getId())
      ),
    ]);
