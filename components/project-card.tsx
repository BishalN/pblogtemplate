import NextLink from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  href: string
}
export const ProjectCard: React.FC<ProjectCardProps> = ({
  description,
  href,
  title,
}) => {
  return (
    <div>
      <h3 className="text-md underline decoration-slate-500 decoration-2 underline-offset-4 transition-colors  hover:text-muted-foreground">
        <NextLink href={href}>{title}</NextLink>
      </h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
