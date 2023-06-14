import React from "react"
import NextLink from "next/link"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"

interface TagPageProps {
  params: {
    slug: string[]
  }
}

export const metadata = {
  title: "Tags",
}

async function getPostsFromTagParams(params: TagPageProps["params"]) {
  const slug = params?.slug?.join("/")

  const posts = allPosts.filter((post) => {
    return (post.tags as string[]).includes(slug)
  })

  if (!posts) {
    return null
  }

  return posts
}

export async function generateStaticParams(): Promise<
  TagPageProps["params"][]
> {
  // TODO: include the series tags as well
  return allPosts
    .filter((post) => post.published)
    .flatMap((post) => post.tags)
    .filter((tag, index, tags) => tags.indexOf(tag) === index)
    .map((tag) => {
      return {
        slug: [tag],
      }
    }) as TagPageProps["params"][]
}

export default async function BlogPage({ params }: TagPageProps) {
  const posts = await getPostsFromTagParams(params)

  if (!posts) {
    return notFound()
  }

  return (
    <main className="my-10">
      <NextLink
        href="/"
        className="underline decoration-slate-500 underline-offset-4"
      >
        &larr; Back
      </NextLink>
      <h1 className="my-10 text-xl font-bold"> All about {params.slug}</h1>
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
