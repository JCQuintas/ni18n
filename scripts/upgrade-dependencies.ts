import path from 'path'
import { execSync } from 'child_process'

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

const main = async () => {
  await Promise.all(
    [...targetDirs, path.join(process.cwd(), 'data', 'example-template')].map(
      (dir) =>
        execSync('ncu -u', {
          cwd: dir,
        }),
    ),
  )

  await Promise.all(
    targetDirs.map((dir) =>
      execSync('yarn', {
        cwd: dir,
      }),
    ),
  )
}

if (require.main === module) {
  main()
    .then(() => console.log('Success!'))
    .catch((e) => console.error(e))
}
