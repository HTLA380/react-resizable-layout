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

const LEFT_PANEL_ID = "left-panel_03"
const RIGHT_PANEL_ID = "right-panel_03"

const ResizableLayout03 = async () => {
  const { states, sizes } = await getServerSideResizableLayoutCookieData({
    states: { [LEFT_PANEL_ID]: true, [RIGHT_PANEL_ID]: false },
    sizes: [30, 70, 0],
  })

  return (
    <div className="bg-background text-foreground flex h-screen flex-col">
      <Header />
      <ResizableLayoutProvider initialState={states}>
        <ResizableLayoutGroup direction="horizontal" className="bg-secondary" defaultLayout={sizes}>
          <ResizableLayoutPanel
            id={LEFT_PANEL_ID}
            side="left"
            minSize={25}
            defaultSize={30}
            maxSize={35}
            className="bg-background group hidden md:block">
            <LeftPanelContent />
          </ResizableLayoutPanel>

          <ResizableLayoutContent minSize={30} defaultSize={40} maxSize={100} className="relative p-4">
            <div className="flex h-full w-full justify-between">
              <ResizableLayoutTrigger id={LEFT_PANEL_ID} className="z-20 hidden md:flex" />
              <ResizableLayoutTrigger id={RIGHT_PANEL_ID} className="z-20 hidden rotate-180 md:flex" />
            </div>
          </ResizableLayoutContent>

          <ResizableLayoutPanel
            id={RIGHT_PANEL_ID}
            minSize={25}
            defaultSize={30}
            maxSize={35}
            side="right"
            className="bg-background group hidden justify-center md:flex">
            <RightPanelContent />
          </ResizableLayoutPanel>
        </ResizableLayoutGroup>
      </ResizableLayoutProvider>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                              LeftPanelContent                              */
/* -------------------------------------------------------------------------- */

const LeftPanelContent = () => (
  <div className="flex size-full min-w-72 flex-col border-r p-6">
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

/* -------------------------------------------------------------------------- */
/*                              RightPanelContent                             */
/* -------------------------------------------------------------------------- */

const RightPanelContent = () => (
  <div className="bg-background flex w-full max-w-80 flex-col p-4">
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground/80 text-sm font-medium">Properties</h3>
        <Button variant="ghost" size="icon" className="text-muted-foreground h-6 w-6">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex-1 space-y-4 p-4">
      <div>
        <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">Component</h4>
        <div className="space-y-2">
          <div className="bg-accent rounded border p-2">
            <div className="text-muted-foreground text-sm">No component selected</div>
            <div className="text-foreground/80 mt-1 text-xs">Select an element to edit properties</div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">Style</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="text-muted-foreground hover:text-foreground h-8 w-full justify-start bg-transparent text-left text-xs">
            <div className="mr-2 h-3 w-3 rounded-full bg-blue-600"></div>
            Primary
          </Button>
          <Button
            variant="outline"
            className="text-muted-foreground hover:text-foreground h-8 w-full justify-start bg-transparent text-left text-xs">
            <div className="mr-2 h-3 w-3 rounded-full bg-gray-500"></div>
            Secondary
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">Layout</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="text-muted-foreground hover:text-foreground h-8 text-xs">
            Flex
          </Button>
          <Button variant="outline" className="text-muted-foreground hover:text-foreground h-8 text-xs">
            Grid
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">Spacing</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Padding</span>
            <div className="flex gap-1">
              {["4", "8", "12", "16"].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-6 w-8 bg-transparent p-0 text-xs">
                  {value}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Margin</span>
            <div className="flex gap-1">
              {["0", "2", "4", "8"].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-6 w-8 bg-transparent p-0 text-xs">
                  {value}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ResizableLayout03
