<template>
  <div>
    <div class="header-forum">
      <NavTitle/>
      
      
      <div  class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
        <div class="flex justify-end ">
          <router-link to="/student/forum/create" class="bg-[#324f90] py-2 px-3 rounded-md text-[#fff]">
            Thêm bài đăng
          </router-link>
      </div>
      <div>
        <div v-for="(item, index) in useForum.listPost" :key="index" class="forum-item bg-[#ecf2f7] my-3 w-[60%] rounded-md cursor-pointer">
        <div class="flex justify-between relative">
          <div class="font-bold">
           {{ item.title }}
          </div>

          <div @click="showOptions[index] = !showOptions[index]">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
          <div v-if="showOptions[index]" class="absolute right-[-8px] top-6 bg-[#f0f2f5] text-xs p-1">
            <div @click="handleOptionClick('view')">
            <router-link :to="{ path: '/student/forum/post/' + item._id }">
              Xem
            </router-link>
          </div>
            <div @click="handleOptionClick('edit')">Sửa</div>
            <div @click="deletePost(item._id)">Xóa</div>
          </div>
        </div>
        <div>
         {{ item.username }}
        </div>
        <div>
          {{ item._class }}
        </div>     
      </div>
      <hr style="border-top: 1px solid #ddd" /> 
      </div>
    
      
     </div>
    </div>
    <Loading v-if="showLoading"/>
  </div>
</template>

<script>
import NavTitle from './NavTitle.vue';
import Loading from './Loading.vue';

import { RouterLink, RouterView } from "vue-router";
import { useForumStore } from '../../stores/forum'; 

export default {
    data() {
        return {
          useForum: useForumStore(),
          _class: 'K64-C-CLC',
          showOptions: [],
          showLoading: false
        };
    },
    mounted() {
      this.useForum.getListPosts(this._class); 
    }
    ,
    methods: {
      handleOptionClick(option) {
      // Xử lý khi người dùng click vào một option
      console.log(option)
      // ở đây có thể gọi các method tương ứng với option được chọn
      // ví dụ: this.handleViewClick() nếu option là 'view'
      // ẩn các option sau khi người dùng click
    },
    deletePost(id) {
      this.useForum.deletePost(id);
    }
    },
    components: { NavTitle, Loading }
};
</script>

<style scoped>
.forum-list {
  overflow-y: scroll;
  height: calc(100vh - 150px);
}
.forum-item {
  border: 1px solid #85bde5;
  padding: 20px;
}
 
</style>
