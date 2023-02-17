<template>
    <div>
        <NavTitle/>

        <div class="form-post--wrapper m-5">
            <div>
            <router-link to="/student/forum" class="bg-[#324f90] py-2 px-3 rounded-md text-[#fff]">
                Quay lại
            </router-link>
        </div>

        <div class="flex justify-center">
      <div class="">

        <div class="flex-col">
          <label for="title">Title: </label>
          <textarea name="" placeholder="Title" id="title" v-model="this.post.title" cols="30" rows="2"></textarea>
           
        </div>

        <div class="flex">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="this.post.username">
        </div>
        
        <div class="flex">
          <label for="content">Content:</label>
          <textarea id="content" v-model="this.post.content"></textarea>
        </div>
        <div>
          <label for="class">Class:</label>
          <input type="text" id="class" v-model="this.post._class">
        </div>
        <div>
          <button @click="submitPost" class="bg-[#324f90] py-2 px-3 rounded-md text-[#fff]" type="submit">Xác nhận</button>
        </div>
    </div>
    </div>
        </div>
    </div>
  </template>
  
  <script>
  import NavTitle from '../NavTitle.vue';

  import { RouterLink, RouterView } from "vue-router";
  import { useForumStore } from '../../../stores/forum';
  export default {
    data() {
      return {
        post: {
            username: '',
            title: '',
            content: '',
            _class: ''
        },
        useForum: useForumStore(),      
      }
    },
    methods: {
      submitPost() {
        // Handle form submission here
        console.log(this.post);
        this.useForum.addPost(this.post);
      }
    },
    components: { NavTitle }
  }
  </script>
  