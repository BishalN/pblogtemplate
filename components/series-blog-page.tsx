"use client"

import NextLink from "next/link"
import { Post, Series } from "@/.contentlayer/generated"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Link } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"

import { Icons } from "./icons"
import { Mdx } from "./mdx-components"
import { buttonVariants } from "./ui/button"

export interface SeriesPostPageProps {
  post: Post
  postsInSeries: Post[]
  series: Series
}

export function SeriesPostPage({
  post,
  postsInSeries,
  series,
}: SeriesPostPageProps) {
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