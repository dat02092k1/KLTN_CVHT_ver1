var express = require("express");
var app = express();
var mongoose = require("mongoose");
require("dotenv").config();

var student = require("./routes/students/students");
var register = require("./routes/auth/register.js");
var login = require("./routes/auth/login.js");
var logout = require("./routes/auth/logout.js");
var post = require("./routes/posts/post.js");
var comment = require("./routes/comments/comment.js");
var conversation = require("./routes/chat/conversation.js");
var message = require("./routes/chat/message.js");
var search = require("./routes/search/search.js");
var course = require("./routes/score/course.js");
var score = require("./routes/score/score.js");
var upload = require("./routes/upload/upload.js");
var task = require("./routes/task/task.js");
var notification = require("./routes/notification/notification.js");

var logger = require("./logger/logger.js");
var cookieParser = require("cookie-parser");
var io = require("socket.io")(9000, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

var cors = require("cors");

const PORT = process.env.PORT || 8000;
const dbUrl = "mongodb://localhost:27017/CVHT_database";

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log("error");
    else console.log("db connected");
  }
);

let users = [];

const addUser = (username, socketId) => {
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return users.find((user) => user.username === username);
};

// if(io.sockets._events == undefined) {
//   io.on("connection", (socket) => {
//     //connect
//     console.log("new connection " + socket.id);
  
//     // get username and socket from users
//     socket.on("addUser", (username) => {
//       addUser(username, socket.id);
//       console.log(users);
//       io.emit("getUsers", users);
//     });
  
//     // join room by user's class
//     socket.on("join-room", (roomId) => {
//       console.log(`User joined room ${roomId}`);
//       socket.join(roomId);
//     });
  
//     // leaver room
//     socket.on('leave-room', (roomId) => {
//       console.log(`User left room ${roomId}`);
//       socket.leave(roomId);
//     });
  
//     // send and get message
//     socket.on("sendMessage", ({ username, receiverName, content }) => {
//       console.log(receiverName);
//       const user = getUser(receiverName);
//       console.log("flag user");
//       console.log(user);
//       if (user) {
//         io.to(user.socketId).emit("getMessage", {
//           username,
//           content,
//         });
//       } else {
//         socket.emit("offlineUser", "this user is offline");
//       }
//     });
  
//     // send noti
//     socket.on('send-noti', (notification) => {
//       console.log(notification);
//       const room = notification.room;
//       socket.to(room).emit('receive-noti', notification.noti); 
//     });
  
//     // log out
//     socket.on("logout", (roomId) => {
//       console.log(users);
//       console.log(socket.id);
//       removeUser(socket.id); 
//       socket.leave(roomId);
//       console.log(users);
//   });
  
//     // disconnect
//     socket.on("disconnect", () => {
//       console.log(socket.id + " disconnected");
//       removeUser(socket.id);
  
//       io.emit("getUsers", users);
//     });
//   });
// }

io.on("connection", (socket) => {
  //connect
  console.log("new connection " + socket.id);

  // get username and socket from users
  socket.on("addUser", (username) => {
    addUser(username, socket.id);
    console.log(users);
    io.emit("getUsers", users);
  });

  // join room by user's class
  socket.on("join-room", (roomId) => {
    console.log(`User joined room ${roomId}`);
    socket.join(roomId);
  });

  // leaver room
  socket.on('leave-room', (roomId) => {
    console.log(`User left room ${roomId}`);
    socket.leave(roomId);
  });

  // send and get message
  socket.on("sendMessage", ({ username, receiverName, content }) => {
    console.log(receiverName);
    const user = getUser(receiverName);
    console.log("flag user");
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        username,
        content,
      });
    } else {
      socket.emit("offlineUser", "this user is offline");
    }
  });

  // send noti
  socket.on('send-noti', (notification) => {
    console.log(notification);
    const room = notification.room;
    socket.to(room).emit('receive-noti', notification.noti); 
  });

  // log out
  socket.on("logout", (roomId) => {
    console.log(users);
    console.log(socket.id);
    removeUser(socket.id); 
    socket.leave(roomId);
    console.log(users);
});

  // disconnect
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
    removeUser(socket.id);

    io.emit("getUsers", users);
  });
});

// const corsOptions = {
//     origin: 'http://127.0.0.1:5173',
//     credentials: true
//   };

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", student);
app.use("/", register);
app.use("/api", login);
app.use("/api", logout);
app.use("/", post);
app.use("/", comment);
app.use("/api", conversation);
app.use("/api", message);
app.use("/api", search);
app.use("/api", course);
app.use("/api", score);
app.use("/api", upload);
app.use("/api", task);
app.use("/api", notification);

app.listen(PORT, (err) => {
  if (err) console.log("error");
  else console.log(`server listening on ${PORT}`);
});
