import React from "react"
import NextLink from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <main className="my-10">
      <NextLink
        href="/"
        className="underline decoration-slate-500 underline-offset-4"
      >
        &larr; Back
      </NextLink>
      <h1 className="mt-4 text-xl font-bold"> Blogs</h1>
      <div className="space-y-5">
        {posts.map((post) => {
          return (
            <BlogPageCard
              key={post.slug}
              date={post.date}
              description={post.description}
              title={post.title}
              tags={post?.tags}
              slug={post.slugAsParams}
            />
          )
        })}
      </div>
    </main>
  )
}

interface BlogPageCardProps {
  title: string
  date: string
  description: string
  tags?: string[]
  slug: string
}

const BlogPageCard: React.FC<BlogPageCardProps> = ({
  date,
  description,
  title,
  tags,
  slug,
}) => {
  return (
    <div className="my-5 space-y-2">
      <NextLink
        href={`/blogs/${slug}`}
        className="cursor-pointer text-lg underline decoration-slate-500 underline-offset-4"
      >
        {title}
      </NextLink>
      <div className="flex space-x-3 text-muted-foreground">
        <p className="">{formatDate(date)}</p>
        {tags?.map((tag) => {
          return (
            <NextLink
              href={`/tags/${tag}`}
              key={tag}
              className=" cursor-pointer"
            >
              #{tag}
            </NextLink>
          )
        })}
      </div>
      <p className="max-w-3xl text-gray-400">{description}</p>
    </div>
  )
}
