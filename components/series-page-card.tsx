import NextLink from "next/link"

import { formatDate } from "@/lib/utils"

interface SeriesPageProps {
  title: string
  date: string
  description: string
  tags?: string[]
  slug: string
  isCompleted?: boolean
}

export const SeriesPageCard: React.FC<SeriesPageProps> = ({
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
