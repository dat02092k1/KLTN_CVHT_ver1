<template>
  <div>
    <NavTitle :title="pageTitle"/>
    <div class="max-w-[80%]">
      <div class="post flex" v-if="useForum.post">
        <div class="forum-item w-[80%] rounded-md mx-auto">
          <div>
            <h2 class="font-bold text-2xl text-center">
              {{ useForum.post.title }}
            </h2>
          </div>

          <div class="flex justify-between">
            <div>
              <div class="">
               <span class="font-medium text-base">Người đăng: </span> {{ useForum.post.username }}
              </div>

              <div>
               <span class="font-medium text-base">Lớp: </span>
                <span class="font-medium">
                  {{ useForum.post._class }}
                </span>
              </div>
            </div>

            <div>
             <span class="font-medium text-base">Date: </span> {{ formattedDate(useForum.post.createdAt) }}
            </div>
          </div>
          <div>
            <div class="font-medium text-base">Nội dung:</div>
            <div>
              {{ useForum.post.content }}
            </div>
          </div>

          <div v-if="useForum.post.imageUrl">
            <img class="w-[400px]" :src="useForum.post.imageUrl" alt="post image">
          </div>
          <hr />
          <div>
            <i class="fa-regular fa-comment"></i>
            <b> Bình luận</b>
          </div>
          <div class="comment-list mx-auto flex flex-col relative">
            <div
              class="comment-item w-[50%] my-2 flex justify-between relative"
              v-for="(item, index) in useForum.comments"
              :key="index"
            >
              <div>
                <div class="font-medium text-base">
                {{ item.username }}
              </div>
              <div>
                {{ item.content }}
              </div>

              <div class="font-thin text-[10px] absolute right-1 bottom-1">
                {{ formattedDate(item.createdAt) }} 
              </div>
              </div>

              <div v-if="userRole === 'manager' || username === item.username">
                <div  @click="showOptions[index] = !showOptions[index]" class="ml-2">
              <i class="fa-solid fa-ellipsis"></i>
            </div>

            <div v-if="showOptions[index]" class="absolute right-[-8px] top-6 bg-[#f0f2f5] text-xs p-1">
            <div v-if="username === item.username" @click="showEdit = true">
              <router-link :to="{ path: '/student/comment/edit/' + useForum.post._id + '/' + item._id }">Sửa</router-link>
            </div>
            <div @click="deleteFn(item._id, item.postId)">Xóa</div>
          </div>
              </div>
            </div>

          </div>
          <div>
            <div class="flex items-center">
              
              <textarea
                class="p-3 w-[60%] hover:border-[#85bde5] cursor-pointer"
                v-model="this.content"
                id="content"

              ></textarea>

              <button
              @keyup.enter="postComment(useForum.post._id, this.content)"
              @click="postComment(useForum.post._id, this.content)"
              class="bg-[#324f90] text-[#fff] rounded m-2 p-2"
              type="submit"
            >
              Thêm bình luận
            </button>
            </div>
             
          </div>
        </div>

        <EditComment v-if="showEdit"/>
      </div>
      <div v-else>error</div>
    </div>
  </div>
</template>

<script>
import NavTitle from "../NavBar/NavTitle.vue";
import EditComment from "./EditComment.vue";
import { format } from 'date-fns';
import { getRole, getUsername } from "../../../utils/getInfoUser.js";
import { useForumStore } from "../../../stores/forum.js";
import { RouterLink, RouterView, useRoute } from "vue-router";
export default {
  data() {
    return {
      useForum: useForumStore(),
      id: useRoute().params.id,
      post: null,
      comments: [],
      content: "",
      showOptions: [],
      showEdit: false,
      pageTitle: "Thông tin bài đăng",
      userRole: getRole(),
      username: getUsername()
    };
  },
  mounted() {
    this.useForum.getPostAndComment(this.id);
  },
  methods: {
    
    postComment(id, content) {
      this.useForum.addComment(id, content);
      this.content = "";
    },
    handleOptionClick(option) {
      console.log(option)
    },
    deleteFn(id, postId) {
      this.useForum.deleteComment(id, postId); 
    },
    formattedDate(date) {
      const dating = new Date(date);
      return format(dating, 'dd/MM/yyyy');

    }
  },
  components: { NavTitle, EditComment },
};
</script>

<style scoped>
.post-title {
  margin-top: 0;
}

.post-author {
  font-style: italic;
}

.post-content {
  margin-top: 10px;
}

.comments-section {
  margin-top: 20px;
}

#comment-form {
  margin-bottom: 20px;
}

#comment-form label {
  display: block;
}

#comment-form input,
#comment-form textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

#comment-form textarea:focus{
  border: 1px solid #85bde5;
  outline: none;
}

#comment-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

#comment-form button:hover {
  background-color: #0069d9;
}

.comment {
  margin-top: 20px;
  padding: 10px;
  background-color: #f7f7f7;
}

.comment-author {
  font-weight: bold;
}

.comment-text {
  margin-top: 5px;
}

.forum-item {
  border: 1px solid #85bde5;
  padding: 5px 20px;
  height: 400px;
  overflow-y: scroll;
}

.comment-item {
  border: 1px solid #85bde5;
  padding: 5px 20px;
  border-radius: 10px;
}
</style>
