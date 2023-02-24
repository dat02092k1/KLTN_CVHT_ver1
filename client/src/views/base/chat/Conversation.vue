<template>
    <div class="chat-container p-6">
        <div class="chat-room flex justify-between bg-[#5b6ef2] text-[#fff] p-3">
            <div>
                <h2>
                    Chat Room
                </h2>
            </div>
            <div>
                <button>
                    UET chat
                </button>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 ">
        <div class="conversation col-span-4 bg-[#697af2]">
            <div class="text-center"><h2>Người dùng</h2></div>

            <ul v-for="(user, index) in useChat.conversation" :key="index">
                <li @click="getMessage(user._id, user.members)" class="my-3 text-center cursor-pointer hover:bg-[#5b6ed8]">{{ filterDuplicate(user.members, getUsername) }}</li>

            </ul>
        </div>
        <div class="message col-span-8">
            <div class="text-center"> <h2>Username</h2></div>
            <div class="flex flex-col " v-for="message in useChat.messages" :key="message._id">
                <div :class="{'user-message': message.sender === getUsername, 'receiver-message': message.sender !== getUsername}">
                    
                        <div>{{ message.content }}</div>
                    </div>
                 
               
            </div>
            <div>
                <textarea name="" id="" cols="60" rows="3" v-model="this.content" placeholder="Nhập tin nhắn"></textarea>
                <button @click="sendMessage">Gửi</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { useChatStore } from "../../../stores/conversation.js";
import { RouterLink, RouterView, useRoute } from "vue-router";
import io from 'socket.io-client';

export default {
    data() { 
        return {
            useChat: useChatStore(),
            getUsername: null,
            content: '',
            conversationId: '',
            socket: null,
            members: [],
        }
    },
    mounted() {
        const username = window.sessionStorage.getItem("username");

        this.socket = io('http://localhost:9000'); 
        this.useChat.getConversation(username);
        this.getUsername = username;

        this.socket.on("welcome", msg => console.log(msg));
         
        this.socket.emit("addUser", this.getUsername);
        this.socket.on("getUsers", users => console.log(1));
       
        this.socket.on("getMessage", data => {
            console.log(data); 
            this.useChat.messages.push(data); 
            console.log(this.useChat.messages)
        })

        this.socket.on("offlineUser", data => console.log(data)); 
    },
    created() {
        
    },
    methods: {         
        filterDuplicate(arr, username) {
            return arr.find((another) => another !== username)
        },
        getMessage(id, mem) {
            this.conversationId = id;
            this.members = mem;
            console.log(this.conversationId, this.members);
            this.useChat.getMessages(id);
        },
        sendMessage() {
            const message = {
                conversationId: this.conversationId,
                sender: this.getUsername,
                content: this.content      
            }

             

            const receiver = this.members.find((another) => another !== this.getUsername); 
             

            this.socket.emit("sendMessage", {
                username: this.getUsername,
                receiverName: receiver,
                content: this.content
            })

            try {
                this.useChat.sendMessage(message); 
                this.useChat.messages.push({
                    sender: this.getUsername,
                    content: this.content
                })
                this.content = '';
            } catch (error) {
                console.log(error);
            } 
        }
    }
}
</script>
<style scoped>
.chat-container {
    height: 500px;
    overflow-y: scroll;
}

.user-message {
    color: #fff;
  text-align: right;
  padding: 8px;
  background-color: #0084ff;
  border-radius: 4px;
  
}

.receiver-message {
    color: #fff;
  text-align: left;
  padding: 8px;
  background-color: #0084ff;
  display: inline-block;
  border-radius: 4px;
}
</style>