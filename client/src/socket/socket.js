import io from 'socket.io-client';

const socket = io('http://localhost:9000');

export const welcome = () => {
    socket.on("welcome", (msg) => console.log(msg));
}

export const addUser = (username) => {
    socket.emit("addUser", username);
}

export const getUsersOnl = () => {
    socket.on("getUsers", (users) => console.log(users));
}

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

export const offlineUser = () => {
    socket.on("offlineUser", (data) => console.log(data));
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
