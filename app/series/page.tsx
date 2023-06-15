import React from "react"
import { allSeries } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { GoBack } from "@/components/go-back"
import { SeriesPageCard } from "@/components/series-page-card"

export const metadata = {
  title: "Series",
}

export default async function BlogPage() {
  const posts = allSeries.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <main className="my-10">
      <GoBack />
      <h1 className="mt-4 text-xl font-bold">Series</h1>
      <p className="max-w-2xl">
        Series are long-form content. They usually start with a premise:
        let&apos;s make X! Or, let&apos;s understand Y! And from there, things
        balloon out of control.
      </p>
      <div className="space-y-5">
        {posts.map((post) => {
          return (
            <SeriesPageCard
              key={post.slug}
              date={post.date}
              description={post.description}
              title={post.title}
              slug={post.slugAsParams}
              tags={post?.tags}
              isCompleted={post.isCompleted}
            />
          )
        })}
      </div>
    </main>
  )
}
