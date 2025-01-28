import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { singleDynamicPageQuery } from "@/sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const page = await sanityFetch({
    query: singleDynamicPageQuery,
    params: { slug },
  });

  return {
    title: `SECZAP | ${page?.title || "Page Not Found"}`,
    description: page?.excerpt || "",
  };
}

const components = {
  types: {
    image: ({ value }) => (
      <figure className="relative w-full h-96 my-8">
        <Image
          src={value.url}
          alt={value.metadata?.alt || "Page image"}
          fill
          className="object-cover rounded-lg"
          placeholder="blur"
          blurDataURL={value.metadata?.lqip || value.url}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {value.metadata?.caption && (
          <figcaption className="text-sm text-gray-600 mt-2 text-center">
            {value.metadata.caption}
          </figcaption>
        )}
      </figure>
    ),
    link: ({ value }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:underline"
        rel="noopener noreferrer"
      >
        {value.text}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
    ),
  },
};

export default async function DynamicPage({ params }) {
  const { slug } = params;

  const page = await sanityFetch({
    query: singleDynamicPageQuery,
    params: { slug },
  });

  if (!page) notFound();

  return (
    <div className="min-h-screen">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-5xl font-bold mb-8">{page.title}</h1>
        {page.excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {page.excerpt}
          </p>
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={page.body} components={components} />
        </div>
      </article>
    </div>
  );
}
