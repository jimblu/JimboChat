const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"}});


app.set('view engine', 'ejs')
app.use(express.static('views'));


app.get('/', (req, res) => {
    res.render('index')
  })


io.on('connection', socket => {
    console.log('a user is connected')
    socket.emit('chat-connection', `You are connected`)
    socket.on('chat-message', data => {
        socket.broadcast.emit('chat-message', data)
    })
})

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
  });