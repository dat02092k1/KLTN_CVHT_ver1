<template>
    <div>
      <NavTitle :title="pageTitle"/>
      
      <div>
        <div class="post flex" v-if="useForum.post">
          <router-link class="mx-6 my-1"  :to="{ path: '/student/forum/posts'}" >
      <button class="bg-[#ef1419] rounded text-[#ffffff] p-2">Quay lại</button>
              </router-link>
         <div class="flex-1">
          <div class="forum-item w-[80%] rounded-md mx-auto bg-[#fff]">
            <div class="flex flex-col my-3">
              <label class="font-medium text-base" for=""> <span class="text-red-600">*</span>Tiêu đề:</label>
              <span>
                <input type="text" v-model="this.post.title" >
              </span>
            </div>
            
            <div>
              <div class="font-medium text-base"><span class="text-red-600">*</span>Nội dung:</div>
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
              <input type="file" @change="uploadImage" accept="image/*">
            </div>

            <Spinner v-show="useImg.loading" />
          </div>

          <div class="text-center">
            <button @click="editPost" class="bg-[#324f90] text-[#fff] rounded m-2 p-2">Lưu</button>
          </div>
         </div>
        </div>
        <div v-else>error</div>
      </div>
    </div>
  </template>
  
  <script>
  import NavTitle from "../NavBar/NavTitle.vue";
  import { useForumStore } from "../../../stores/forum.js";
  import { useUploadStore } from "../../../stores/upload.js";
  import Spinner from '../Spinner/Spinner.vue';
  import { RouterLink, RouterView, useRoute } from "vue-router";
  import { getId, getUsername, getClass } from "../../../utils/getInfoUser";
  import { message } from "ant-design-vue";

  export default {
    data() {
      return {
        useForum: useForumStore(),
        id: useRoute().params.id,
        post: {
         userId: getId(),
         title: "",
         content: "",
         username: "",    
         _class: "",
         imageUrl: "" 
        },
        pageTitle: "Edit bài đăng",
        useImg: useUploadStore() 
      };
    },
    async mounted() {
      await this.useForum.getPostAndComment(this.id);
      this.post = this.useForum.post;
      this.post.userId = getId();
      // this.post._class = getClass(); 
     },
    methods: {
      async editPost() {
        if (this.post.content === "" || this.post.title === "") {
          alert("Chưa điền các trường yêu cầu");
          return;
        }

        const res = await this.useForum.updatePost(this.id, this.post);
        console.log(res);
        if (res.status === 200) {
          setTimeout(() => {
          message.success({
          content: 'Cập nhật thành công!',
          duration: 2,
          });
          }, 1000);
        }
        else {
          setTimeout(() => {
          message.error({
          content: 'Cập nhật thất bại!',
          duration: 2,
          });
          }, 1000);
        }
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
    components: { NavTitle, Spinner },
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
  