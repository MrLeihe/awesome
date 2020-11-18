const app = require('express')()
const WebSocket = require('ws')
const chalk = require('chalk')

const wss = new WebSocket.Server({
  port: 8000,
})

wss.on('connection', (ws) => {
  console.log('server websocket connection...')
  ws.on('message', (message) => {
    console.log('server receive message...', message)
  })

  ws.send('hello world')
})

console.log(__dirname)
const path = require('path')
console.log(process.cwd())
console.log(__filename)

app.get('/', async (req, res) => {
  res.sendfile(__dirname + '/index.html')
})

app.listen(3000, () => {
  console.log(chalk.green('server listening on 3000'))
})
