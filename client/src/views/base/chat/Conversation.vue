<!-- <template>
  <div class="chat-container p-6">
    <div
      class="chat-room flex justify-between bg-[#007aff] text-[#fff] p-3 rounded"
    >
      <div>
        <h2>Chat Room</h2>
      </div>
      <div>
        <button>UET chat</button>
      </div>
    </div>
    <div class="chat-zone grid grid-cols-12 gap-4">
      <div class="conversation col-span-4 text-[#ffffff] bg-[#3596ff] rounded">
        <div class="flex justify-center">
          <div class="m-2">
            <button @click="getConversations(currentUser)">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
          </div>
          <div class="m-2">
            <button @click="selectedOption = 2">
              <i class="fa-regular fa-user"></i>
            </button>
          </div>
        </div>

        <div v-if="selectedOption === 1">
          <div class="text-center"><h2>Trò chuyện gần đây</h2></div>

          <ul v-for="(user, index) in useChat.conversation" :key="index">
            <li
              @click="getMessage(user._id, user.members)"
              class="my-3 text-center p-1 cursor-pointer hover:bg-[#5b6ed8]"
            >
               {{ names[filterDuplicate(user.members, getUsername)] }} 
            </li>
          </ul>
        </div>

        <div v-show="selectedOption === 2">
          Sinh viên trong lớp:
          <div v-for="(user, index) in users" :key="index">
            <div
              @click="handleConversation(user.studentId)"
              class="text-center my-2 cursor-pointer hover:bg-[#2064ad] p-1"
            >
              {{ user.name }}
            </div>
          </div>
        </div>
      </div>
      <div ref="scrollArea" class="message-area col-span-8 rounded" @scroll="onScroll">
        <div class="text-center">
          <h2>{{ this.receiver }}</h2>
        </div>
        <div
          class="flex flex-col"
          v-for="message in useChat.messages"
          :key="message._id"
        >
          <div
            :class="{
              'user-message': message.sender === getUsername,
              'receiver-message': message.sender !== getUsername,
            }"
          >
            <div>{{ message.content }}</div>
          </div>
          
        </div>
        <div>
          <textarea
            name=""
            id=""
            cols="60"
            rows="3"
            v-model="this.content"
            placeholder="Nhập tin nhắn"
          ></textarea>
          <button @click="sendMessage">Gửi</button>
        </div>
      </div>
    </div>
    <a-alert v-show="this.msgNoti === 'true'" message="Có tin nhắn mới" type="info" show-icon />

    <Spinner v-show="this.isLoading"/>
  </div>
  
  
</template>

<script>
import { useChatStore } from "../../../stores/conversation.js";
import { useStudentStore } from "../../../stores/student.js";
import { getUsername } from "../../../utils/getInfoUser.js";
import { RouterLink, RouterView, useRoute } from "vue-router";
import axios from "axios";
import Spinner from "../Spinner/Spinner.vue";

import io from "socket.io-client";

export default {
  data() {
    return {
      useChat: useChatStore(),
      getUsername: null,
      content: "",
      conversationId: "",
      socket: null,
      members: [],
      receiver: "Username",
      selectedOption: 1,
      users: [],
      currentPage: null,
      pageSize: 10,
      isLoading: true,  
      msgNoti: false,
      currentUser: getUsername(),
      names: undefined,
      useStudent: useStudentStore()  
    };
  },
  async mounted() {
    this.users = await this.useStudent.getStudentsInClass();
    
    // const username = window.localStorage.getItem("username");
    const username = getUsername();
    this.socket = io("http://localhost:9000");
    this.useChat.getConversation(username);
    this.getUsername = getUsername();
    this.isLoading = false;
    this.socket.on("welcome", (msg) => console.log(msg));
    this.getConversations(this.getUsername);
    this.socket.emit("addUser", this.getUsername);
    this.socket.on("getUsers", (users) => console.log(users));

    this.socket.on("getMessage", (data) => {
      console.log(data + ' data');
      console.log('flag members + cvId: ' + this.members);
       console.log(this.conversationId);
      if (this.members.includes(data.username) && this.members.includes(this.getUsername)) {
        this.useChat.messages.push(data);
      }
      else {
        console.log('msg from username: ' + data.username);
        alert('new msg')
      }
       
      console.log(this.members);
    });

    this.socket.on("offlineUser", (data) => console.log(data));
  },
  created() {},
  methods: {
    filterDuplicate(arr, username) {
      const otherUsername = arr.find((another) => another !== username);
      return otherUsername;
      // const res = await axios.get(`http://localhost:8000/student/get-details/${otherUsername}`)

      // console.log(res.data.students.name);
      // return res.data.students.name;
    },
    getMessage(id, mem) {
      this.conversationId = id;
      this.members = mem;

      this.currentPage = 2;
      this.receiver = this.filterDuplicate(mem, this.getUsername);

      console.log(this.conversationId, this.receiver);
      console.log(id);
      this.useChat.getMessages(id);
    },
    sendMessage() {
      console.log("flag");
      console.log(this.conversationId);
      const message = {
        conversationId: this.conversationId,
        sender: this.getUsername,
        content: this.content,
      };

      const receiver = this.members.find(
        (another) => another !== this.getUsername
      );

      console.log(receiver);
      this.socket.emit("sendMessage", {
        username: this.getUsername,
        receiverName: receiver,
        content: this.content,
      });

      try {
        this.useChat.sendMessage(message);
        this.useChat.messages.push({
          sender: this.getUsername,
          content: this.content,
        });
        this.content = "";
      } catch (error) {
        console.log(error);
      }
    },
    async conversationInfo(sender, receiver) {
      const conversation = await this.useChat.createConversation(
        sender,
        receiver
      );
      return conversation;
    },
    async handleConversation(receiver) {
      try {
        const conversation = await this.useChat.handleConversation(this.getUsername, receiver);
         
        const conversationId = conversation._id;
        const conversationMembers = conversation.members;

      console.log(conversationId, conversationMembers);

      this.getMessage(conversationId, conversationMembers)
      } catch (error) {
        console.log(error);
      }
    },
    findConversation(conversations, sender, receiver) {
      try {
        for (let i = 0; i < conversations.length; i++) {
          const members = conversations[i].members || [];

          if (members.includes(sender) && members.includes(receiver)) {
            return conversations[i]._id;
          }
        }
        return null;
      } catch (error) {
        console.log(error);
      }
    },
    onScroll() {       
      const scrollArea = this.$refs.scrollArea;
        const isTop = scrollArea.scrollTop === 0;
      if (isTop && !this.isLoading) {
        this.isLoading = true;
        this.loadMessages();
      }
    },
    async loadMessages() {
      const response = await this.useChat.loadMessage(this.conversationId, this.currentPage, this.pageSize) ;
      this.currentPage++;
      this.isLoading = false;
    },
    async getConversations(username) {
      await this.useChat.getConversation(username);
      this.selectedOption = 1;
      this.names = await this.getUserNames(this.useChat.conversation, username)
    },
    // Function to get names for all unique usernames in an array of conversations
    async getUserNames(conversations, currentUser) {
      console.log(currentUser);
  const usernames = new Set();

  conversations.forEach((conversation) => {
    conversation.members.forEach((member) => {
      if (member !== currentUser) {
        usernames.add(member);
      }
    });
  });

  const names = {};

  for (const username of usernames) {
    try {
      const response = await axios.get(`http://localhost:8000/student/get-details/${username}`);

      const user = response.data.students;
      names[user.studentId] = user.name;
    } catch (error) {
      console.error(error);
    }
  }
  return names;
}

  },
  components: {
    Spinner
  }
};
</script>
<style scoped>
.chat-zone {
  height: 400px;
}

.conversation {
  height: 400px;
  overflow-y: auto;
}

.conversation ::-webkit-scrollbar {
    width: 0px;
    background: transparent;  
}

.message-area {
  height: 400px;
  overflow-y: auto;
}

.user-message {
  color: #fff;
  text-align: right;
  padding: 8px;
  background-color: #0084ff;
  border-radius: 4px;
  margin: 10px;
  max-width: 60%;
  align-self: flex-end;
}

.receiver-message {
  color: black;
  text-align: left;
  padding: 8px;
  background-color: #eaeaea;
  display: inline-block;
  border-radius: 4px;
  margin: 10px;
  max-width: 60%;
  align-self: flex-start;

}
</style> -->

<template>
  <div>
    conversation
  </div>
</template>