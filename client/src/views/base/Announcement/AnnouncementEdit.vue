<template>
    <div>
      <NavTitle :title="pageTitle"/>
      <div>
        <div class="post">
          <div class="forum-item w-[80%] rounded-md mx-auto bg-[#fff]">
            <div class="flex flex-col my-3">
              <label class="font-medium text-base" for="">Tiêu đề:</label>
              <span>
                <input type="text" v-model="this.announcement.title" >
              </span>
            </div>

            <div class="">
              <div class="flex flex-col">
              <label class="font-medium text-base" for="">File</label>
              <a :href="this.announcement.fileUrl"> {{ this.announcement.fileUrl }} </a>
             
            </div>
            <div>
              <button @click="deleteImage" class="bg-red-500 my-6 ml-2 rounded text-[#ffffff] p-2" v-if="this.announcement.fileUrl">Xóa file</button>
            </div>
            </div>

            <div class="flex flex-col ">
              
              <input type="file" @change="uploadDocs">

            </div>
            <Loading v-show="useUpload.loading" />
          </div>

          <div class="text-center">
            <button @click="editAnnouncement" class="bg-[#324f90] text-[#fff] rounded m-2 p-2">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavTitle from "../NavBar/NavTitle.vue";
  import { useAnnouncementStore } from "../../../stores/announcement.js";
  import { useUploadStore } from "../../../stores/upload.js";
  import Loading from '../Spinner/Loading.vue';
  import { RouterLink, RouterView, useRoute } from "vue-router";
  import { getId, getUsername, getClass } from "../../../utils/getInfoUser";

  export default {
    data() {
      return {
        useAnnouncement: useAnnouncementStore(),
        id: useRoute().params.id,
        announcement: {
         title: "",  
         fileUrl: "" 
        },
        pageTitle: "Edit thông báo",
        useUpload: useUploadStore() 
      };
    },
    async mounted() {
      this.announcement = await this.useAnnouncement.getSpecifiedAnnouncement(this.id, this.announcement);
    //   this.post = this.useForum.post; 
          },
    methods: {
        editAnnouncement() {
            this.useAnnouncement.editAnnouncement(this.id, this.announcement);  
        // this.useForum.updatePost(this.id, this.post);
      },
      async uploadDocs(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('doc', file);
      const doc = await this.useUpload.uploadDocs(formData);
      this.announcement.fileUrl = doc;
      console.log(this.announcement.fileUrl);
      },
      deleteImage() {
        this.announcement.fileUrl = "";
      }
    },
    components: { NavTitle, Loading },
  };
  </script>
  
  <style scoped>
  
  .forum-item {
    border: 1px solid #85bde5;
    padding: 5px 20px;
    height: 400px;
    overflow-y: scroll;
  }
  
  input, textarea {
    border-radius: 4px;
    padding: 8px;
    border: 1px solid gray;
  }

  </style>
  