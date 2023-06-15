import NextLink from "next/link"
import { Post, Series } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"

export interface SeriesPageProps {
  series: Series
  posts: Post[]
}

export function SeriesPage({ posts, series }: SeriesPageProps) {
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
              <SeriesBlogPageCard
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

interface SeriesBlogPageCardProps {
  title: string
  date: string
  description: string
  tags?: string[]
  slug: string
  seriesName: string
}

const SeriesBlogPageCard: React.FC<SeriesBlogPageCardProps> = ({
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
