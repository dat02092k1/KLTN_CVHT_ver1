import { defineStore } from "pinia";
 import axios from "axios";
 import { axiosIns } from "../api/axios.js";
 import { getAccessToken } from "../utils/config.js";
 import { getId } from "../utils/getInfoUser.js";
 import { sendNoti } from "../socket/socket.js";

export const useForumStore = defineStore({
  id: "forum",
  state: () => ({
    error: true,
    listPost: [],
    post: null,
    comments: [],
    getComment: [],
    userId: getId(),
    successMsg: false,
    errorMsg: false,
  }),
  getters: {
  },
  actions: {
    async getListPosts (_class) {
        try {
            const accessToken = window.localStorage.getItem("token");
            const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          
          const posts = await axiosIns.get(`http://localhost:8000/post/list/${_class}`, config); 
          this.listPost = posts.data.postList;
        } catch (error) {
            console.log(error);   
            this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
        }
    },
    async addPost(postContent) {
      try {
        const accessToken = window.localStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          console.log(postContent);
        const post = await axiosIns.post("http://localhost:8000/post/create", postContent, config)
         
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error); 
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async deletePost(id) {
      try {
        const accessToken = window.localStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          
        const deletePost = await axiosIns.delete(`http://localhost:8000/post/delete/${id}`, config)

        console.log(deletePost); 

        this.getListPosts(); 
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async updatePost(id, postDetails) {
      try {
        const accessToken = window.localStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

        const updatePost = await axiosIns.put(`http://localhost:8000/post/edit/${id}`, postDetails, config);

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        console.log(updatePost);  
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getPostAndComment(id)  { 
        try {
            const accessToken = window.localStorage.getItem("token");
            const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

          const postDetails = await axiosIns.get(`http://localhost:8000/comment/post/${id}`, config); 
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
        const accessToken = window.localStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
       

       const comment = await axiosIns.post(`http://localhost:8000/post/comment/create/${id}`, 
       {
        content: content
       }
       ,config);
       console.log(comment.data.comment); 

       this.comments.push(comment.data.comment);
       console.log(this.comments);
      //  this.$forceUpdate();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(id, postId) {
      try {
        const accessToken = window.localStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

          const deleteComment = await axiosIns.delete(`http://localhost:8000/post/comment/delete/${id}`, config);

          console.log(deleteComment);

          this.getPostAndComment(postId);
      } catch (error) {
        console.log(error);
        
      }
    },
    async editComment(id, comment, username) {
      try {
        const accessToken = window.localStorage.getItem("token");
          console.log(comment);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          console.log(username);
        const edit = await axiosIns.put(`http://localhost:8000/post/comment/edit/${username}/${id}`, 
        // {
        //   content: comment
        //  }
        comment
        , config);

        console.log(edit);  
      } catch (error) {
        console.log(error);
      }
    },
    async viewCommentById(commentId) {
      try {
        const accessToken = window.localStorage.getItem("token");
          
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };

        const comment = await axiosIns.get(`http://localhost:8000/post/comment/view/${commentId}`, config);

        console.log(comment);
        this.getComment = comment;
      } catch (error) {
        console.log(error);
      }
    },
    async getListPostOfUser(page) {
      const config = getAccessToken();
      const userId = getId();

      const response = await axiosIns.get(`http://localhost:8000/list/${userId}?page=${page}`, config); 

      return response.data;
    }  
  },
});