import path from 'path'
import { execSync, ExecSyncOptions } from 'child_process'

export const examplesFolder = (segment: string) =>
  path.join(process.cwd(), 'examples', segment)

const targetDirs: string[] = [
  examplesFolder('custom-backend'),
  examplesFolder('custom-language-selection'),
  examplesFolder('custom-location'),
  examplesFolder('simple'),
  examplesFolder('typescript'),
  examplesFolder('cached-translations'),
  process.cwd(),
]

const dirOrRoot = (dir: string) => dir.replace(process.cwd(), '') || '/'

const execOptions = (dir: string): ExecSyncOptions => ({
  cwd: dir,
  stdio: ['ignore', 'pipe', 'ignore'],
})

const main = async () => {
  await Promise.all(
    [...targetDirs, path.join(process.cwd(), 'data', 'example-template')].map(
      (dir) => {
        execSync('ncu -u', execOptions(dir))
        console.log(`Got latest versions: ${dirOrRoot(dir)}`)
      },
    ),
  )

  await Promise.all(
    targetDirs.map((dir) => {
      execSync('yarn', execOptions(dir))
      console.log(`Installed latest versions: ${dirOrRoot(dir)}`)
    }),
  )
}

if (require.main === module) {
  main()
    .then(() => console.log('Success!'))
    .catch((e) => console.error(e))
}
