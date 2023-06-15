import React from "react"
import { notFound } from "next/navigation"
import { Post, Series, allPosts, allSeries } from "contentlayer/generated"

import { SeriesPostPage } from "@/components/series-blog-page"
import { SeriesPage } from "@/components/series-page"

interface SeriesPageProps {
  params: {
    slug: string[]
  }
}

export const metadata = {
  title: "Series",
}

function isSeriesBlogPage(params: SeriesPageProps["params"]) {
  // {slug:["series-slug", "post-slug"]}
  return params?.slug?.length === 2
}

function isSeriesPage(params: SeriesPageProps["params"]) {
  // {slug:["series-slug"]}
  return params?.slug?.length === 1
}

async function getSeries(slug: string) {
  const series = allSeries.find((series) => series.slugAsParams === slug)
  if (!series) {
    return null
  }
  return series
}

async function getPostsFromSeriesSlug(slug: string) {
  const series = allSeries.find(
    (series) => series.slugAsParams === slug
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

  return [...paths, ...seriesPaths]
}

export default async function BlogPage({ params }: SeriesPageProps) {
  if (isSeriesBlogPage(params)) {
    const post = allPosts.find((post) => post.slugAsParams === params.slug[1])
    if (!post) {
      return notFound()
    }

    const series = allSeries.find(
      (series) => series.slugAsParams === params.slug[0]
    ) as Series

    // Impossible Defensive Programming
    // TODO: It should not be required since we don't have any ssg path generated
    // for such conditions
    if (!series) {
      return notFound()
    }

    const postsInSeries = (series.posts as string[]).map((postSlug) => {
      return allPosts.find((post) => post.slugAsParams === postSlug)
    }) as Post[]

    return (
      <SeriesPostPage
        post={post}
        postsInSeries={postsInSeries}
        series={series}
      />
    )
  }

  if (isSeriesPage(params)) {
    const series = await getSeries(params.slug[0])
    if (!series) {
      return notFound()
    }
    const posts = (await getPostsFromSeriesSlug(params.slug[0])) as Post[]
    return <SeriesPage posts={posts} series={series} />
  }

  return notFound()
}
