import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider"
import { source } from "@/lib/source"
import "@/app/global.css"
import { baseOptions } from "./layout.config"

const inter = Inter({
  subsets: ["latin"],
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{
            enabled: false,
          }}>
          <DocsLayout
            tree={source.pageTree}
            sidebar={{
              enabled: false,
            }}
            nav={{
              enabled: false,
            }}
            {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  )
}
