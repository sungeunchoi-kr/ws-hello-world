import os from 'os'
import * as ws from 'ws'
import { Server } from 'ws'

function attachEvents(server: Server) {

    server.on('connection', function(socket: ws) {
        socket.on('message', function(msg: string) {
            try {
                let { type } = JSON.parse(msg)
                if (type === 'hello') {
                    socket.send(`Hello world from hostname="${os.hostname}"!`)
                } else {
                    socket.send(`Unrecognized message type "${type}".`)
                }
            } catch(e) {
                socket.send(`Error: ${e.message}`)
            }
        })

        socket.on('close', function() {
        })
    })

}

async function init() {
    const port: number = parseInt(process.env.PORT) || 3000

    console.log(`Starting ws server on port=${port}.`)
    const wss: Server = new ws.Server({ port: port })
    attachEvents(wss)
}

init()
