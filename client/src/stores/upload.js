import { defineStore } from "pinia";
 import axios from "axios";
 import { getAccessToken } from '../utils/config.js'


export const useImgStore = defineStore({
  id: "image",
  state: () => ({
    imageUrl: "",
    successMsg: false,
    errorMsg: false 
}),
  getters: {
  },
  actions: {
    async uploadImg(data) {
        try {
            const config = getAccessToken(); 
            console.log(data);
            const img = await axios.post("http://localhost:8000/api/upload", data, config); 
             
            return img.data.url; 
             
        } catch (error) {
            console.log(error);         
        }
    },
    async uploadExcel(data) {
      try {
        const config = getAccessToken();

        const upload = await axios.post("http://localhost:8000/student/import-excel", data, config); 
             
        console.log(upload);    
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000); 
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);  
      }
    }
  },
});