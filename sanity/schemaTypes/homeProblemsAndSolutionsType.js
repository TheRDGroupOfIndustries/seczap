import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeProblemsAndSolutionsType = defineType({
  name: "problemsAndSolutions",
  title: "Problems & Solutions Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Problems & Solutions Heading",
      type: "string",
      initialValue: "Problems & Solutions",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "commonSecurityChallenges",
      title: "Common Security Challenges section",
      type: "object",
      fields: [
        {
          name: "problems",
          title: "Problems list",
          type: "array",
          initialValue: [
            {
              icon: "FaShieldHalved",
              label: "Data Breaches",
              description:
                "Unauthorized access and theft of sensitive information leading to financial losses and reputation damage.",
            },
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
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "ourSolutions",
      title: "Our Solutions section",
      type: "object",
      fields: [
        {
          name: "solutions",
          title: "Solutions list",
          type: "array",
          initialValue: [
            {
              icon: "FaShieldHalved",
              label: "Advanced Encryption",
              description:
                "Military-grade encryption protocols protecting sensitive data at rest and in transit.",
            },
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
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
