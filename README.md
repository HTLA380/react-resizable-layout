# React Resizable Layout

A resizable and collapsible layout component for React, built with `react-resizable-panels`. It's designed to provide a smooth, persistent, and SSR-friendly user experience.

![Demo](./public/images/dark/resizable-layout-01.png)

## Features

- **SSR-Friendly**: Built with server-side rendering in mind to prevent layout shifts and hydration mismatches.
- **Persistent State**: Remembers panel sizes and their collapsed/expanded state by saving them to cookies.
- **Collapsible Panels**: Allows users to toggle panels open or closed with ease.
- **Simple API**: Provides a straightforward API for controlling panels from anywhere in your application.
- **Smooth Animations**: Includes clean transitions for resizing and collapsing panels.

## Installation

You can add this component to your project using the `shadcn/ui` CLI:

```bash
pnpm dlx shadcn@latest add https://react-animated-resizable-layout.vercel.app/registry/resizable-layout.json
```

For other package managers, simply replace `pnpm` with `npx`, `yarn`, or `bunx`.

For manual installation instructions, please refer to the [official documentation](https://react-animated-resizable-layout.vercel.app/).

## Usage

Here is a basic example of how to implement a server-rendered resizable layout.

```tsx
import {
  ResizableLayoutContent,
  ResizableLayoutGroup,
  ResizableLayoutPanel,
  ResizableLayoutProvider,
  ResizableLayoutTrigger,
} from "@/components/resizable-layout"
import { getServerSideResizableLayoutCookieData } from "@/components/resizable-layout/server-utils"

// Define unique IDs for your panels
const LEFT_PANEL_ID = "left-panel"
const RIGHT_PANEL_ID = "right-panel"

export default async function MyPage() {
  // 1. Read layout data from cookies on the server to prevent FOUC.
  const { states: defaultState, sizes: defaultLayout } = await getServerSideResizableLayoutCookieData({
    states: {
      [LEFT_PANEL_ID]: true, // Left panel starts open
      [RIGHT_PANEL_ID]: false, // Right panel starts closed
    },
    // Corresponds to [left, content, right]
    sizes: [25, 75, 0],
  })

  return (
    // 2. Wrap your layout with the provider to manage state.
    <ResizableLayoutProvider initialState={defaultState}>
      <ResizableLayoutGroup
        direction="horizontal"
        // 3. Pass the saved sizes to the group for persistence.
        defaultLayout={defaultLayout}>
        {/* Left Panel */}
        <ResizableLayoutPanel id={LEFT_PANEL_ID} side="left" defaultSize={25}>
          <div className="p-4">
            <h2 className="font-semibold">Left Panel</h2>
          </div>
        </ResizableLayoutPanel>

        {/* Main Content */}
        <ResizableLayoutContent>
          <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-xl font-bold">Main Content</h1>
            <div className="flex gap-2">
              <ResizableLayoutTrigger id={LEFT_PANEL_ID} />
              <ResizableLayoutTrigger id={RIGHT_PANEL_ID} />
            </div>
          </div>
        </ResizableLayoutContent>

        {/* Right Panel */}
        <ResizableLayoutPanel id={RIGHT_PANEL_ID} side="right" defaultSize={25}>
          <div className="p-4">
            <h2 className="font-semibold">Right Panel</h2>
          </div>
        </ResizableLayoutPanel>
      </ResizableLayoutGroup>
    </ResizableLayoutProvider>
  )
}
```

## Documentation

For detailed component APIs, examples, and advanced usage, please visit the [full documentation](https://react-animated-resizable-layout.vercel.app/).

## Contributing

This project is open source and contributions are welcome. If you have an issue, question, or pull request, please feel free to open one.

This project is licensed under the **MIT License**.

## A Note from the Creator

This project was built out of a passion for creating useful tools for the developer community. I'm based in Myanmar, where international payment platforms like "Buy Me a Coffee" aren't available.

If you are from my country and would like to show your support, it would be greatly appreciated. Thank you for your encouragement!

**KBZ Pay:** `09756302537` (Htet Aung Lin)
