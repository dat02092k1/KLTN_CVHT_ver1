import { defineStore } from "pinia";
 import { getAccessToken } from '../utils/config.js'
 import { axiosIns } from "../api/axios.js";

export const useUploadStore = defineStore({
  id: "image",
  state: () => ({
    imageUrl: "",
    successMsg: false,
    errorMsg: false,
    loading: false
}),
  getters: {
  },
  actions: {
    async uploadImg(data) {
        try {
          this.loading = true;
            const config = getAccessToken(); 
            console.log(data);
            const img = await axiosIns.post("http://localhost:8000/api/upload", data, config); 
             
            this.loading = false;
            return img.data.url; 
             
        } catch (error) {
            console.log(error);    
            this.loading = false;     
        }
    },
    async uploadExcel(data) {
      try {
         
        const config = getAccessToken();
        this.loading = true;
        const upload = await axiosIns.post("http://localhost:8000/student/import-excel", data, config); 
             
        console.log(upload);    
        this.successMsg = true;
        this.loading = false;
        setTimeout(() => (this.successMsg = false), 3000); 
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);  
      }
    },
    async uploadDocs(data) {
      try {
          this.loading = true;
          const config = getAccessToken(); 
          console.log(data);
          const docs = await axiosIns.post("http://localhost:8000/api/upload-doc", data, config); 
           
          console.log(docs)
          this.loading = false;
          return docs.data.url; 
           
      } catch (error) {
          console.log(error);        
          this.loading = false; 
          alert('Lỗi: ' + error.response.data.message);
      }
    },
    async uploadMultiDocs(data) {
      try {
        this.loading = true;
          const config = getAccessToken(); 

          const docs = await axiosIns.post("http://localhost:8000/api/upload-docs", data, config); 
           
          console.log(docs);
          this.loading = false;
          return docs.data.files;
           
      } catch (error) {
        console.log(error);        
          this.loading = false; 
      }      
    },
    async uploadMultiCourses(data) {
      try {
        const config = getAccessToken();
        this.loading = true;
        const upload = await axiosIns.post("http://localhost:8000/api/student/course/import", data, config); 
             
        console.log(upload);   
        this.loading = false; 
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000); 
      } catch (error) {
        console.log(error);
        alert('Error: '+ error.response.data.message);
        this.loading = false;
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    }
  },
});