export const RESIZABLE_LAYOUT_COOKIE_NAME = "resizable_layout"
export const RESIZABLE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface ResizableLayoutCookieData {
  states: Record<string, boolean>
  sizes: number[]
}
