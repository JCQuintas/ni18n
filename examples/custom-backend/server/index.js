const http = require('http')
const fs = require('fs')

const languages = ['en', 'es', 'pt']
const namespaces = ['alternate', 'home', 'translation']

const resources = languages
  .map((language) => namespaces.map((namespace) => `/${language}/${namespace}`))
  .flat()

const server = http.createServer((req, res) => {
  if (resources.includes(req.url)) {
    const readStream = fs.createReadStream(`server/locales${req.url}.json`)
    res.writeHead(200, { 'Content-type': 'text/json' })
    readStream.pipe(res)
  } else {
    res.writeHead(404, 'Not Found', { 'Content-type': 'text/plain' })
    res.end('Not Found\r\n')
  }
})

server.listen(7777, '0.0.0.0')
console.log('server listening on 0.0.0.0:7777, url: http://localhost:7777')
