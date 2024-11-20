import { getDirectoryContentViaTreesApi as getDirectoryContent } from 'list-github-dir-content'
import fs from 'node:fs'
import path from 'node:path'
import { REPO_ORG, REPO_NAME, dataDir, REPO_REF } from './constants.js'

main()

async function main() {
  const files = await getDirectoryContent({
    user: REPO_ORG,
    repository: REPO_NAME,
    ref: REPO_REF,
    directory: 'content/postgresql',
  })

  fs.writeFileSync(
    path.join(dataDir, 'files.json'),
    JSON.stringify(files, null, 2)
  )
}
