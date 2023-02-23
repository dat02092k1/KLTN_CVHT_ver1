var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('dotenv').config();
var student = require('./routes/students/students');
var register = require('./routes/auth/register.js');
var login = require('./routes/auth/login.js');
var token = require('./routes/auth/token.js');
var post = require('./routes/posts/post.js');
var comment = require('./routes/comments/comment.js');
var conversation = require('./routes/chat/conversation.js');
var message = require('./routes/chat/message.js');

var cookieParser = require('cookie-parser');
var io = require('socket.io')(9000, {
    cors: {
      origin: "http://127.0.0.1:5173",
    },
  });
const { joinUser, removeUser } = require('./utils/users.js');
var cors = require('cors');


const PORT = process.env.PORT || 8000;
const dbUrl = "mongodb://localhost:27017/CVHT_database";

mongoose
.connect(dbUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },
    (err) => {
        if (err) console.log('error');
        else console.log('db connected');
    })

let thisRoom = "";

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on("join room", (data) => { 

        let newUser = joinUser(socket.id, data.username, data.roomName);

        socket.emit("send data", {
            id: socket.id,
            username: newUser.username,
            roomname: newUser.roomname
        }); 

        thisRoom = newUser.roomname;
        console.log(thisRoom);

        socket.join(newUser.roomname);  
         
        socket.on("chat message", (data) => {
            console.log(data);
    
            io.to(thisRoom).emit("chat message", {
                data: data,
                id: socket.id,
                room: thisRoom
            })
        })
    });

    socket.on("message", (data) => {
        console.log('someon say: ' + data)
    })

});


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", student);  
app.use("/", register);
app.use("/", login);       
app.use("/", post); 
app.use("/", comment);
app.use("/api", conversation);
app.use("/api", message); 
app.listen(PORT, (err) => {
    if (err) console.log('error');
    else console.log(`server listening on ${PORT}`);
})

