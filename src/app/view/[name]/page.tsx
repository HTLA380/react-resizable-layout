import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Blocks } from "@/blocks"
import { LoaderCircle } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    name: string
  }>
}): Promise<Metadata> {
  const { name } = await params
  const block = Blocks[name]

  if (!block) {
    return {}
  }

  const { title, description } = block

  return {
    title,
    description,
  }
}

export const generateStaticParams = () => {
  return Object.values(Blocks).map((block) => ({ name: block.name }))
}

const BlockPage = async ({
  params,
}: {
  params: Promise<{
    name: string
  }>
}) => {
  const { name } = await params
  const Component = getBlockComponent(name)

  if (!Component) {
    return notFound()
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
            <LoaderCircle className="mr-2 size-4 animate-spin" />
            Loading...
          </div>
        }>
        <Component />
      </React.Suspense>
    </div>
  )
}

const getBlockComponent = (name: string) => Blocks[name]?.component

export default BlockPage
