<template>
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

</style>