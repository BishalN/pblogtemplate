interface BlogCardProps {
  title: string
  date: string
}

export const BlogCard: React.FC<BlogCardProps> = ({ date, title }) => {
  return (
    <div className="flex justify-between">
      <p className="cursor-pointer text-gray-400 underline decoration-slate-500 underline-offset-4">
        {title}
      </p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  )
}
