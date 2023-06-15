import NextLink from "next/link"

import { formatDate } from "@/lib/utils"

interface BlogCardProps {
  title: string
  date: string
  slug: string
}

export const BlogCard: React.FC<BlogCardProps> = ({ date, title, slug }) => {
  return (
    <div className="flex justify-between">
      <NextLink
        href={`/blogs/${slug}`}
        className="cursor-pointer text-gray-400 underline decoration-slate-500 underline-offset-4"
      >
        {title}
      </NextLink>
      <p className="text-muted-foreground">{formatDate(date)}</p>
    </div>
  )
}
