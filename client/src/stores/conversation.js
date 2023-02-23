import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    accessToken: "",
    friends: [],
    conversation: [], 
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
  },
});
