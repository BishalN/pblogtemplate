import React from "react"
import NextLink from "next/link"
import { notFound } from "next/navigation"
import { Post, Series, allPosts, allSeries } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"

interface SeriesPageProps {
  params: {
    slug: string[]
  }
}

export const metadata = {
  title: "Series",
}

async function getSeriesFromParams(params: SeriesPageProps["params"]) {
  const slug = params?.slug?.join("/")

  const series = allSeries.find((series) => series.slugAsParams === slug)

  if (!series) {
    null
  }

  return series
}

async function getPostsFromSeries(series: Series) {
  // Go through the series posts array and find the post with the matching slug
  const posts = (series.posts as string[]).map((postSlug) => {
    return allPosts.find((post) => post.slugAsParams === postSlug)
  })
  return posts
}

export async function generateStaticParams(): Promise<
  SeriesPageProps["params"][]
> {
  return allSeries.map((series) => ({
    slug: series.slugAsParams.split("/"),
  }))
}

export default async function BlogPage({ params }: SeriesPageProps) {
  const series = await getSeriesFromParams(params)
  const posts = (await getPostsFromSeries(series as Series)) as Post[]

  if (!series) {
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
      <h1 className="mb-2 mt-10 text-xl font-bold"> {series.title}</h1>
      <p>{series.description}</p>
      <div className="space-y-5">
        {posts?.length ? (
          posts.map((post) => {
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
          })
        ) : (
          <p>No posts in this series</p>
        )}
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

export const BlogPageCard: React.FC<BlogPageCardProps> = ({
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
