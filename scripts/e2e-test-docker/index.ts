import { Command } from '@oclif/command'
import { readdirSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'
import { runE2EDocker } from './run-e2e-docker'
import { Listr } from 'listr2'

const examples = readdirSync(join(process.cwd(), 'examples'))

const getSelectedExamples = (argv: string[]): string[] => {
  if (argv.includes('all')) {
    return examples
  } else {
    return argv.filter((example) => examples.includes(example))
  }
}

class E2ETestsDocker extends Command {
  static strict = false

  async run(): Promise<void> {
    const { argv } = this.parse(E2ETestsDocker)
    const exampleFolders = getSelectedExamples(argv)

    const immediate = exampleFolders.length === 1

    if (immediate) {
      await runE2EDocker({
        exampleFolder: exampleFolders[0],
        immediate,
      })
        .then((exampleFolder) =>
          console.log(
            chalk.green(`E2E passed for '${exampleFolder}' example.`),
          ),
        )
        .catch((error: Error) => {
          console.error(chalk.red(`${error.message}`))
          console.error(chalk.red(`Build failed with code 1.`))
          process.exitCode = 1
        })
    } else {
      const tasks = new Listr<unknown>(
        exampleFolders.map((folder) => ({
          title: folder,
          task: () =>
            runE2EDocker({ exampleFolder: folder, immediate }).catch(() => {
              throw new Error(
                `${folder} => run the script again with only ${folder}`,
              )
            }),
        })),
        { concurrent: true, exitOnError: false },
      )
      await tasks.run()
    }
  }
}

if (require.main === module) {
  E2ETestsDocker.run()
}
