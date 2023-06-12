interface SeriesCardProps {
  title: string
  noOfPosts: string
  isCompleted?: boolean
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
  title,
  noOfPosts,
  isCompleted = false,
}) => {
  return (
    <div className="flex justify-between">
      <p className="cursor-pointer text-gray-400 underline decoration-slate-500 underline-offset-4">
        {title}
      </p>
      <p className="space-x-3 text-muted-foreground">
        <span>
          {noOfPosts} posts{","}
        </span>
        <span>{isCompleted ? "Complete ✅" : "In Progress  🏗️"}</span>
      </p>
    </div>
  )
}
