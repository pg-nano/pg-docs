import { REPO_ORG, REPO_NAME, dataDir, REPO_REF } from './constants.js'
import { parallel } from 'radashi'
import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'

main()

async function main() {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN is not set')
  }

  let files = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'files.json'), 'utf8')
  ) as string[]

  const keywordRegex =
    /\b(functions?|views|indexes|triggers|tutorial|administration|plpgsql)\b/

  files = files.filter(file => {
    // Ignore root files in "content/postgresql/"
    if (file.split('/').length === 3) {
      return false
    }
    if (!path.basename(file).startsWith('postgresql-')) {
      return false
    }
    if (keywordRegex.test(file)) {
      return true
    }
    return false
  })

  console.log(`Processing ${files.length} files`)

  const names = new Set<string>()

  await parallel(20, files, async file => {
    const outName =
      path.basename(file).replace(/(^postgresql-)|((-function)?\.md$)/g, '') +
      '.md'

    if (names.has(outName)) {
      console.log(`Skipping ${outName} because it already exists`)
      return
    }

    names.add(outName)

    const url = `https://raw.githubusercontent.com/${REPO_ORG}/${REPO_NAME}/${REPO_REF}/${file}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    })
    if (!response.ok || !response.body) {
      if (response.status === 403) {
        throw new Error('Rate limit exceeded')
      }
      console.error(`Failed to fetch ${file}: ${response.statusText}`)
      return
    }

    await new Promise<void>((resolve, reject) => {
      Readable.fromWeb(response.body as any)
        .pipe(fs.createWriteStream(path.join(dataDir, outName)), { end: true })
        .on('finish', () => {
          console.log('finish %s', outName)
          resolve()
        })
        .on('error', reject)
    })
  })
}
