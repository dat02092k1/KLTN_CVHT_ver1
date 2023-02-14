import { defineStore } from "pinia";
 import axios from "axios";

export const useForumStore = defineStore({
  id: "forum",
  state: () => ({
    error: true,
    listPost: []
  }),
  getters: {
  },
  actions: {
    async getListPosts (_class) {
        try {
            const accessToken = window.sessionStorage.getItem("token");
            const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          
          const posts = await axios.get(`http://localhost:8000/post/list/${_class}`, config); 
          this.listPost = posts.data.postList;
          console.log(this.listPost);     
          
        } catch (error) {
            console.log(error);   
        }
    }
  },
});