import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from '../utils/config.js'
export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    accessToken: "",
    friends: [],
    conversation: [], 
    messages: [],
    getToken: getAccessToken
  }),
  getters: {},
  actions: {
    async getConversation(username) {
      const accessToken = window.sessionStorage.getItem("token");
      const config = {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      };

      const conversations = await axios.get(
        `http://localhost:8000/api/conversation/${username}`,
        config
      );
      this.conversation = conversations.data.conversations;      
      console.log(this.conversation) 
      const membersArr = this.conversation.map((obj) => obj.members);
       
      const friends = membersArr
        .flatMap((friend) => friend)
        .filter((friend) => friend !== username);
      this.friends = friends;
       
    },
    async getMessages(conversationId) {
        try {
            const config = getAccessToken();
            
            const messages = await axios.get(`http://localhost:8000/api/message/${conversationId}`, config);
            this.messages = messages.data.messages;
            console.log(this.messages); 
        } catch (error) {
            console.log(error);
        }
    },
    async sendMessage(message) {
        try {
            const config = getAccessToken();

        const msg = await axios.post("http://localhost:8000/api/message/create", message, config);
        console.log(msg);  
        } catch (error) {
            console.log(error);
        }
    }
  },
});
