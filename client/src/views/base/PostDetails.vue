<template>
  <div>
    <NavTitle />
    <div>
      <div class="post flex" v-if="useForum.post">
        <div class="forum-item w-[80%] rounded-md mx-auto">
          <div>
            <h2 class="font-bold text-2xl text-center">
              {{ useForum.post.title }}
            </h2>
          </div>

          <div class="flex justify-between">
            <div>
              <div class="font-medium text-base">
                {{ useForum.post.username }}
              </div>

              <div>
                Class:
                <span class="font-medium">
                  {{ useForum.post._class }}
                </span>
              </div>
            </div>

            <div>
              {{ useForum.post.createdAt }}
            </div>
          </div>
          <div>
            <div>Nội dung:</div>
            <div>
              {{ useForum.post.content }}
            </div>
          </div>
          <hr />
          <div>
            <i class="fa-regular fa-comment"></i>
            <b> Bình luận</b>
          </div>
          <div class="comment-list mx-auto flex flex-col ">
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
              </div>

              <div>
                <div  @click="showOptions[index] = !showOptions[index]" class="ml-2">
              <i class="fa-solid fa-ellipsis"></i>
            </div>

            <div v-if="showOptions[index]" class="absolute right-[-8px] top-6 bg-[#f0f2f5] text-xs p-1">
            <div @click="showEdit = true">
              <router-link :to="{ path: '/student/comment/edit/' + useForum.post._id + '/' + item._id }">Sửa</router-link>
            </div>
            <div @click="deleteFn(item._id, item.postId)">Xóa</div>
          </div>
              </div>
            </div>

          </div>
          <div>
            <div class="flex">
              <label class="mr-3" for="content">Comment:</label>
              <textarea
                class="p-3 w-[60%]"
                v-model="this.content"
                id="content"
              ></textarea>
            </div>
            <button
              @keyup.enter="postComment(useForum.post._id, this.content)"
              @click="postComment(useForum.post._id, this.content)"
              class="bg-[#324f90] text-[#fff] rounded m-2 p-2"
              type="submit"
            >
              Add Comment
            </button>
          </div>
        </div>

        <EditComment v-if="showEdit"/>
      </div>
      <div v-else>error</div>
    </div>
  </div>
</template>

<script>
import NavTitle from "./NavTitle.vue";
import EditComment from "../base/forum/EditComment.vue";

import { useForumStore } from "../../stores/forum";
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
      showEdit: false
    };
  },
  mounted() {
    this.useForum.getPostAndComment(this.id);
  },
  methods: {
    formattedDate(date) {
      const dat = new Date(dateStr);
      return dat.toLocaleDateString("en-GB");
    },
    postComment(id, content) {
      this.useForum.addComment(id, content);
      this.content = "";
    },
    handleOptionClick(option) {
      console.log(option)
    },
    deleteFn(id, postId) {
      this.useForum.deleteComment(id, postId); 
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
