import NextLink from "next/link"
import { Series } from "@/.contentlayer/generated"
import { Link } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { PostWithPart } from "@/app/series/[...slug]/page"

import { Icons } from "./icons"
import { Mdx } from "./mdx-components"
import { buttonVariants } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export interface SeriesPostPageProps {
  post: PostWithPart
  postsInSeries: PostWithPart[]
  series: Series
}

export function SeriesPostPage({
  post,
  postsInSeries,
  series,
}: SeriesPostPageProps) {
  const nextPostInSeries = postsInSeries.find(
    (postInSeries) => postInSeries.part === post.part + 1
  )

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
            {post.part}: {post.title}
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
                <span>{`${post.part}: ${post.title}`}</span>
                <Icons.chevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-4">
                {postsInSeries.map((post) => {
                  return (
                    <DropdownMenuItem key={post.slug}>
                      <NextLink
                        href={`/series/${series.slugAsParams}/${post.slugAsParams}`}
                      >
                        {`${post.part}: ${post.title}`}
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
          {nextPostInSeries ? (
            <NextLink
              href={`/series/${series.slugAsParams}/${nextPostInSeries?.slugAsParams}`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Next post in series{" "}
              {`${nextPostInSeries?.part}: ${nextPostInSeries?.title}`}
              <Icons.chevronRight className="mr-2 h-4 w-4" />
            </NextLink>
          ) : (
            <NextLink
              href={`/series/${series.slugAsParams}`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Go back to series page
            </NextLink>
          )}
        </div>
      </article>
    </div>
  )
}
