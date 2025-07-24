import fs from "fs"

export function getSourceCode(url: string): string {
  try {
    return fs.readFileSync(url, "utf8")
  } catch (error) {
    console.error(`Failed to load source code for url ${url}:`, error)
    return `Error loading source code for ${url}`
  }
}
