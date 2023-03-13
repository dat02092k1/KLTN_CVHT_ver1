<template>
    <div>
      <NavTitle :title="pageTitle"/>
      <div>
        <div class="post" v-if="useForum.post">
          <div class="forum-item w-[80%] rounded-md mx-auto bg-[#fff]">
            <div class="flex flex-col my-3">
              <label class="font-medium text-base" for="">Tiêu đề:</label>
              <span>
                <input type="text" v-model="this.post.title" >
              </span>
            </div>
            
            <div>
              <div class="font-medium text-base">Nội dung:</div>
              <div>
               <textarea name="" id="" cols="60" rows="5" v-model="this.post.content"></textarea>
              </div>
            </div>
            
            <div class="flex">
              <div>
              <label class="font-medium text-base" for="">Ảnh</label>
             <img :src="this.post.imageUrl" alt="">
            </div>
            <div>
              <button @click="deleteImage" class="bg-red-500 my-6 ml-2 rounded text-[#ffffff] p-2" v-if="this.post.imageUrl">Xóa ảnh</button>
            </div>
            </div>

            <div class="flex flex-col ">
              
              <input type="file" @change="uploadImage">

            </div>
            
          </div>

          <div class="text-center">
            <button @click="editPost" class="bg-[#324f90] text-[#fff] rounded m-2 p-2">Lưu</button>
          </div>
        </div>
        <div v-else>error</div>
      </div>
    </div>
  </template>
  
  <script>
  import NavTitle from "../NavBar/NavTitle.vue";
  import { useForumStore } from "../../../stores/forum.js";
  import { useImgStore } from "../../../stores/upload.js";

  import { RouterLink, RouterView, useRoute } from "vue-router";
  import { getId, getUsername, getClass } from "../../../utils/getInfoUser";

  export default {
    data() {
      return {
        useForum: useForumStore(),
        id: useRoute().params.id,
        post: {
         userId: "",
         title: "",
         content: "",
         username: "",    
         _class: "",
         imageUrl: "" 
        },
        pageTitle: "Edit bài đăng",
        useImg: useImgStore() 
      };
    },
    async mounted() {
      await this.useForum.getPostAndComment(this.id);
      this.post = this.useForum.post;
      
      // this.post._class = getClass(); 
      console.log(this.post);
    },
    methods: {
      editPost() {
        console.log(this.post);
        this.useForum.updatePost(this.id, this.post);
      },
      async uploadImage(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const img = await this.useImg.uploadImg(formData);
      this.post.imageUrl = img;
      console.log(this.post.imageUrl);
      },
      deleteImage() {
        this.post.imageUrl = "";
      }
    },
    components: { NavTitle },
  };
  </script>
  
  <style scoped>
  
  .forum-item {
    border: 1px solid #85bde5;
    padding: 5px 20px;
    height: 400px;
    overflow-y: scroll;
  }
  
  input, textarea {
    border-radius: 4px;
    padding: 8px;
    border: 1px solid gray;
  }

  </style>
  