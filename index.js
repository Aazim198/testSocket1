const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
//attach app to http module
const http = require('http').createServer(app);


//attach http server to the socket io
const io = require('socket.io')(http);


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})

io.on('connection',(socket)=>{
    console.log(`connection started with id:  ${socket.id}`);    
    socket.on('sendMesage',(message,room)=>{
        // io.emit('rxmsg',message);
        // socket.broadcast.emit('rxmsg',message);
        if(room !=""){
            socket.to(room).emit('rxmsg',message);
        }else{
            socket.broadcast.emit('rxmsg',message);
        }
    })
    socket.on('joinTheGroup',(room)=>{
        socket.join(room);
        // socket.in(room).emit('You are in the room',room);
    })
    // socket.on('sendMesage',(message,room)=>{
    //     if(room){
    //         socket.to(room).emit(message);
    //     }else{
    //         socket.broadcast.emit('rxmsg',message);
    //     }
    // })

    // socket.emit('receiveMessage','Hello from server')
    socket.on('disconnect',()=>{
        console.log(`connection closed!!`);    
    })   
})

// app.listen(port,()=>{
//     console.log('Connected on port',port);
// })

http.listen(port,()=>{
    console.log('Connected on port',port);
})