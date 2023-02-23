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
                <li @click="getMessage(user._id)" class="my-3 text-center cursor-pointer hover:bg-[#5b6ed8]">{{ filterDuplicate(user.members, getUsername) }}</li>

            </ul>
        </div>
        <div class="message col-span-8">
            <div class="text-center"> <h2>Username</h2></div>
            <div class="flex flex-col overflow-y-scroll">
                <div>messengers</div>
                <div>messengers</div>
                <div>messengers</div>
                <div>messengers</div>
                <div>messengers</div>
            </div>
            <div>
                <textarea name="" id="" cols="60" rows="3" placeholder="Nhập tin nhắn"></textarea>
                <button>Gửi</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { useChatStore } from "../../../stores/conversation.js";
import { RouterLink, RouterView, useRoute } from "vue-router";

export default {
    data() { 
        return {
            useChat: useChatStore(),
            getUsername: null
        }
    },
    mounted() {
        const username = window.sessionStorage.getItem("username");
        this.useChat.getConversation(username);
        this.getUsername = username;
    },
    methods: {         
        filterDuplicate(arr, username) {
            return arr.find((another) => another !== username)
        },
        getMessage(id) {
            console.log(id);
        }
    }
}
</script>
<style scoped>
.chat-container {
    height: 500px;
    overflow-y: scroll;
}
</style>