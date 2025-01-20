import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeContactUsType = defineType({
  name: "contactUsInfo",
  title: "Contact Us Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "contactUsInfo",
      title: "Contact Us Information",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Contact Us Information Heading",
          type: "string",
          initialValue: "Contact Information",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "links",
          title: "Contact Us Information Links",
          type: "object",
          fields: [
            {
              name: "address",
              title: "Address text & link",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "link",
                  title: "Link",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: "phone",
              title: "Phone Number & link",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "link",
                  title: "Link",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: "email",
              title: "Email text & link",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "link",
                  title: "Link",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Social links Heading",
          type: "string",
          initialValue: "Follow Us",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "links",
          title: "Social links list",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "link",
                  title: "link",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "contactUsInfo.heading",
    },
    prepare({ title }) {
      return {
        title: title || "Contact Us Section",
      };
    },
  },
});
