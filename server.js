const http = require('http')
const app = require('./app')
const socket = require('socket.io')

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port)

const io = socket(server)

io.sockets.on('connection', new_connection)

function test(){
    console.log("Test was called")
}

function new_connection(socket) {

    var room = ""

    socket.join("room")

    socket.to("room").broadcast.emit('new_client', {
        id: socket.id
    })

    socket.to("room").on("pos_update", function(data) {
        socket.broadcast.emit('pos_update', data)
    })

    socket.to("room").on("armVector_update", function(data) {
        socket.broadcast.emit('armVector_update', data)
    })

    socket.to("room").on("bullet_update", function(data) {
        socket.broadcast.emit("bullet_update", data)
    })

    socket.to("room").on("disconnect", function(){
        socket.broadcast.emit('client_disconnect', {
            id: socket.id
        })
    })
}