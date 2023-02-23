let users = [];

const joinUser = (socketId, username, roomName) => {
    const user = {
        socketId: socketId,
        username: username,
        roomname: roomName
    }

    users.push(user);
    return user;
}

const removeUser = (id) => {
    const getId = users => users.socketId === id;

    const index = users.indexOf(getId);

    if (index !== -1) return users.splice(index, 1)[0];
}

module.exports = {
    joinUser, removeUser
}