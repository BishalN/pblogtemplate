import React from "react"
import NextLink from "next/link"
import { allPosts } from "contentlayer/generated"

export const metadata = {
  title: "Tags",
}

export default async function BlogPage() {
  const tags = allPosts
    .filter((post) => post.published)
    .flatMap((post) => post.tags)
    .filter((tag, index, tags) => tags.indexOf(tag) === index)

  return (
    <main className="my-10">
      <NextLink
        href="/"
        className="underline decoration-slate-500 underline-offset-4"
      >
        &larr; Back
      </NextLink>
      <h1 className="my-10 text-xl font-bold">All Tags</h1>
      <div className="space-x-5">
        {tags.map((tag) => {
          return (
            <NextLink href={`/tags/${tag}`} key={tag}>
              #{tag}
            </NextLink>
          )
        })}
      </div>
    </main>
  )
}
