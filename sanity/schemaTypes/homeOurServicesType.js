import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeOurServicesType = defineType({
  name: "ourServices",
  title: "Our Services Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Our Services Heading",
      type: "string",
      initialValue: "Our Services",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      initialValue: [
        {
          icon: "FaShieldHalved",
          head: "Vulnerability Testing",
          description: "",
        },
        { icon: "IoSearch", head: "OSINT Investigations", description: "" },
        { icon: "FaMicroscope", head: "Cyber Forensics", description: "" },
        { icon: "FaUserSecret", head: "Dark Web Monitoring", description: "" },
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
