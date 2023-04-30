<template>
    <div class="p-3">
      <router-link :to="{ path: '/student/forum/post/' + postId }" class="bg-red-600 text-[#fff] rounded m-2 p-2" >Quay lại</router-link>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="mt-4"
      >
       
        <a-form-item label="Bình luận" name="content">
          <a-input v-model:value="formState.content" />
        </a-form-item>
        
  
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          
          <a-button type="primary" @click="onSubmit">Lưu</a-button>
           
        </a-form-item>
      </a-form>

      <div>
        <a-alert v-show="useForum.successMsg === true" message="Cập nhật thành công" type="success" show-icon />
    <a-alert v-show="useForum.errorMsg === true" message="Cập nhật thất bại" type="error" show-icon />
      </div>
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
        postId,
        useForum
      };
    },
  });
  </script>