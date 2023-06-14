"use client"

import * as React from "react"
import { DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu"
import { NpmCommands } from "types/uinst"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  src,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      className={cn(
        "relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none",
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Icons.check className="h-3 w-3" />
      ) : (
        <Icons.copy className="h-3 w-3" />
      )}
    </button>
  )
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  value: string
  classNames: string
  className?: string
}

export function CopyWithClassNames({
  value,
  classNames,
  className,
  ...props
}: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyToClipboard = React.useCallback((value: string) => {
    copyToClipboardWithMeta(value)
    setHasCopied(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none",
          className
        )}
        {...props}
      >
        {hasCopied ? (
          <Icons.check className="h-3 w-3" />
        ) : (
          <Icons.copy className="h-3 w-3" />
        )}
        <span className="sr-only">Copy</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>
          <Icons.react className="mr-2 h-4 w-4" />
          <span>Component</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>
          <Icons.tailwind className="mr-2 h-4 w-4" />
          <span>Classname</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<NpmCommands>
}

export function CopyNpmCommandButton({
  commands,
  className,
  ...props
}: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyCommand = React.useCallback(
    (value: string, pm: "npm" | "pnpm" | "yarn") => {
      copyToClipboardWithMeta(value)
      setHasCopied(true)
    },
    []
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none",
          className
        )}
        {...props}
      >
        {hasCopied ? (
          <Icons.check className="h-3 w-3" />
        ) : (
          <Icons.copy className="h-3 w-3" />
        )}
        <span className="sr-only">Copy</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__npmCommand__, "npm")}
        >
          <Icons.npm className="mr-2 h-4 w-4" />
          <span>npm</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__yarnCommand__, "yarn")}
        >
          <Icons.yarn className="mr-2 h-4 w-4" />
          <span>yarn</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__pnpmCommand__, "pnpm")}
        >
          <Icons.pnpm className="mr-2 h-4 w-4" />
          <span>pnpm</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
