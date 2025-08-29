
"use client"

import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center bg-transparent text-slate-950 transition-bg dark:text-slate-50",
        className
      )}
      {...props}
    >
      <div className="relative z-10 w-full">{children}</div>
    </main>
  )
}
