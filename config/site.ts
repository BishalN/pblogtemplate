export type SiteConfig = typeof siteConfig

export const siteConfig = {
  nickname: "Shiva",
  name: "Bishal Neupane",
  description:
    "Portfolio of Bishal Neupane, a full-stack developer based in Kathmandu, Nepal.",
  mainNav: [
    // {
    //   title: "Home",
    //   href: "/",
    // },
    {
      title: "Projects",
      href: "/#projects",
    },
    {
      title: "Series",
      href: "/#series",
    },
    {
      title: "Posts",
      href: "/#posts",
    },
  ],
  links: {
    twitter: "https://twitter.com/bishaltwt",
    github: "https://github.com/bishaln",
    docs: "https://bishalneupane.com",
  },
  intro: `Hi there, I'm Bishal Neupane. I'm 21 y/o and going to university. I like
          pumping irons and building things. I enjoy learning new things and web
          development.`,
  currentWork: `Right now I'm building an analytics service, writing blog posts and
          going to the gym regularly.`,
  projects: [
    {
      title: "Threadgenie",
      description: `Threadgenie is a service that helps you create threads on twitter. I
        built this service because I wanted to create threads on twitter but I
        didn&apost want to use any third party services. I also wanted to learn
        how to build a service from scratch.`,
      href: "https://github.com/BishalN/Threadgenie",
    },
    {
      title: "Persona palette",
      description: `Generate persona for your next application.
        Built using nextjs, tailwindcss, typescript and stable diffusion api.`,
      href: "https://personagen.vercel.app/",
    },
    {
      title: "TimeXoneSyncer",
      description: `Lets you sync your time with anyone’s time
       in the world with a click of a button. Built using nextjs,
       tailwindcss, typescript and luxon.`,
      href: "https://time-xone-syncer.vercel.app/",
    },
    {
      title: "SingAndShare",
      description: `Lets sing and share your favorite songs with your friends.
      Built using nextjs and chakra-ui`,
      href: "https://github.com/BishalN/Sing-Share",
    },
  ],
}
