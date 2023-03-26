import io from 'socket.io-client';

const socket = io('http://localhost:9000');


// add user to list online by username
export const addUser = (username) => {
    socket.emit("addUser", username);
}

// join room by class of user
export const joinRoom = (roomId) => {
  socket.emit('join-room', roomId);
};

// leave room by class of user (meaning user is offline)
export const leaveRoom = (roomId) => {
  socket.emit('leave-room', roomId);
};

export const logOut = (roomId) => {
  socket.emit('logout', roomId);
};

// return list of users online
export const getUsersOnl = () => {
    socket.on("getUsers", (users) => console.log(users));
}

export const welcome = () => {
  socket.on("welcome", (msg) => console.log(msg));
}

// get messages from another user
export const getMessage = (members, messages) => {
    socket.on("getMessage", (data) => {
        console.log(data);
        if (members.includes(data.username)) {
            messages.push(data);
        }
        else {
          console.log('msg from username: ' + data.username);
          alert('new msg from' + data.username);
        }
         
        console.log(this.members);
      });
}

// send message to specified user
export const sendMessage = (sender, receiver, content) => {
    socket.emit("sendMessage", {
        username: sender,
        receiverName: receiver,
        content: content
      });
}

export const receiveMessage = (callback) => {
    socket.on('receive-message', (message) => {
      callback(message);
    });
  };

// return offline user 
export const offlineUser = (callback) => {
    socket.on("offlineUser", (data) => callback(data));
}

  export const sendNoti = (notification) => {
    socket.emit('send-noti', notification);  
  };

  export const receiveNoti = (callback) => {
    socket.on('receive-noti', (notification) => {
      callback(notification);
    });
  };
  
  export default socket;
