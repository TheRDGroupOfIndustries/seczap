import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeFAQsType = defineType({
  name: "faqs",
  title: "FAQs Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "FAQs Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
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
