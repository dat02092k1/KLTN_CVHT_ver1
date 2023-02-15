import { defineStore } from "pinia";
 import axios from "axios";

export const useForumStore = defineStore({
  id: "forum",
  state: () => ({
    error: true,
    listPost: [],
    post: null,
    comments: [],
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
           
          
        } catch (error) {
            console.log(error);   
        }
    },
    async getPostAndComment(id)  { 
        try {
            const accessToken = window.sessionStorage.getItem("token");
            const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

          const postDetails = await axios.get(`http://localhost:8000/comment/post/${id}`, config); 
          this.post = postDetails.data.commentAndPost.post;
          this.comments = postDetails.data.commentAndPost.comments;
          console.log(this.post);
          console.log(this.comments);
        } catch (error) {
            console.log(error); 
        }
    }
  },
});