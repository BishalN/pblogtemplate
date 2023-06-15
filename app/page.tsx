import React from "react"
import NextLink from "next/link"
import { Series, allPosts, allSeries } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { siteConfig } from "@/config/site"
import { BlogCard } from "@/components/blog-card"
import { ProjectCard } from "@/components/project-card"
import { SeriesCard } from "@/components/series-card"

export default function IndexPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
    .slice(0, 3)

  const series = allSeries
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
    .slice(0, 3)

  return (
    <main>
      <section id="hero" className="grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl font-semibold text-muted-foreground">Bishal</h1>
        <p>{siteConfig.intro}</p>
        <p>{siteConfig.currentWork}</p>
      </section>
      <section id="projects" className="grid items-center gap-6 pt-6 md:py-4">
        <h2 className="text-lg font-semibold">Projects</h2>
        {siteConfig.projects.map((project) => {
          return <ProjectCard {...project} />
        })}
      </section>
      <section id="blogs" className="grid items-center gap-6 pt-6 md:py-4">
        <div>
          <h2 className="text-lg font-semibold">Blog</h2>
          <p className="text-muted-foreground">
            I write about things that I discover daily
          </p>
        </div>
        {posts.map((post) => {
          return (
            <BlogCard
              key={post.slugAsParams}
              title={post.title}
              date={post.date}
            />
          )
        })}
        <NextLink
          href="/blogs"
          className="cursor-pointer  underline decoration-slate-400 underline-offset-4 hover:text-muted-foreground"
        >
          All Posts &rarr;
        </NextLink>
      </section>

      <section id="series" className="grid items-center gap-6 pt-6 md:py-4">
        <div>
          <h2 className="text-lg font-semibold">Series</h2>
          <p className="text-muted-foreground">
            Collection of articles that are related to each other
          </p>
        </div>
        {series.map((serie) => {
          return (
            <SeriesCard
              key={serie.slugAsParams}
              title={serie.title}
              isCompleted={serie.isCompleted}
              noOfPosts={serie.posts!.length}
            />
          )
        })}
        <NextLink
          href="/series"
          className="cursor-pointer  underline decoration-slate-400 underline-offset-4 hover:text-muted-foreground"
        >
          All Series &rarr;
        </NextLink>
      </section>
    </main>
  )
}
