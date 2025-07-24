import React from "react"
import Navbar from "@/components/navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <footer className="mt-12 h-14 border-t px-6 md:mt-20 lg:mt-28">
        <div className="mx-auto flex h-full w-full max-w-screen-lg items-center justify-between">
          <p className="text-sm font-medium">
            Made by{" "}
            <a
              target="_blank"
              href="https://github.com/HTLA380"
              className="text-[rgb(70_66_124)] hover:underline dark:text-[rgb(143_139_180)]">
              Htet Aung Lin
            </a>
          </p>

          <p className="text-foreground/80 text-xs">MIT License © 2025</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
