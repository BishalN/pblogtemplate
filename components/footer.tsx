import NextLink from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "./icons"

export const Footer = () => {
  return (
    <footer className="my-10">
      <hr className="h-4 " />
      <div className="flex justify-between">
        <NextLink href="/">Bishal Neupane</NextLink>
        <div className="flex space-x-4">
          <NextLink
            href={siteConfig.links.github}
            passHref
            target="_blank"
            rel="norefferor"
          >
            <Icons.gitHub className="h-5 w-5" />
          </NextLink>
          <NextLink
            href={siteConfig.links.twitter}
            passHref
            target="_blank"
            rel="noreferror"
          >
            <Icons.twitter className="h-5 w-5" />
          </NextLink>
        </div>
      </div>
    </footer>
  )
}
