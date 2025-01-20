import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeWhyChooesUsType = defineType({
  name: "whyChooesUs",
  title: "Why Chooes Us Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Why Chooes Us Heading",
      type: "string",
      initialValue: "Why Choose Seczap",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fetaures",
      title: "Features",
      type: "array",
      initialValue: [
        {
          icon: "FaUsers",
          head: "Client-Centric Approach",
          description: "",
        },
        { icon: "IoSearch", head: "Expertise in OSINT", description: "" },
        { icon: "FaRobot", head: "AI-Powered Security", description: "" },
        { icon: "FaCoins", head: "Affordable Solutions", description: "" },
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
