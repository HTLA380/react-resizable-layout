import Image from "next/image"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { VariantProps } from "class-variance-authority"
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  CreditCard,
  FolderPlus,
  LogOut,
  Plus,
  Radio,
  Search,
  Settings,
  Sparkles,
  SquareTerminal,
  UploadCloud,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ResizableLayoutClose,
  ResizableLayoutContent,
  ResizableLayoutGroup,
  ResizableLayoutOpen,
  ResizableLayoutPanel,
  ResizableLayoutProvider,
  ResizableLayoutTrigger,
} from "@/components/resizable-layout"
import { getServerSideResizableLayoutCookieData } from "@/components/resizable-layout/server-utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const LEFT_PANEL_ID = "left_panel_06"

const ResizableLayout06 = async () => {
  const { states, sizes } = await getServerSideResizableLayoutCookieData({
    states: { [LEFT_PANEL_ID]: true },
    sizes: [25, 75],
  })

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={0} disableHoverableContent={false}>
      <ResizableLayoutProvider initialState={states}>
        <main className="bg-background flex h-screen w-full">
          <Sidebar />

          <ResizableLayoutGroup direction="horizontal" defaultLayout={sizes}>
            <ResizableLayoutPanel
              id={LEFT_PANEL_ID}
              side="left"
              minSize={20}
              defaultSize={30}
              maxSize={35}
              className="group bg-sidebar group hidden md:block">
              <NavPanel />
            </ResizableLayoutPanel>
            <ResizableLayoutContent minSize={70} defaultSize={70} maxSize={100}>
              <MainHeader />
              <MainContent />
            </ResizableLayoutContent>
          </ResizableLayoutGroup>
        </main>
      </ResizableLayoutProvider>
    </TooltipProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Sidebar                                  */
/* -------------------------------------------------------------------------- */

const Sidebar = () => {
  return (
    <aside className="bg-sidebar flex h-full w-12 flex-col items-center border-r py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/113810462?v=4" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56 rounded-lg" align="start" side="right">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8">
                <AvatarImage src="https://avatars.githubusercontent.com/u/113810462?v=4" />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Htet Aung Lin</span>
                <span className="truncate text-xs">example@gmail.com</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex w-full flex-col items-center gap-1 py-4">
        <SidebarButton data-state="active" tooltip="Playground">
          <SquareTerminal />
        </SidebarButton>

        <SidebarButton tooltip="Models">
          <Bot />
        </SidebarButton>

        <SidebarButton tooltip="Documentation">
          <BookOpen />
        </SidebarButton>

        <SidebarButton tooltip="Settings">
          <Settings />
        </SidebarButton>
      </div>
    </aside>
  )
}

const SidebarButton = ({
  tooltip,
  children,
  ...props
}: {
  tooltip: string
  children: React.ReactNode
} & React.ComponentProps<typeof Button>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <ResizableLayoutOpen id={LEFT_PANEL_ID} asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground size-8 cursor-pointer"
            {...props}>
            {children}
          </Button>
        </ResizableLayoutOpen>
      </TooltipTrigger>
      <TooltipContent side={"right"} align={"center"}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  NavPanel                                  */
/* -------------------------------------------------------------------------- */

const navLinks = [
  { title: "Dashboard", active: true },
  { title: "History" },
  { title: "Starred" },
  { title: "Settings" },
]

const NavPanel = () => {
  return (
    <ScrollArea className="h-screen py-2">
      <div className="flex h-10 w-full items-center justify-between px-4">
        <p className="shrink-0 truncate text-sm font-semibold outline-hidden transition-opacity duration-300 group-data-[state=closed]:opacity-0">
          Resizable
        </p>

        <ResizableLayoutClose id={LEFT_PANEL_ID} asChild>
          <Button size={"icon"} variant={"ghost"} className="size-8 cursor-pointer">
            <X />
            <span className="sr-only">Close Panel</span>
          </Button>
        </ResizableLayoutClose>
      </div>
      <div className="p-2 py-4">
        {navLinks.map((link) => (
          <Button
            key={link.title}
            size="sm"
            variant="ghost"
            className={cn(
              "w-full justify-start transition-opacity duration-300 group-data-[state=closed]:opacity-0",
              link.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}>
            {link.title}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 MainHeader                                 */
/* -------------------------------------------------------------------------- */

const MainHeader = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <ResizableLayoutTrigger id={LEFT_PANEL_ID} />
        <div className="w-96">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input type="search" placeholder="Search files..." className="pl-9" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 MainContent                                */
/* -------------------------------------------------------------------------- */

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]

const actionButtons: {
  icon: React.ElementType
  label: string
  variant: ButtonVariant
}[] = [
  { icon: Plus, label: "Create", variant: "default" },
  { icon: UploadCloud, label: "Upload", variant: "outline" },
  { icon: FolderPlus, label: "Create folder", variant: "outline" },
  { icon: Radio, label: "Record", variant: "outline" },
]

const fileCards = [
  {
    title: "Q4 Sales Deck",
    metadata: "Shared folder • 8 presentations",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "Product Videos",
    metadata: "Shared folder • 5 videos",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "ROI Calculator",
    metadata: "Shared file • 1 Excel",
    thumbnail: "/placeholder.svg",
  },
]

const MainContent = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        {actionButtons.map((btn) => (
          <Button key={btn.label} variant={btn.variant} className="gap-2">
            <btn.icon className="h-4 w-4" />
            {btn.label}
          </Button>
        ))}
      </div>

      <div className="mb-6">
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fileCards.map((card) => (
          <FileCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  )
}

const FileCard = ({ title, metadata, thumbnail }: { title: string; metadata: string; thumbnail: string }) => {
  return (
    <div className="group bg-card relative overflow-hidden rounded-lg border">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-foreground font-medium">{title}</h3>
        <p className="text-muted-foreground/70 text-sm">{metadata}</p>
      </div>
    </div>
  )
}

export default ResizableLayout06
