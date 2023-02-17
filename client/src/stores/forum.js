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
    async addPost(postContent) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

        const post = axios.post("http://localhost:8000/post/create", postContent, config)
      } catch (error) {
        console.log(error); 
      }
    },
    async deletePost(id) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          
        const deletePost = axios.delete(`http://localhost:8000/post/delete/${id}`, config)

        console.log(deletePost); 

        this.getListPosts(); 
      } catch (error) {
        console.log(error);
      }
    },
    async updatePost(id, postDetails) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

        const updatePost = await axios.put(`http://localhost:8000/post/edit/${id}`, postDetails, config);

        console.log(updatePost);  
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
    },
    async addComment(id, content) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
       

       const comment = await axios.post(`http://localhost:8000/post/comment/create/${id}`, 
       {
        content: content
       }
       ,config);
       console.log(comment.data.comment); 

       this.comments.unshift(comment.data.comment);
       console.log(this.comments);
       this.$forceUpdate();
      } catch (error) {
        console.log(error);
      }
    },
  },
});