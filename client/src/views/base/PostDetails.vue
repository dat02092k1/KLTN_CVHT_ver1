<template>
   <div>
    <NavTitle/>
    <div>
      <div class="post flex" v-if="useForum.post">        
        <div class="forum-item  w-[80%] rounded-md   mx-auto">
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
             Class: <span class="font-medium">
              {{ useForum.post._class }}
             </span>
            </div>
            </div>

            <div>
              {{ useForum.post.createdAt }}
              
            </div>
        </div>
        <div>

          <div>
          Nội dung:
          </div>
          <div>
            {{ useForum.post.content }}
          </div>
        </div>
          <hr>
            <div>
              <i class="fa-regular fa-comment"></i>
              <b> Bình luận</b>
            </div>
          <div class="comment-list mx-auto">
      <div class="comment-item w-[50%]    my-2" v-for="(item, index) in useForum.comments" :key="index">
          <div class="font-medium text-base">
            {{ item.username }}
          </div> 
          <div>
            {{ item.content }}
          </div>
      </div>  
    </div>
    <form @submit.prevent="addComment">
          <div>
            <label for="author">Author:</label>
            <input id="author" type="text" >
          </div>
          <div>
            <label for="content">Content:</label>
            <textarea id="content"></textarea>
          </div>
          <button type="submit">Add Comment</button>
        </form>
        </div>
    </div>
    <div v-else>
      error
    </div>
    </div>
     
    
   </div>
  </template>
  
  <script>
  import NavTitle from './NavTitle.vue';
  import { useForumStore } from '../../stores/forum'; 
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  export default {
      data() {
          return {
            useForum: useForumStore(),
            id: useRoute().params.id,
            post: null,
            comments: []
          };
      },
      mounted() {
        this.useForum.getPostAndComment(this.id);
         
      }
      ,
      methods: {
        formattedDate(date) {
          const dat = new Date(dateStr);
          return dat.toLocaleDateString('en-GB');
        }
      },
      components: { NavTitle }
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
}

.comment-item {
  border: 1px solid #85bde5;
  padding: 5px 20px;
  border-radius: 10px;
}
  </style>
  