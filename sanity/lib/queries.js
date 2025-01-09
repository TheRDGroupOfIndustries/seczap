import { groq } from "next-sanity";

// get all posts
export const postsQuery = groq`*[_type == "post"] {
  _createdAt,
  title,
  slug,
  mainImage,
  "imageURL": mainImage.asset->url,
  "authorName": author->name,
  "authorSlug": author->slug
}`;

// author->name == $author &&
export const singlePostQuery = groq`*[_type == "post" &&  slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  body,
  "authorName": author->name,
  "authorBio": author->bio,
  "authorImage": author->image.asset->url,
  "categoryName": category->title,
  "categorySlug": category->slug.current,
  publishedAt,
  "slug": slug.current,
  "imageURL": mainImage.asset->url,
}`;

// get all what-we-do
export const whatWeDoQuery = groq`*[_type == "what-we-do"] {
  _createdAt,
  title,
  slug,
  mainImage,
  "imageURL": mainImage.asset->url,
  "authorName": author->name,
  "authorSlug": author->slug,
  body,
}`;

// author->name == $author &&
export const singlewhatWeDoQuery = groq`*[_type == "what-we-do" &&  slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  body,
  "authorName": author->name,
  "authorBio": author->bio,
  "authorImage": author->image.asset->url,
  "categoryName": category->title,
  "categorySlug": category->slug.current,
  publishedAt,
  "slug": slug.current,
  "imageURL": mainImage.asset->url,
}`;

export const categoriesQuery = groq`*[_type == "category"] {
  _id,
  title,
  "slug": slug.current
}`;

export const heroQuery = groq`*[_type == "hero"][0] {
  heading,
  description,
  buttonOne {
    text,
    link
  },
  buttonTwo {
    text,
    link
  },
  heroBannerImage {
    "imageURL": asset->url,
    alt
  }
}`;

export const aboutUsQuery = groq`*[_type == "about"][0] {
  heading,
  description,
  aboutBannerImage {
    "imageURL": asset->url,
    alt
  },
  features
}`;

export const readyToSecureQuery = groq`*[_type == "readyToSecure"][0] {
  heading,
  description,
  buttonOne {
    text,
    link
  },
  buttonTwo {
    text,
    link
  },
  footer
}`;

export const faqsQuery = groq`*[_type == "faqs"][0] {
  heading,
  faqs[] {
    question,
    answer
  }
}`;
