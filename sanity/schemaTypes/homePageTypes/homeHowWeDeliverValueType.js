import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeHowWeDeliverValueType = defineType({
  name: "howWeDeliverValue",
  title: "How We Deliver Value Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "How We Deliver Value Heading",
      type: "string",
      initialValue: "How We Deliver Value",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      initialValue: [
        {
          icon: "GiCycle",
          head: "Subscription Services",
          description: "",
        },
        {
          icon: "PiShareNetworkFill",
          head: "Project-Based Fees",
          description: "",
        },
        {
          icon: "PiChatsCircleFill",
          head: "Consulting Services",
          description: "",
        },
        { icon: "FaGraduationCap", head: "Training Programs", description: "" },
      ],
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "head",
              title: "Service Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Service Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
