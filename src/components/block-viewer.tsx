import React from "react"
import Link from "next/link"
import { Blocks } from "@/blocks"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { ExternalLink, Loader2 } from "lucide-react"
import { getSourceCode } from "@/lib/get-source-code"
import { ThemeImage } from "./theme-image"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

type BlockerViewerProps = {
  name: string
}

const BlockViewer = ({ name }: BlockerViewerProps) => {
  const block = Blocks[name]
  const blockSource = getSourceCode(block?.sourceUrl)

  return (
    <Tabs
      defaultValue="preview"
      className="mb-20"
      style={
        {
          "--iframe-height": `${block?.iframeHeight ?? "930"}px`,
        } as React.CSSProperties
      }>
      <div className="flex h-10 w-full items-center justify-between gap-4">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <Button asChild title="Open in New Tab" variant={"ghost"} size={"icon"}>
          <Link href={`/view/${block.name}`} target="_blank">
            <span className="sr-only">Open in New Tab</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <TabsContent value="preview" className="relative w-full overflow-hidden rounded-xl lg:border">
        <ThemeImage
          alt={block.name}
          lightSrc={block.imageUrl.light}
          darkSrc={block.imageUrl.dark}
          width={1920}
          height={1080}
          className="aspect-video w-full overflow-hidden rounded-md object-cover lg:hidden"
        />
        <iframe
          src={`/view/${block.name}`}
          className="bg-background not-prose relative z-20 hidden h-[var(--iframe-height)] w-full lg:block"
        />
      </TabsContent>
      <TabsContent value="code">
        <SourceCodeDisplay lang="tsx" code={blockSource} />
      </TabsContent>
    </Tabs>
  )
}

export { BlockViewer }

/* -------------------------------------------------------------------------- */

type SourceCodeDisplayProps = {
  code: string
  lang: string
}

const SourceCodeDisplay = async ({ lang, code }: SourceCodeDisplayProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="bg-background-alt text-muted-foreground flex items-center rounded-md p-4 text-sm">
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading...
        </div>
      }>
      <DynamicCodeBlock lang={lang} code={code} />
    </React.Suspense>
  )
}
