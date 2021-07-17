import { Command, flags } from '@oclif/command'
import { readdirSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'
import { Listr } from 'listr2'
import { runE2EDocker } from './run-e2e-docker'
import { userInput } from './user-input'

const examples = readdirSync(join(process.cwd(), 'examples'))

const getSelectedExamples = async (argv: string[]): Promise<string[]> => {
  if (argv.length === 0) {
    return await userInput(examples)
  } else {
    if (argv.includes('all')) {
      return examples
    } else {
      return argv.filter((example) => examples.includes(example))
    }
  }
}

class E2ETestsDocker extends Command {
  static strict = false

  static flags = {
    build: flags.boolean({
      char: 'b',
      default: true,
      description: 'Wether to build before running or to run in dev mode.',
      allowNo: true,
    }),
  }

  async run(): Promise<void> {
    const { argv, flags } = this.parse(E2ETestsDocker)
    const build = flags.build
    const exampleFolders = await getSelectedExamples(argv)

    const immediate = exampleFolders.length === 1

    if (immediate) {
      await runE2EDocker({
        exampleFolder: exampleFolders[0],
        build,
        immediate,
      })
        .then((exampleFolder) =>
          console.log(
            chalk.green(`E2E passed for '${exampleFolder}' example.`),
          ),
        )
        .catch((error: Error) => {
          console.error(chalk.red(`${error.message}`))
          process.exitCode = 1
        })
    } else {
      const tasks = new Listr<unknown>(
        exampleFolders.map((folder) => ({
          title: folder,
          task: () =>
            runE2EDocker({ exampleFolder: folder, build, immediate }).catch(
              () => {
                process.exitCode = 1
                throw new Error(
                  `${folder} => run the script again with only ${folder}`,
                )
              },
            ),
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
