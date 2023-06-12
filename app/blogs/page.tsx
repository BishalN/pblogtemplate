import React from "react"
import NextLink from "next/link"

export default function BlogPage() {
  return (
    <main className="my-10">
      <NextLink
        href="/"
        className="underline decoration-slate-500 underline-offset-4"
      >
        &larr; Back
      </NextLink>
      <h1 className="mt-4 text-xl font-bold"> Blogs</h1>
      <div className="space-y-5">
        <BlogPageCard
          title="How to change password of your local mysql server macOs"
          description="In this blog post we talk about changing password of your local mysql
        server macOs In just 7 steps Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Impedit, veniam."
          date="Jun 2, 2023"
          tags={["react", "nextjs", "tailwindcss"]}
        />
        <BlogPageCard
          title="How to change password of your local mysql server macOs"
          description="In this blog post we talk about changing password of your local mysql
        server macOs In just 7 steps Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Impedit, veniam."
          date="Jun 2, 2023"
          tags={["react", "nextjs", "tailwindcss", "typescript"]}
        />
      </div>
    </main>
  )
}

interface BlogPageCardProps {
  title: string
  date: string
  description: string
  tags?: string[]
}

export const BlogPageCard: React.FC<BlogPageCardProps> = ({
  date,
  description,
  title,
  tags,
}) => {
  return (
    <div className="my-5 space-y-2">
      <h3 className="cursor-pointer text-lg underline decoration-slate-500 underline-offset-4">
        {title}
      </h3>
      <div className="flex space-x-3 text-muted-foreground">
        <p className="">{date}</p>
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
