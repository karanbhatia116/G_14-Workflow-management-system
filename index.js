const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
});
const pool = require('./db');
var msgs = [];
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('../../public'));
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log('\n');
  socket.on('joined-chat-room', function(msg){
      io.emit("new-connection", msg);
  });
  socket.on('send-chat', function(chat){
    io.emit('receive-chat-msg', chat);
  });
  socket.on('send-notification', (msg)=>{
    io.emit("receive-notification", msg);
  });
  socket.on('disconnecting', ()=>{
    setTimeout(() => socket.disconnect(true), 5000);
    console.log('user disconnected');
  })
});
app.post('/discussion', async(req, res)=>{
    try {
        var obj = req.body;
        const newMessage = await pool.query("INSERT INTO chat(msg, userName, time, room) values($1, $2, $3, $4)", [obj.msg, obj.username, new Date().toUTCString(), obj.room]);
        msgs.push(obj);
        res.status(200).send("message received");
    } catch (error) {
        console.error(error);
    }
    
});
app.get('/discussion', async(req,res)=>{

    const newMessage = await pool.query("SELECT * from chat");
    msgs = newMessage.rows;
    if(msgs.length === 0)
    res.status(200);
    else
        res.status(200).send(msgs);
});
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
