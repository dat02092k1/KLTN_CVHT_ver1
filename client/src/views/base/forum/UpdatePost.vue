<template>
    <div>
      <NavTitle />
      <div>
        <div class="post" v-if="useForum.post">
          <div class="forum-item w-[80%] rounded-md mx-auto bg-[#fff]">
            <div class="flex flex-col my-3">
              <label class="font-medium text-base" for="">title</label>
              <span>
                <input type="text" v-model="this.post.title" >
              </span>
            </div>
  
                <div class="flex flex-col my-3">
                    <label class="font-medium text-base">
                 username: 
                </label>

               <span> <input type="text" v-model="this.post.username"></span>
                </div>
  
                <div class="flex flex-col my-3">
                  <label class="font-medium text-base" for="">Class:</label>
                  <span class="">
                    <input type="text" v-model="this.post._class">
                  </span>
                </div>
              
  
            
            <div>
              <div class="font-medium text-base">Nội dung:</div>
              <div>
               <textarea name="" id="" cols="60" rows="5" v-model="this.post.content"></textarea>
              </div>
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
  import NavTitle from "../NavTitle.vue";
  import { useForumStore } from "../../../stores/forum.js";
  import { RouterLink, RouterView, useRoute } from "vue-router";
  export default {
    data() {
      return {
        useForum: useForumStore(),
        id: useRoute().params.id,
        post: {
         title: "",
         username: "", 
         content: "",
         _class: ""
        }
      };
    },
    async mounted() {
      await this.useForum.getPostAndComment(this.id);
      this.post = this.useForum.post;
      console.log(this.post);
    },
    methods: {
      editPost() {
        console.log(this.post);
        this.useForum.updatePost(this.id, this.post);
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
  