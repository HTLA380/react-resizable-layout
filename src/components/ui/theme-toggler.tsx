"use client"

import { ComponentProps, useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* -------------------------------------------------------------------------- */

const ThemeToggler = ({ className, children, onClick, ...props }: ComponentProps<typeof Button>) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return

  if (resolvedTheme === "dark") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          onClick?.(e)
          setTheme("light")
        }}
        className={cn("", className)}
        {...props}>
        {children ? children : <Sun className="text-lg" />}
      </Button>
    )
  }
  if (resolvedTheme === "light") {
    return (
      <Button variant="ghost" size="icon" onClick={() => setTheme("dark")} className={cn("", className)} {...props}>
        {children ? children : <Moon className="text-base" />}
      </Button>
    )
  }
}

export { ThemeToggler }
