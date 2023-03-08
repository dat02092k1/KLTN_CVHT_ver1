<template>
    <div>
      <form>
        <input name="excelFile" type="file" @change="handleFileUpload" accept=".xlsx,.xls,.csv">
        <button type="button" @click="uploadFile">Upload</button>
      </form>
      <a-alert v-show="useUpload.successMsg === true" message="Thêm mới sinh viên thành công" type="success" show-icon />
          <a-alert v-show="useUpload.errorMsg === true" message="Thêm mới sinh viên thất bại" type="error" show-icon />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useImgStore } from '../../stores/upload.js';
  export default {
    name: 'UploadExcel',
    data() {
      return {
        selectedFile: null,
        useUpload: useImgStore()
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
  
        this.useUpload.uploadExcel(formData);
        
      }
    }
  }
  </script>
  