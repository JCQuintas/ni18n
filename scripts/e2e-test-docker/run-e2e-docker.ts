import { existsSync } from 'fs'
import { join } from 'path'
import { spawnChild } from './spawn-child'

type RunE2EDocker = {
  exampleFolder: string
  build: boolean
  immediate?: boolean
}

export const runE2EDocker = async ({
  exampleFolder,
  build,
  immediate,
}: RunE2EDocker): Promise<string> => {
  if (existsSync(join(process.cwd(), 'examples', exampleFolder))) {
    immediate && console.log('Building docker file.')
    const sha = await spawnChild('docker', [
      'build',
      '--build-arg',
      `EXAMPLE_FOLDER=${exampleFolder}`,
      '--build-arg',
      `INIT_COMMAND=${build ? 'start' : 'dev'}`,
      `-t`,
      `${exampleFolder}:${build ? 'build' : 'no-build'}`,
      '-q',
      '.',
    ])

    immediate && console.log('Running E2E tests.')

    const env = immediate ? [undefined] : ['-e', 'WAIT_TIME=1500']

    await spawnChild(
      'docker',
      ['run', '--rm', ...env, sha].filter(Boolean) as string[],
      immediate,
    )
    return exampleFolder
  } else {
    throw new Error(`Example folder '${exampleFolder}' does not exist.`)
  }
}
