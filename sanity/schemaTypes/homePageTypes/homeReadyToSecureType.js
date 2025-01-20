import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeReadyToSecureType = defineType({
  name: "readyToSecure",
  title: "Ready to Secure Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Ready to Secure Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Ready to Secure Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonOne",
      title: "Primary Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "link",
          title: "Button Link",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "buttonTwo",
      title: "Secondary Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
        },
        {
          name: "link",
          title: "Button Link",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Ready to Secure footer text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
