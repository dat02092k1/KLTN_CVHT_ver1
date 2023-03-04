<!-- <template>
    <div>
        <form >
            <div>
                <label for="">username</label>
            <input type="text" placeholder="username" v-model="this.comment.username">
            </div>
           <div>
            <label for="">Nội dung bình luận</label>
            <input type="text" placeholder="bình luận" v-model="this.comment.content">
           </div>
        </form>

         
        <router-link :to="{ path: '/student/forum/post/' + id }" class="bg-orange-600 text-[#fff] rounded m-2 p-2" >Quay lại</router-link>
        <button @click="save(id, this.comment.content, this.comment.username)" class="bg-[#324f90] text-[#fff] rounded m-2 p-2">Lưu</button>
    </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useForumStore } from "../../../stores/forum.js";

export default {
  data() {
    return {
        postId: useRoute().params.postid,
        id: useRoute().params.id,
        useForum: useForumStore(),
        comment: {
            username: '',
            content: ''
        }
    }
    },
    async mounted() {
        console.log(this.id);
        await this.useForum.getPostAndComment(this.postId);
        this.comment = this.useForum.comments;
        console.log(this.comment);
    },
    methods: {
        save(id, comment, username) {
            console.log(id, comment, username);
            this.useForum.editComment(id, comment, username);
        }
    }
    }
</script>

<style scoped>

</style> -->

<template>
    <div>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
      <a-form-item label="Username" name="username">
          <a-input disabled v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Activity name" name="content">
          <a-input v-model:value="formState.content" />
        </a-form-item>
        
  
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  <script>
  import { defineComponent, onMounted, reactive, ref, toRaw } from 'vue';
  import { RouterLink, RouterView, useRoute } from "vue-router";
import { useForumStore } from "../../../stores/forum.js";
import { getUsername } from "../../../utils/getInfoUser.js";

  export default defineComponent({
    setup() {
      const formRef = ref();
      const formState = reactive({
        username: '', 
        content: ''
      });

      const rules = {
        content: {
          required: true,
          message: 'Please input comment',
        }  
      };
  
      const postId = useRoute().params.postid;
       const commentId = useRoute().params.id; 
       const useForum = useForumStore();
         
       formState.username = getUsername(); 
        
      onMounted(async () => {
        await useForum.viewCommentById(commentId);
        
        formState.content = useForum.getComment.data.comment.content;
        console.log(formState.content)
      } ) 
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            console.log('values', toRaw(formState.content));
            const comment = toRaw(formState.content);
            useForum.editComment(commentId, comment, formState.username); 
          })
          .catch(error => {
            console.log('error', error);
          });
      };
  
      const resetForm = () => {
        formRef.value.resetFields();
      };
  
      return {
        formRef,
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
        formState,
        rules,
        onSubmit,
        resetForm 
      };
    },
  });
  </script>