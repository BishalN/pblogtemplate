import React from "react"

import { BlogCard } from "@/components/blog-card"
import { ProjectCard } from "@/components/project-card"
import { SeriesCard } from "@/components/series-card"

export default function IndexPage() {
  return (
    <main>
      <section id="hero" className="grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-xl font-semibold text-muted-foreground">Bishal</h1>
        <p>
          Hi there, Im Bishal Neupane. Im 21 y/o and going to university. I like
          pumping irons and building things. I enjoy learning new things and web
          development.
        </p>
        <p>
          Right now Im building an analytics service, writing blog posts and
          going to the gym regularly.
        </p>
      </section>
      <section id="projects" className="grid items-center gap-6 pt-6 md:py-4">
        <h2 className="text-lg font-semibold">Projects</h2>
        <ProjectCard
          title="Threadgenie"
          description="Threadgenie is a service that helps you create threads on twitter. I
        built this service because I wanted to create threads on twitter but I
        didn&apost want to use any third party services. I also wanted to learn
        how to build a service from scratch."
          href="https://github.com/BishalN/Threadgenie"
        />
        <ProjectCard
          title="Persona palette"
          description="Generate persona for your next application. Built using nextjs, tailwindcss, typescript and stable diffusion api."
          href="https://personagen.vercel.app/"
        />
        <ProjectCard
          title="TimeXoneSyncer"
          description="Lets you sync your time with anyone’s time in the world with a click of a button. Built using nextjs, tailwindcss, typescript and luxon."
          href="https://personagen.vercel.app/"
        />
        <ProjectCard
          title="SingAndShare"
          description="Lets sing and share your favorite songs with your friends. Built using nextjs and chakra-ui"
          href="https://github.com/BishalN/Sing-Share"
        />
      </section>
      <section id="blogs" className="grid items-center gap-6 pt-6 md:py-4">
        <div>
          <h2 className="text-lg font-semibold">Blog</h2>
          <p className="text-muted-foreground">
            I write about things that I discover daily
          </p>
        </div>
        <BlogCard
          title="How to change password of your local mysql server macOs"
          date="Jun 2, 2023"
        />
        <BlogCard
          title="How to create a booring portfolio website using nextjs and tailwindcss"
          date="Jun 7, 2023"
        />
        <BlogCard
          title="How to create a booring portfolio website using nextjs and tailwindcss"
          date="Jun 7, 2023"
        />
      </section>

      <section id="series" className="grid items-center gap-6 pt-6 md:py-4">
        <div>
          <h2 className="text-lg font-semibold">Series</h2>
          <p className="text-muted-foreground">
            Collection of articles that are related to each other
          </p>
        </div>
        <SeriesCard
          title="Creating a booring portfolio website using nextjs and tailwindcss"
          noOfPosts="3"
          isCompleted
        />
        <SeriesCard title="React hooks in depth" noOfPosts="3" />
      </section>
    </main>
  )
}
