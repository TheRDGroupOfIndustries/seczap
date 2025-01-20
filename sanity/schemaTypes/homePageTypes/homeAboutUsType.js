import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeAboutType = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "About Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "About Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutBannerImage",
      title: "About Banner Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          initialValue: "about-us-banner",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features List",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "aboutBannerImage",
    },
  },
});
