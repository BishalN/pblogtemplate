import React from "react"
import NextLink from "next/link"
import { notFound } from "next/navigation"
import { Post, Series, allPosts, allSeries } from "contentlayer/generated"
import { Link } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { Mdx } from "@/components/mdx-components"

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

interface TSeriesPageProps {
  series: Series
  posts: Post[]
}

interface SeriesPostPageProps {
  post: Post
  postsInSeries: Post[]
  series: Series
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

function SeriesPostPage({ post, postsInSeries, series }: SeriesPostPageProps) {
  return (
    <div className="container">
      <article className="relative max-w-3xl py-6 lg:py-10">
        <Link
          href="/blogs"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div>
          {post.date && (
            <time
              dateTime={post.date}
              className="block text-sm text-muted-foreground"
            >
              Published on {formatDate(post.date)}
            </time>
          )}
          <h1 className="font-heading mb-4 mt-2 inline-block text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>
          <div className="mb-10 space-y-2 rounded-md border p-2">
            <p>
              This article is part of
              <NextLink
                href={`series/${series.slugAsParams}`}
                className="text-muted-foreground hover:underline hover:underline-offset-4"
              >
                {" "}
                {series.title}{" "}
              </NextLink>
              series
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex space-x-3 rounded-md border px-6 py-2">
                <span>{post.title}</span>
                <Icons.chevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {postsInSeries.map((post, index) => {
                  console.log(post.slug)
                  return (
                    <DropdownMenuItem key={post.slug}>
                      <NextLink
                        href={`/series/${series.slugAsParams}/${post.slugAsParams}`}
                      >
                        {index + 1} {":"} {post.title}
                      </NextLink>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Mdx code={post.body.code} />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blogs"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </div>
  )
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
