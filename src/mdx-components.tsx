import { Step, Steps } from "fumadocs-ui/components/steps"
import * as TabsComponents from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { BlockViewer } from "@/components/block-viewer"
import {
  Tabs as UITabs,
  TabsContent as UITabsContent,
  TabsList as UITabsList,
  TabsTrigger as UITabsTrigger,
} from "@/components/ui/tabs"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    UITabs,
    UITabsList,
    UITabsTrigger,
    UITabsContent,
    Steps,
    Step,
    BlockViewer,
    Accordions,
    Accordion,
    ...TabsComponents,
    ...components,
  }
}
