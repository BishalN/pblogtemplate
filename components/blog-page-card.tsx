import NextLink from "next/link"

import { formatDate } from "@/lib/utils"

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
