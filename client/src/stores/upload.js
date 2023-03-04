import { defineStore } from "pinia";
 import axios from "axios";
 import { getAccessToken } from '../utils/config.js'


export const useImgStore = defineStore({
  id: "image",
  state: () => ({
    imageUrl: ""
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
    }
  },
});