import React from "react"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { BlogPageCard } from "@/components/blog-page-card"
import { GoBack } from "@/components/go-back"

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

  if (posts.length === 0) {
    return null
  }

  return posts
}

export async function generateStaticParams(): Promise<
  TagPageProps["params"][]
> {
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
      <GoBack />
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
