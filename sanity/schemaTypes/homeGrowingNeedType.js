import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeGrowingNeedType = defineType({
  name: "growingNeed",
  title: "Growing Need Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Growing Needs Heading",
      type: "string",
      initialValue: "The Growing Need for Cybersecurity",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "firstSection",
      title: "First Section",
      type: "object",
      fields: [
        {
          name: "subHeading",
          title: "Sub Heading",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Description",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "needs",
          title: "Needs",
          type: "object",
          fields: [
            {
              name: "needOne",
              title: "Need One",
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  initialValue: "GoGraph",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  initialValue: "300%",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "shortDescription",
                  title: "Short Description",
                  type: "string",
                  initialValue: "Increase in cybercrime since 2020",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: "needTwo",
              title: "Need Two",
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  initialValue: "FaShieldVirus",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  initialValue: "60%",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "shortDescription",
                  title: "Short Description",
                  type: "string",
                  initialValue: "SMEs targeted by cyber attacks",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: "needThree",
              title: "Need Three",
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  initialValue: "FaDatabase",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  initialValue: "$4.35M",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "shortDescription",
                  title: "Short Description",
                  type: "string",
                  initialValue: "Average cost of a data breach",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: "needFour",
              title: "Need Four",
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  initialValue: "GoClockFill",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  initialValue: "24/7",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "shortDescription",
                  title: "Short Description",
                  type: "string",
                  initialValue: "Continous threat monitoring",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: "growingNeedBannerImage",
      title: "Growing Need Banner Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          initialValue: "growing-need-banner",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "growingNeedBannerImage",
    },
  },
});
