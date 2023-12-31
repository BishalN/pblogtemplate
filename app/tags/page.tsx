import React from "react"
import NextLink from "next/link"
import { allPosts } from "contentlayer/generated"

import { GoBack } from "@/components/go-back"

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
      <GoBack />
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
