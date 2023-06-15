"use client"

import { useRouter } from "next/navigation"

export function GoBack() {
  const router = useRouter()

  return (
    <button
      type="button"
      className="underline decoration-slate-500 underline-offset-4"
      onClick={() => router.back()}
    >
      &larr; Back
    </button>
  )
}
