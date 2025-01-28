// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("SECZAP CMS")
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
              S.documentTypeListItem("ourServices").title(
                "Our Services Section"
              ),
              S.documentTypeListItem("whyChooesUs").title(
                "Why Chooes Us Section"
              ),
              S.documentTypeListItem("problemsAndSolutions").title(
                "Problems & Solutions"
              ),
              // S.documentTypeListItem("howWeDeliverValue").title(
              //   "How We Deliver Value"
              // ),
              S.documentTypeListItem("growingNeed").title("Growing Need"),
              S.documentTypeListItem("readyToSecure").title(
                "Ready to Secure Section"
              ),
              S.documentTypeListItem("faqs").title("FAQs Section"),
              S.documentTypeListItem("contactUsInfo").title(
                "Contact Us Info Section"
              ),
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
            "ourServices",
            "whyChooesUs",
            "problemsAndSolutions",
            // "howWeDeliverValue",
            "growingNeed",
            "readyToSecure",
            "faqs",
            "contactUsInfo",

            "author",
            "post",
            "category",
          ].includes(item.getId())
      ),
    ]);
