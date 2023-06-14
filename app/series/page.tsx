import React from "react"
import NextLink from "next/link"
import { allSeries } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Series",
}

export default async function BlogPage() {
  const posts = allSeries.sort((a, b) => {
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

interface SeriesPageProps {
  title: string
  date: string
  description: string
  tags?: string[]
  slug: string
  isCompleted?: boolean
}

const SeriesPageCard: React.FC<SeriesPageProps> = ({
  date,
  description,
  title,
  tags,
  slug,
  isCompleted = false,
}) => {
  return (
    <div className="my-5 cursor-pointer space-y-2 rounded-md border p-4 shadow-md">
      <NextLink href={`/series/${slug}`} className="cursor-pointer text-lg ">
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
        <p>
          {isCompleted ? (
            <span className="rounded-lg border bg-gray-600  p-1 text-muted-foreground">
              Complete
            </span>
          ) : (
            <span className="rounded-lg border bg-gray-600  p-1 text-muted-foreground">
              Not complete
            </span>
          )}
        </p>
      </div>
      <p className="max-w-3xl text-gray-400">{description}</p>
    </div>
  )
}
