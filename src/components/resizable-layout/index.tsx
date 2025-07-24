"use client"

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { updateResizableLayoutCookie } from "./client-utils"

/* -------------------------------------------------------------------------- */
/*                           ResizableLayoutContext                           */
/* -------------------------------------------------------------------------- */

export type PanelState = {
  [id: string]: boolean
}

type PanelContextType = {
  panels: PanelState
  togglePanel: (id: string) => void
  openPanel: (id: string) => void
  closePanel: (id: string) => void
}

const ResizableLayoutContext = createContext<PanelContextType | null>(null)

function useResizableLayoutContext() {
  const context = useContext(ResizableLayoutContext)
  if (!context) {
    throw new Error("useResizableLayoutContext must be used within a ResizableLayoutProvider.")
  }
  return context
}

/* -------------------------------------------------------------------------- */
/*                           ResizableLayoutProvider                          */
/* -------------------------------------------------------------------------- */

type ResizableLayoutProviderProps = {
  initialState?: PanelState
  children: React.ReactNode
}

const ResizableLayoutProvider = ({ initialState = {}, children }: ResizableLayoutProviderProps) => {
  const [panels, setPanels] = useState<PanelState>(initialState)

  const setPanelState = useCallback((id: string, isOpen: boolean) => {
    setPanels((prev) => {
      const newState = { ...prev, [id]: isOpen }
      if (typeof document !== "undefined") {
        updateResizableLayoutCookie({ panelId: id, isOpen: isOpen })
      }

      return newState
    })
  }, [])

  const togglePanel = useCallback(
    (id: string) => {
      setPanelState(id, !panels[id])
    },
    [panels, setPanelState],
  )

  const openPanel = useCallback(
    (id: string) => {
      setPanelState(id, true)
    },
    [setPanelState],
  )

  const closePanel = useCallback(
    (id: string) => {
      setPanelState(id, false)
    },
    [setPanelState],
  )

  return (
    <ResizableLayoutContext.Provider value={{ panels, togglePanel, openPanel, closePanel }}>
      {children}
    </ResizableLayoutContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                            ResizableLayoutGroup                            */
/* -------------------------------------------------------------------------- */

const ResizableLayoutGroup = ({
  children,
  onLayout,
  defaultLayout,
  ...props
}: React.ComponentProps<typeof ResizablePanelGroup> & {
  defaultLayout?: number[]
}) => {
  const handleOnLayout = (sizes: number[]) => {
    onLayout?.(sizes)
    updateResizableLayoutCookie({ sizes: sizes })
  }

  let panelIndex = 0

  const kids = React.Children.map(children, (child) => {
    const isValid = React.isValidElement(child)

    if (!isValid) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[ResizableLayoutGroup]: One or more children are not valid React elements. " +
            "Only <ResizableLayoutPanel> and <ResizableLayoutContent> are supported as children. " +
            "Unexpected children may cause layout flickering or hydration issues.",
        )
      }
      return child
    }

    const newProps: { defaultSize?: number } = {}
    if (defaultLayout?.[panelIndex] !== undefined) {
      newProps.defaultSize = defaultLayout[panelIndex]
    }
    panelIndex++

    return React.cloneElement(child, newProps)
  })

  return (
    <ResizablePanelGroup onLayout={handleOnLayout} {...props}>
      {kids}
    </ResizablePanelGroup>
  )
}

/* -------------------------------------------------------------------------- */
/*                            ResizableLayoutPanel                            */
/* -------------------------------------------------------------------------- */

type ResizableLayoutPanelProps = {
  id: string
  minSize?: number
  side: "left" | "right"
  collapseOnResize?: boolean
  disableTransition?: boolean
} & React.ComponentProps<typeof ResizablePanel>

const ResizableLayoutPanel = ({
  id,
  className,
  children,
  minSize = 20,
  defaultSize = 25,
  maxSize = 30,
  side,
  collapseOnResize = false,
  disableTransition = false,
  ...props
}: ResizableLayoutPanelProps) => {
  const panelRef = useRef<ImperativePanelHandle>(null)
  const [isResizing, setIsResizing] = useState(false)
  const { panels, openPanel, closePanel } = useResizableLayoutContext()

  const isOpen = panels[id] ?? false

  useEffect(() => {
    const panel = panelRef.current

    if (!panel) return

    if (isOpen && panel.isCollapsed()) {
      console.log("isOpen = true and panel is collapsed, now expending the panel")
      panel.expand()
    } else if (!isOpen && !panel.isCollapsed()) {
      console.log("isOpen = true and panel is expended, now collapsing the panel")
      panel.collapse()
    }
  }, [isOpen])

  const resizableHandle = (
    <ResizableHandle
      className={cn(
        "after:bg-border pointer-events-none relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10",
        isOpen && "block aria-[valuenow=0]:hidden",
        side === "left" ? "after:-translate-x-px" : "after:-translate-x-1",
      )}
      onDragging={setIsResizing}
    />
  )

  const handleResize = (size: number) => {
    // Prevent collapsing below minSize unless intended
    if (size < minSize && panelRef.current && isResizing && !collapseOnResize) {
      panelRef.current.resize(minSize)
    }
  }

  return (
    <>
      {side === "right" && resizableHandle}
      <ResizablePanel
        ref={panelRef}
        className={cn(
          isOpen && side === "right" && "border-l",
          isOpen && side === "left" && "border-r",
          !disableTransition && !isResizing && "transition-[flex] duration-300 ease-in-out",
          className,
        )}
        minSize={minSize}
        defaultSize={defaultSize}
        maxSize={maxSize}
        collapsible
        onResize={handleResize}
        onCollapse={() => {
          if (collapseOnResize && isOpen) closePanel(id)
        }}
        onExpand={() => {
          if (collapseOnResize && !isOpen) openPanel(id)
        }}
        data-state={isOpen ? "open" : "closed"}
        {...props}>
        {children}
      </ResizablePanel>
      {side === "left" && resizableHandle}
    </>
  )
}

ResizableLayoutPanel.displayName = "ResizableLayoutPanel"

/* -------------------------------------------------------------------------- */
/*                           ResizableLayoutContent                           */
/* -------------------------------------------------------------------------- */

const ResizableLayoutContent = ({
  defaultSize = 75,
  minSize = 70,
  maxSize = 100,
  className,
  disableTransition = false,
  ...props
}: React.ComponentProps<typeof ResizablePanel> & {
  disableTransition?: boolean
}) => {
  return (
    <ResizablePanel
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      className={cn(!disableTransition && "transition-[flex] duration-300 ease-in-out", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                           ResizableLayoutTrigger                           */
/* -------------------------------------------------------------------------- */

type ResizableLayoutTriggerProps = {
  id: string
} & React.ComponentProps<typeof Button>

const ResizableLayoutTrigger = ({ id, onClick, children, ...props }: ResizableLayoutTriggerProps) => {
  const { panels, togglePanel } = useResizableLayoutContext()
  const isOpen = panels[id] ?? false
  const buttonContent = isOpen ? <PanelLeftClose /> : <PanelLeftOpen />

  return (
    <Button
      onClick={(e) => {
        onClick?.(e)
        togglePanel(id)
      }}
      size="icon"
      data-state={isOpen ? "open" : "closed"}
      {...props}>
      {children ? children : buttonContent}
    </Button>
  )
}

/* -------------------------------------------------------------------------- */
/*                      ResizableLayoutOpen / Close                           */
/* -------------------------------------------------------------------------- */

type ResizableLayoutActionProps = {
  id: string
  asChild?: boolean
} & React.ComponentProps<"button">

const ResizableLayoutOpen = ({ id, onClick, asChild = false, ...props }: ResizableLayoutActionProps) => {
  const Comp = asChild ? Slot : "button"
  const { openPanel } = useResizableLayoutContext()

  return (
    <Comp
      onClick={(e) => {
        onClick?.(e)
        openPanel(id)
      }}
      {...props}
    />
  )
}

const ResizableLayoutClose = ({ id, onClick, asChild, ...props }: ResizableLayoutActionProps) => {
  const Comp = asChild ? Slot : "button"
  const { closePanel } = useResizableLayoutContext()

  return (
    <Comp
      onClick={(e) => {
        onClick?.(e)
        closePanel(id)
      }}
      {...props}
    />
  )
}

export {
  ResizableLayoutClose,
  ResizableLayoutContent,
  ResizableLayoutGroup,
  ResizableLayoutOpen,
  ResizableLayoutPanel,
  ResizableLayoutProvider,
  ResizableLayoutTrigger,
}
