<template>
    <div>
      <div class="add-header">
      <NavTitle :title="pageTitle" />
    </div>

      <form class="bg-[#fff] mx-6 h-full rounded flex flex-col p-3">
        <input name="excelFile" type="file" @change="handleFileUpload" accept=".xlsx,.xls,.csv">
        <div class="flex justify-start my-2">
          <button class="p-2 bg-[#2196f3] rounded text-[#fff]" type="button" @click="uploadFile">Upload</button>
        </div>
      </form>
      <a-alert v-show="useUpload.successMsg === true" message="Thêm mới kết quả học tập thành công" type="success" show-icon />
          <a-alert v-show="useUpload.errorMsg === true" message="Thêm mới kết quả học tập thất bại" type="error" show-icon />
    </div>
  </template>
  
  <script>
  import { useUploadStore } from '../../../stores/upload.js';
  import NavTitle from "../NavBar/NavTitle.vue";

  export default {
    name: 'UploadExcel',
    components: { NavTitle },
    data() {
      return {
        selectedFile: null,
        useUpload: useUploadStore(),
        pageTitle: 'Import môn học'
      }
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile)
      },
      uploadFile() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        this.useUpload.uploadMultiCourses(formData);
        
      }
    }
  }
  </script>
  