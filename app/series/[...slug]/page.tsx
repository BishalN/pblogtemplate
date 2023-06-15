import React from "react"
import { notFound } from "next/navigation"
import { Post, Series, allPosts, allSeries } from "contentlayer/generated"

import { SeriesPage } from "@/components/series-page"
import { SeriesPostPage } from "@/components/series-post-page"

interface SeriesPageProps {
  params: {
    slug: string[]
  }
}

export const metadata = {
  title: "Series",
}

function isSeriesBlogPostPage(params: SeriesPageProps["params"]) {
  // {slug:["series-slug", "post-slug"]}
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

async function getPostsFromSeriesParams(params: SeriesPageProps["params"]) {
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

  return [...paths, ...seriesPaths]
}

export default async function BlogPage({ params }: SeriesPageProps) {
  if (isSeriesBlogPostPage(params)) {
    const post = allPosts.find((post) => post.slugAsParams === params.slug[1])
    if (!post) {
      return notFound()
    }
    const series = allSeries.find(
      (series) => series.slugAsParams === (params?.slug[0] as string)
    ) as Series

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
  } else {
    const series = await getSeriesFromParams(params)
    if (!series) {
      return notFound()
    }
    const posts = (await getPostsFromSeriesParams(params)) as Post[]
    return <SeriesPage posts={posts} series={series} />
  }
}
