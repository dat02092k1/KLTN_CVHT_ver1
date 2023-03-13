<template>
    <div class="p-3">
      <router-link :to="{ path: '/student/forum/post/' + postId }" class="bg-orange-600 text-[#fff] rounded m-2 p-2" >Quay lại</router-link>
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

        <a-form-item label="Bình luận" name="content">
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
        userId: '', 
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
         
        
        
      onMounted(async () => {
        await useForum.viewCommentById(commentId);
        formState.userId = useForum.getComment.data.comment.userId;
        formState.content = useForum.getComment.data.comment.content;
        formState.username = useForum.getComment.data.comment.username;
        console.log(formState)
      } ) 
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            console.log('values', toRaw(formState.content));
            const comment = toRaw(formState);
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
        resetForm,
        postId
      };
    },
  });
  </script>