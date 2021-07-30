import { URL } from 'url'

const protocol = process.env.PROTOCOL || 'http'
const hostname = process.env.HOST_NAME || 'localhost'
const port = process.env.PORT ?? '3000'

const url = new URL(`${protocol}://${hostname}:${port}`)

export const testUrl = url.toString()
