import { readFileSync } from 'node:fs'

const dataDir = new URL('../data', import.meta.url)

export function getMarkdownDirectory() {
  return dataDir
}

export function readMarkdownForName(name: string): string | null {
  try {
    return readFileSync(new URL(name, dataDir), 'utf8')
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error
    }
    return null
  }
}
