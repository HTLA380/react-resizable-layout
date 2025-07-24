import { ChevronDown, Code, Eye, LayoutGrid, Play, RotateCcw, Settings, Share, Target } from "lucide-react"
import {
  ResizableLayoutContent,
  ResizableLayoutGroup,
  ResizableLayoutPanel,
  ResizableLayoutProvider,
  ResizableLayoutTrigger,
} from "@/components/resizable-layout"
import { getServerSideResizableLayoutCookieData } from "@/components/resizable-layout/server-utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const RIGHT_PANEL_ID = "right-panel_02"

const ResizableLayout02 = async () => {
  const { states, sizes } = await getServerSideResizableLayoutCookieData({
    states: { [RIGHT_PANEL_ID]: false },
    sizes: [100, 0],
  })

  return (
    <div className="bg-background text-foreground flex h-screen flex-col">
      <Header />
      <ResizableLayoutProvider initialState={states}>
        <ResizableLayoutGroup direction="horizontal" className="bg-secondary" defaultLayout={sizes}>
          <ResizableLayoutContent minSize={60} defaultSize={60} maxSize={100} className="relative flex justify-end p-4">
            <ResizableLayoutTrigger id={RIGHT_PANEL_ID} className="z-20 hidden md:flex" />
          </ResizableLayoutContent>
          <ResizableLayoutPanel
            id={RIGHT_PANEL_ID}
            side="right"
            minSize={30}
            defaultSize={35}
            maxSize={35}
            className="bg-background group hidden md:block">
            <LeftPanelContent />
          </ResizableLayoutPanel>
        </ResizableLayoutGroup>
      </ResizableLayoutProvider>
    </div>
  )
}

const Header = () => (
  <header className="flex items-center justify-between border-b px-4 py-2">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-black dark:bg-white">
          <div className="h-3 w-3 rounded-sm bg-white dark:bg-black"></div>
        </div>
        <Button variant="ghost" className="text-foreground hover:text-accent-foreground h-auto p-1">
          <span className="text-sm">Untitled</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <Badge variant="secondary" className="text-xs">
        AI beta
      </Badge>
      <div className="hidden items-center gap-1 md:flex">
        <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="ghost" className="text-muted-foreground hidden h-8 text-sm md:flex">
        <Eye className="mr-1 h-4 w-4" />
        Preview
      </Button>
      <Button variant="ghost" className="text-muted-foreground hidden h-8 text-sm md:flex">
        <Code className="mr-1 h-4 w-4" />
        Code
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground hidden h-8 w-8 md:flex">
        <Play className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground hidden h-8 w-8 md:flex">
        <Settings className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="hidden h-8 px-3 text-sm md:flex">
        <Share className="mr-1 h-4 w-4" />
        Share
      </Button>
      <Button className="h-8 bg-blue-600 px-3 text-sm text-white hover:bg-blue-700">Publish</Button>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder.svg?height=32&width=32" />
        <AvatarFallback className="bg-primary text-foreground text-xs">H</AvatarFallback>
      </Avatar>
    </div>
  </header>
)

const LeftPanelContent = () => (
  <div className="flex size-full min-w-72 flex-col border-r p-6 transition-opacity duration-100 ease-in-out group-data-[state=closed]:opacity-0">
    <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      <Target className="text-muted-foreground/70 mx-auto h-8 w-8" />
      <h2 className="text-foreground/80 mb-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-md text-sm font-medium">
        What do you want to make?
      </h2>
      <div className="grid grid-cols-2 justify-center gap-2">
        <Button variant="outline" className="text-foreground/80 h-8 rounded-full text-xs">
          Signup flow
        </Button>
        <Button variant="outline" className="text-foreground/80 h-8 rounded-full text-xs">
          Gradient gallery
        </Button>
        <Button variant="outline" className="text-foreground/80 h-8 rounded-full text-xs">
          Data dashboard
        </Button>
      </div>
    </div>
    <div className="mt-auto">
      <Textarea placeholder="Describe your idea" className="min-h-32 w-full resize-none rounded-2xl text-sm" />
    </div>
  </div>
)

export default ResizableLayout02
