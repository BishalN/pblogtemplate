import React from "react"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { BlogPageCard } from "@/components/blog-page-card"
import { GoBack } from "@/components/go-back"

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
      <GoBack />
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
