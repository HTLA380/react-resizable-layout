"use client"

import { RESIZABLE_COOKIE_MAX_AGE, RESIZABLE_LAYOUT_COOKIE_NAME, ResizableLayoutCookieData } from "./constants"

/**
 * Updates the resizable layout cookie with new panel states or sizes.
 * This function is intended for client-side usage.
 * @param options.panelId The ID of the panel to update its state.
 * @param options.isOpen The new open state for the panel.
 * @param options.sizes The new array of sizes for all panels.
 */
export function updateResizableLayoutCookie({
  panelId,
  isOpen,
  sizes,
}: {
  panelId?: string
  isOpen?: boolean
  sizes?: number[]
}) {
  if (typeof document === "undefined") {
    return
  }

  let currentData: ResizableLayoutCookieData = { states: {}, sizes: [] }

  // Read existing cookie data
  const cookieString = document.cookie.split("; ").find((row) => row.startsWith(`${RESIZABLE_LAYOUT_COOKIE_NAME}=`))

  if (cookieString) {
    try {
      const encodedValue = cookieString.split("=")[1]
      currentData = JSON.parse(decodeURIComponent(encodedValue))
      // Ensure states and sizes properties exist
      if (!currentData.states) {
        currentData.states = {}
      }
      if (!currentData.sizes) {
        currentData.sizes = []
      }
    } catch (error) {
      console.error("Failed to parse resizable layout cookie:", error)
      // Fallback to default empty data if parsing fails
      currentData = { states: {}, sizes: [] }
    }
  }

  if (panelId !== undefined && isOpen !== undefined) {
    currentData.states[panelId] = isOpen
  }

  if (sizes !== undefined) {
    currentData.sizes = sizes
  }

  const updatedCookieValue = encodeURIComponent(JSON.stringify(currentData))

  document.cookie = `${RESIZABLE_LAYOUT_COOKIE_NAME}=${updatedCookieValue}; path=/; max-age=${RESIZABLE_COOKIE_MAX_AGE}; SameSite=Lax; Secure`
}
