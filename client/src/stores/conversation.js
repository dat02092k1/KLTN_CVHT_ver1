import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from '../utils/config.js'
import { getClass } from '../utils/getInfoUser.js'

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    accessToken: "",
    friends: [],
    conversation: [], 
    messages: [],
    getToken: getAccessToken,
    chats: [],
    newConversation: {
      _id: '',
      members: [],
    }
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
      // console.log(this.conversation) 
      const membersArr = this.conversation.map((obj) => obj.members);
       
      
      const friends = membersArr
        .flatMap((friend) => friend)
        .filter((friend) => friend !== username);
      this.friends = friends;
      // console.log(this.friends);
       
    },
    async getMessages(conversationId) {
        try {
            const config = getAccessToken();
            console.log(conversationId);
            const messages = await axios.get(`http://localhost:8000/api/message-limit/${conversationId}`, config);
            this.messages = messages.data.messages;
            // console.log(this.messages); 
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
    },
    async getListUser() {
      try {
        const config = getAccessToken();
        const _class = getClass();
         
        const users = await axios.get(`http://localhost:8000/student/names/${_class}`, config)

         
        return users.data.names;
        
      } catch (error) {
        console.log(error);
      }
    },
    async createConversation(sender, receiver) {
      try {
        const config = getAccessToken(); 
        const mems = {
          senderId: sender,
          receiverId: receiver
        }
        const conversation = await axios.post("http://localhost:8000/api/conversation/create", mems, config)

            
        this.newConversation._id = conversation.data.conversation._id;
        this.newConversation.members = conversation.data.conversation.members;        
        
        console.log(this.newConversation);
         return this.newConversation;
      } catch (error) {
        console.log(error);
      }
    },
    async loadMessage(conversationId, page, pageSize) {
      try {
        const pageNumber = parseInt(page);
        const size = parseInt(pageSize);
    
        if (isNaN(pageNumber) || isNaN(size)) {
          throw new Error('Invalid page or pageSize');
        }
    
        const accessToken = window.sessionStorage.getItem("token");
        console.log(accessToken);

        const msg = await axios.get('http://localhost:8000/api/message-load',{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            conversationId: conversationId,
            page: pageNumber,
            pageSize: size,
          },
        });
    
        console.log(msg.data.messages);  
        // this.messages =  this.messages.concat(msg.data.messages);
        this.messages.unshift(...msg.data.messages);
        // this.messages.push(msg.data.messages);   
        // console.log(this.messages); 
      } catch (error) {
        console.log(error);
      }
    }
    
  },
});
