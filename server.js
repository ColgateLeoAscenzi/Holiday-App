const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {pingInterval: 1000});

var userCount = 0;

app.use("/static", express.static(__dirname+"/static"));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

server.listen(process.env.PORT || 3000, function(){
    console.log("Listening");
});


io.on('connection', function(socket) {
    userCount+=1;
    console.log("Connection!");
    socket.emit("welcome", userCount);
    io.sockets.emit("new-user-join", userCount);

    socket.on('hello', function(data){
        console.log("This user calls themself: "+data+", interesting...");
    });

    socket.on('disconnect', function(){
        userCount-=1;
        console.log("Disconnection");
    });
});
