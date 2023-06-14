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

// /series/{booring-portfolio/part-1}
// Question is how do we separate the views for
// /series/booring-portolio
// /series/booring-portfolio/part-1

// We can use the slug to determine if we are on a series page or a series post page
// If the slug is just one item long, then we are on a series page
// If the slug is more than one item long, then we are on a series post page

// first we need to generate the static paths for the series pages
// then we need to generate the static paths for the series post pages

// Now we need to display different page content based on the slug length
// If the slug is just one item long, then we are on a series page
// If the slug is more than one item long, then we are on a series post page
// For that we'll use a boolean flag called isSeriesBlogPostPage

export const metadata = {
  title: "Series",
}

function isSeriesBlogPostPage(params: SeriesPageProps["params"]) {
  // just use length
  return params?.slug?.length > 1
}

async function getSeriesFromParams(params: SeriesPageProps["params"]) {
  const slug = params?.slug?.join("/")

  // this will not work for series blog pages
  const series = allSeries.find((series) => series.slugAsParams === slug)

  if (!series) {
    return null
  }

  return series
}

async function getPostsFromParams(params: SeriesPageProps["params"]) {
  const series = allSeries.find(
    (series) => series.slugAsParams === (params?.slug.join("/") as string)
  ) as Series

  const seriesPosts = (series.posts as string[]).map((postSlug) => {
    return allPosts.find((post) => post.slugAsParams === postSlug)
  })
  return seriesPosts
}

export async function generateStaticParams(): Promise<
  SeriesPageProps["params"][]
> {
  let paths = [] as SeriesPageProps["params"][]
  allSeries.forEach((series) => {
    series.posts?.forEach((post) => {
      paths.push({
        slug: [series.slugAsParams, post],
      })
    })
  })

  const seriesPaths = allSeries.map((series) => ({
    slug: series.slugAsParams.split("/"),
  }))

  const combinedPaths = [...paths, ...seriesPaths]
  console.log(combinedPaths)

  return [...paths, ...seriesPaths]
}

interface TSeriesPageProps {
  series: Series
  posts: Post[]
}

export default async function BlogPage({ params }: SeriesPageProps) {
  if (isSeriesBlogPostPage(params)) {
    return <SeriesPostPage params={params} />
  } else {
    const series = await getSeriesFromParams(params)
    if (!series) {
      return notFound()
    }
    const posts = (await getPostsFromParams(params)) as Post[]
    return <SeriesPage posts={posts} series={series} />
  }
}

function SeriesPage({ posts, series }: TSeriesPageProps) {
  return (
    <main className="my-10">
      <NextLink
        href="/"
        className="underline decoration-slate-500 underline-offset-4"
      >
        &larr; Back
      </NextLink>

      <h1 className="mb-2 mt-10 space-x-3 font-bold">
        <span className="text-xl">{series.title} </span>
        <span className="rounded-lg border bg-gray-600  p-1 text-muted-foreground">
          Complete
        </span>
      </h1>
      <div className="mb-4 flex space-x-3 text-muted-foreground">
        <p>{series.posts?.length} posts</p>
        <p className="space-x-2">
          {series.tags?.map((tag) => (
            <NextLink key={tag} href={`/tags/${tag}`}>
              #{tag}
            </NextLink>
          ))}
        </p>
      </div>
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
                seriesName={series.slugAsParams}
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

function SeriesPostPage({ params }: SeriesPageProps) {
  return <div>Hello this is a post page {params.slug}</div>
}

interface BlogPageCardProps {
  title: string
  date: string
  description: string
  tags?: string[]
  slug: string
  seriesName: string
}

const BlogPageCard: React.FC<BlogPageCardProps> = ({
  date,
  description,
  title,
  tags,
  slug,
  seriesName,
}) => {
  return (
    <div className="my-5 space-y-2">
      <NextLink
        href={`/series/${seriesName}/${slug}`}
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
