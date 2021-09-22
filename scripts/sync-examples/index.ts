import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { exampleDataFolder, exampleSchemas, examplesFolder } from './configs'
import { createWriteData } from './create-write-data'
import { getFilesPaths } from './get-file-paths'
import { loadExampleFiles } from './load-example-files'
import { loadFiles } from './load-files'
import { spawnChild } from '../utilities/spawn-child'

const main = async () => {
  const exampleFilePaths = await getFilesPaths(exampleDataFolder)

  const templateSchemas = await Promise.all(
    exampleFilePaths.map((filePath) =>
      loadFiles(path.join(exampleDataFolder, filePath), filePath),
    ),
  )

  const examplesFiles = await Promise.all(
    exampleSchemas.map(loadExampleFiles(exampleFilePaths, examplesFolder)),
  )

  const writeData = examplesFiles
    .map((example) =>
      example.fileSchemas.map(
        createWriteData(examplesFolder, example, templateSchemas),
      ),
    )
    .flat()

  await Promise.all(
    writeData.map(({ path, data }) => promisify(fs.writeFile)(path, data)),
  )

  return Promise.all(
    exampleSchemas.map((example) =>
      spawnChild('yarn', [], false, {
        cwd: path.join(examplesFolder, example.name),
      }),
    ),
  )
}

if (require.main === module) {
  main()
    .then(() => console.log('Success!'))
    .catch((e) => console.error(e))
}
