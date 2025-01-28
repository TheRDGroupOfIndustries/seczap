import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const navbarLinksType = defineType({
  name: "navbarLinks",
  title: "Navbar Links",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Navbar Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "SECZAP",
    }),
    defineField({
      name: "links",
      title: "Link List",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          title: "Add Link",
          fields: [
            {
              name: "text",
              title: "Link Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              title: "Link URL",
              type: "string",
              validation: (Rule) => Rule.required(),
              initialValue: "/",
            },
            {
              name: "slug",
              title: "Link Slug",
              type: "slug",
              options: { source: "links.text" },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
