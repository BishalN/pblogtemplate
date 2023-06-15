import NextLink from "next/link"

interface SeriesCardProps {
  title: string
  noOfPosts: number
  isCompleted?: boolean
  slug: string
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
  title,
  noOfPosts,
  isCompleted = false,
  slug,
}) => {
  return (
    <div className="flex justify-between">
      <NextLink
        href={`/series/${slug}`}
        className="cursor-pointer text-gray-400 underline decoration-slate-500 underline-offset-4"
      >
        {title}
      </NextLink>
      <p className="space-x-3 text-muted-foreground">
        <span>
          {noOfPosts} posts{","}
        </span>
        <span>{isCompleted ? "Complete ✅" : "In Progress  🏗️"}</span>
      </p>
    </div>
  )
}
