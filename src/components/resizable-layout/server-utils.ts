"use server"

import { cookies } from "next/headers"
import { RESIZABLE_LAYOUT_COOKIE_NAME, ResizableLayoutCookieData } from "./constants"

/**
 * Reads the resizable layout cookie data from the server-side request headers.
 * This function is intended for server-side usage (e.g., in Next.js Server Components or Route Handlers).
 * @returns The parsed cookie data, or default empty data if not found or invalid.
 */
export async function getServerSideResizableLayoutCookieData(
  defaultData: Partial<ResizableLayoutCookieData> = {},
): Promise<ResizableLayoutCookieData> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(RESIZABLE_LAYOUT_COOKIE_NAME)?.value

  const defaults: ResizableLayoutCookieData = {
    states: defaultData.states ?? {},
    sizes: defaultData.sizes ?? [],
  }

  if (!cookieValue) {
    return defaults
  }

  try {
    const parsedData: ResizableLayoutCookieData = JSON.parse(decodeURIComponent(cookieValue))

    const states = parsedData.states && Object.keys(parsedData.states).length > 0 ? parsedData.states : defaults.states
    const sizes = parsedData.sizes && parsedData.sizes.length > 0 ? parsedData.sizes : defaults.sizes

    return {
      states,
      sizes,
    }
  } catch (error) {
    console.error("Failed to parse server-side resizable layout cookie:", error)
    return defaults
  }
}
