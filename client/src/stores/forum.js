import { defineStore } from "pinia";
 import { axiosIns } from "../api/axios.js";
 import { getAccessToken } from "../utils/config.js";
 import { getId } from "../utils/getInfoUser.js";
 import API_ENDPOINTS from "../api/api.js";
  
export const useForumStore = defineStore({
  id: "forum",
  state: () => ({
    error: true,
    listPost: [],
    totalPages: null,
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
            const config = getAccessToken();
            console.log(_class);
          const posts = await axiosIns.get(`http://localhost:8000/post/list/${_class}`, config); 
          this.listPost = posts.data.postList;
          console.log(this.listPost);
        } catch (error) {
            console.log(error);   
            this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
        }
    },
    async getPostsPerPage (_class, page) {
      try {
          const config = getAccessToken();
         const res = await axiosIns.get(`http://localhost:8000/posts/per-page/${_class}?page=${page}`, config); 
         console.log(res.data.list);
        this.listPost = res.data.list.posts;
        this.totalPages = res.data.list.totalPages;
        console.log(this.listPost);
        return res.data.list;
      } catch (error) {
          console.log(error);   
          this.errorMsg = true;
      setTimeout(() => (this.errorMsg = false), 3000);
      }
  },
    async addPost(postContent) {
      try {
        const config = getAccessToken();
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
    async deletePost(id, _class, page) {
      try {
        const config = getAccessToken();
          
        const deletePost = await axiosIns.delete(`http://localhost:8000/post/delete/${id}?userId=${this.userId}`, config)

        console.log(deletePost); 

        this.getPostsPerPage(_class, page); 
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
        const config = getAccessToken();
        const updatePost = await axiosIns.put(`http://localhost:8000/post/edit/${id}`, postDetails, config);
        return updatePost;
      } catch (error) {
        console.log(error);
      }
    },
    async getPostAndComment(id)  { 
        try {
          const config = getAccessToken();

          const postDetails = await axiosIns.get(`http://localhost:8000/comment/post/${id}`, config); 
          this.post = postDetails.data.commentAndPost.post;
          this.comments = postDetails.data.commentAndPost.comments;
        } catch (error) {
            console.log(error); 
        }
    },
    async addComment(id, content) {
      try {
        const config = getAccessToken();

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
        const config = getAccessToken();

          const deleteComment = await axiosIns.delete(`http://localhost:8000/post/comment/delete/${id}`, config);

          console.log(deleteComment);

          this.getPostAndComment(postId);
      } catch (error) {
        console.log(error);
        
      }
    },
    async editComment(id, comment, username) {
      try {
        const config = getAccessToken();

        const edit = await axiosIns.put(`http://localhost:8000/post/comment/edit/${username}/${id}`, 
        comment
        , config);

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        console.log(edit);  
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async viewCommentById(commentId) {
      try {
        const config = getAccessToken();

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