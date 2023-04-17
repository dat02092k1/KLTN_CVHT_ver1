const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
const PORT = process.env.PORT || 5000;

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

io.on("connection", (socket) => {
  //connect
  console.log("new connection " + socket.id);

  socket.emit("welcome", 'heh');

  // get username and socket from users
  socket.on("addUser", (username) => {
    addUser(username, socket.id);
    console.log(users);
    io.emit("getUsers", users);
  });

  // join room by user's class
  socket.on("join-room", (roomId) => {
    console.log('day la room'); 
    console.log((roomId)); 
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
      console.log('onl')
      console.log('send msg flagging');
      io.to(user.socketId).emit("getMessage", {
        username,
        content,
      });
    } else {
      console.log('offline')
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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));