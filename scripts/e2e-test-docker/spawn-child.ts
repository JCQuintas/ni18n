import { spawn } from 'child_process'

export const spawnChild = async (
  command: string,
  args: string[],
  immediate?: boolean,
): Promise<string> => {
  const dockerBuild = spawn(command, args)

  let data = ''
  for await (const chunk of dockerBuild.stdout) {
    const text = `${chunk}`.trim()
    if (
      immediate &&
      text &&
      (text.includes('.spec.ts:') || text.includes(' passed ('))
    ) {
      console.log(text)
    }
    data += text
  }

  let error = ''
  for await (const chunk of dockerBuild.stderr) {
    immediate && console.log(`${chunk}`)
    error += chunk
  }

  const exitCode: number | null = await new Promise((resolve) => {
    dockerBuild.on('close', resolve)
  })

  if (exitCode) {
    throw new Error(error.trim())
  }
  return data.trim()
}
