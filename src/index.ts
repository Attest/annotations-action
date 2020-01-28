import { Annotations } from '@/annotations'
import { Github } from '@/github'
import { getInputs } from '@/inputs'
import core from '@actions/core'
import fs from 'fs'

async function main(): Promise<void> {
  const { token, title, path } = getInputs()

  const github = new Github(token)

  await github.createCheck(title)

  const file = fs.readFileSync(path)
  const annotations = Annotations.fromJSON(file.toString())

  await github.updateCheckWithAnnotations(annotations)
}

main().catch(error => {
  /* eslint-disable-next-line no-console */
  console.error(error.stack)
  core.setFailed(`annotations-action: ${error.message}`)
})
