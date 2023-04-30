<template>
  <div class="chat-container p-6">
    <div
      class="chat-room flex justify-between bg-[#007aff] text-[#fff] p-3 rounded"
    >
      <div>
        <h2 class="text-[#fff] text-base">Chat Room</h2>
      </div>
      <div>
        <button>UET chat</button>
      </div>
    </div>
    <div class="chat-zone grid grid-cols-12 gap-4 bg-[#fff]">
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
          <div class="text-center">
            <h2 class="text-[#fff] text-xs">Trò chuyện gần đây</h2>
          </div>

          <ul v-for="(user, index) in useChat.conversation" :key="index">
            <li
              @click="getMessage(user._id, user.members)"
              class="my-3 text-center p-1 cursor-pointer hover:bg-[#007aff]"
            >
              {{
                this.userNames[filterDuplicate(user.members, getUsername)]
              }}
              ({{ filterDuplicate(user.members, getUsername) }} )
            </li>
          </ul>
        </div>

        <div v-show="selectedOption === 2">
          Danh mục người dùng:
          <div v-for="(user, index) in users" :key="index">
            <div
              @click="handleConversation(user.userId)"
              class="text-center my-2 cursor-pointer hover:bg-[#2064ad] p-1"
            >
              {{ user.name }} ({{ user.userId }})
            </div>
          </div>
        </div>
      </div>
      <div
        ref="scrollArea"
        class="message-area col-span-8 rounded"
        @scroll="onScroll"
      >
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
            <div class="break-all max-w-[150px] relative">
              <span
                @mouseover="hoveredMessage = message"
                @mouseout="hoveredMessage = null"
              >
                {{ message.content }}
              </span>
              <span class="date" v-show="message === hoveredMessage">
                {{ formatDate(message.createdAt) }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex gap-1 mx-2">
          <textarea
            name=""
            id=""
            cols="60"
            rows="3"
            v-model="this.content"
            placeholder="Nhập tin nhắn"
            @keyup.enter="sendMessage"
            class="rounded p-1 w-full"
            required
          ></textarea>
          <button @click="sendMessage">
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
    <a-alert
      v-show="this.msgNoti === 'true'"
      message="Có tin nhắn mới"
      type="info"
      show-icon
    />

    <Spinner v-show="this.isLoading" />
  </div>
</template>

<script>
import { useChatStore } from "../../../stores/conversation.js";
import { useStudentStore } from "../../../stores/student.js";
import { addUser, welcome, getUsersOnl, offlineUser, getMessages, sendMessage, removeListener } from "../../../socket/socket-client.js";
import { getUsername } from "../../../utils/getInfoUser.js";
import { RouterLink, RouterView, useRoute } from "vue-router";
import axios from "axios";
import Spinner from "../Spinner/Spinner.vue";
import { notification } from 'ant-design-vue';
import { h } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';

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
      useStudent: useStudentStore(),
      userNames: {},
      isConnected: false,
      showDate: false,
      hoveredMessage: null
    };
  },
  async mounted() {
    this.users = await this.useStudent.getStudentsInClass();
    this.isConnected = true;
    // const username = window.localStorage.getItem("username");
     welcome();
    // this.useChat.getConversation(username);
    this.getUsername = getUsername();
    this.isLoading = false;

    this.getConversations(this.getUsername);

    getUsersOnl();
    console.log(this.members);
    // getMessages(() => this.members, this.getUsername, () => this.useChat.messages, data => this.popupMsg(data));

    offlineUser((data) => console.log(data));
  },
  beforeUnmount() {
    this.isConnected = false;
     removeListener(); 
  },
  watch: {
    isConnected(newVal) {
      if (newVal) {
        console.log(newVal);
      getMessages(() => this.members, this.getUsername, () => this.useChat.messages);
    }
    }
  },
  methods: {
    filterDuplicate(arr, username) {
      const otherUsername = arr.find((another) => another !== username);
      return otherUsername;
    },
    getMessage(id, mem) {
      this.conversationId = id;
      this.members = mem;
      console.log(this.members);
      this.currentPage = 2;
      this.receiver = this.filterDuplicate(mem, this.getUsername);

      console.log(this.conversationId, this.receiver);
      console.log(id);
      this.useChat.getMessages(id);
    },
    sendMessage() {
      if (this.content === "") {
        alert('Chưa điền tin nhắn');
        return;
      }
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
      sendMessage(this.getUsername, receiver, this.content);

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
      this.names = await this.getUserNames(this.useChat.conversation, username);
      console.log(this.names);
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

  // const names = {};

  for (const username of usernames) {
    try {
      const response = await axios.get(`http://localhost:8000/student/get-details/${username}`);

      const user = response.data.students;

      this.userNames[user.userId] = user.name;
    } catch (error) {
      console.error(error);
    }
  }

    },
    popupMsg(data) {
      notification.open({
        message: 'Tin nhắn mới',
        description: data,
        icon: () => h(SmileOutlined, {
          style: 'color: #108ee9',
        }),
      });
    },
    formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
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

.date {
  font-size: 12px;
  background-color: #4b4343;
  color: #fff;
  padding: 4px 8px;
  position: absolute;
  bottom: -50px;
  width: 80px;
  left: 0;
  z-index: 1;
  border-radius: 4px;
}
</style>
