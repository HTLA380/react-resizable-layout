"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

type ThemeImageProps = {
  lightSrc: string
  darkSrc: string
  alt: string
  width: number
  height: number
  className?: string
} & Omit<React.ComponentProps<typeof Image>, "src">

export const ThemeImage = ({ lightSrc, darkSrc, alt, width, height, className, ...props }: ThemeImageProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Dynamically set the src based on the theme
  const src = theme === "dark" ? darkSrc : lightSrc

  return <Image width={width} height={height} alt={alt} src={src} className={className} {...props} />
}
