// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore types are a complete mess
import { MultiSelect, Select } from 'enquirer'

export const userInput = async (
  exampleFolders: string[],
): Promise<string[]> => {
  const mode = await new Select({
    name: 'mode',
    message: 'Choose mode',
    choices: ['all', 'custom'],
  }).run()

  if (mode === 'all') return exampleFolders

  const examples = await new MultiSelect({
    name: 'examples',
    message: 'Choose examples to run',
    choices: exampleFolders,
    multiple: true,
    validate: (value: string[]) =>
      value.length === 0 ? 'Must select at least one option.' : true,
  }).run()

  return examples
}
