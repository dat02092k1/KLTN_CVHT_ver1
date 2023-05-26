<template>
   <div>
    <div v-if="state.posts">
    empty
   </div>
    <div>
        <ul>
        <li class="post-item " v-for="post in state.posts" :key="post._id">
            <span>{{ post.title }}</span>
        </li>
      </ul>

      <div class="page-container" v-if="state.totalPages">
        <div v-for="pageNumber in state.totalPages" :key="pageNumber">
          <button @click="fetchPosts(pageNumber)"
          :class="{ active: pageNumber === state.currentPage }">{{ pageNumber }}</button>
        </div>
      </div>
    </div>
   </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import { useForumStore } from "../../../stores/forum.js";
  import { getUsername, getId } from "../../../utils/getInfoUser";
  import { getAccessToken } from "../../../utils/config.js";
  import { axiosIns } from "../../../api/axios.js";

  export default {
    setup() {
      const state = reactive({
        currentPage: 1,
        totalPages: 1,
        posts: []
      });
  
      const useForum = useForumStore();
      const userId = getId();
      const username = getUsername();  
      const config = getAccessToken();

      async function fetchPosts(page) {
        try {
          const res = await useForum.getListPostOfUser(page);
          console.log(res)
          state.currentPage = page;
          state.totalPages = res.list.totalPages;
          state.posts = res.list.posts;
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchPosts(state.currentPage);
  
      return {
        state,
        fetchPosts
      };
    }
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
  }

  .active {
  background-color: yellow;
}
</style>