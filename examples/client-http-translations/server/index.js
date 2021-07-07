const http = require('http')
const fs = require('fs')

const languages = ['en', 'es', 'pt']
const namespaces = ['alternate', 'home', 'translation', 'client']

const resources = languages
  .map((language) => namespaces.map((namespace) => `/${language}/${namespace}`))
  .flat()

const server = http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (resources.includes(req.url)) {
    const readStream = fs.createReadStream(`server/locales${req.url}.json`)
    res.writeHead(200, { ...headers, 'Content-type': 'text/json' })
    readStream.pipe(res)
  } else {
    res.writeHead(404, 'Not Found', {
      ...headers,
      'Content-type': 'text/plain',
    })
    res.end('Not Found\r\n')
  }
})

server.listen(7777, '0.0.0.0')
console.log('server listening on 0.0.0.0:7777, url: http://localhost:7777')
