<template>
    <div class="flex flex-col items-center  h-[500px]"> 

      <div class="flex flex-col my-7">
        <input type="text" placeholder="username" v-model="this.username">
        <input type="text" placeholder="room" v-model="this.room">
        <button class="bg-blue-500" @click="heh">Send</button>
      </div>


      <ul id="messages" v-for="message in messages" :key="message.id">
        <li>
          {{ message }}
        </li>
      </ul>

      <div class="msg-send" v-show="showMsg">
        <input type="text" placeholder="message" v-model="this.msg">
        <button class="bg-blue-500" @click="sendMsg">Send</button>
      </div>
      
    </div>
  </template>
  
  <script>
import { io, Socket } from 'socket.io-client'
  import { RouterLink, RouterView } from "vue-router";

  export default {
    data() {
      return {
         socket: null, 
         msg: '',
         username: '',
         room: '',
         id: '',
         showMsg: false,
         messages: []
      }
    },
    methods: {    
      heh() {
         this.socket.emit("join room", {
          username: this.username,
          roomName: this.room
         })
        // this.socket.emit("message", this.msg);
         
        this.room = '';
        this.showMsg = true;
      },
      sendMsg() {
        this.socket.emit("chat message", {
          user: this.username,
          message: this.msg
        })

        this.msg = '';                  
      },
      noti(message) {
        this.messages.push(message);
         
      }
    },
    created() {
      this.socket = io('http://localhost:9000');

      this.socket.on('send data', (data) => {
       this.id = data.id;
      console.log(this.id);
      });

      this.socket.on('chat message', (data) => {
        console.log(data);
        
        this.noti(data.data.message);
      })
    }
  }
  </script>
  