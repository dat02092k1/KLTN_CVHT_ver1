import { defineStore } from "pinia";
 import { axiosIns } from "../api/axios.js";
 import API_ENDPOINTS from "../api/api.js";
 import { getAccessToken } from "../utils/config.js";
 import { getId } from "../utils/getInfoUser.js";

export const useNoticeStore = defineStore({
  id: "notice",
  state: () => ({
    error: true,
    listNotice: [],
    post: null,
    userId: getId(),
    successMsg: false,
    errorMsg: false,
  }),
  getters: {
  },
  actions: {
    async getListNotice(_class) {
        try {
            const config = getAccessToken();
            console.log(_class);
          const res = await axiosIns.get(API_ENDPOINTS.getNoticeList + _class, config); 
          this.listNotice = res.data.result;
          console.log(this.listNotice);
        } catch (error) {
            console.log(error);   
            
        }
    },
    async addNotice(notice) {
      try {
        const config = getAccessToken();
          
        const res = await axiosIns.post(API_ENDPOINTS.addNotice, notice, config)
        console.log(res.data);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error); 
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async deleteNotice(id, _class) {
      try {
        const config = getAccessToken();
          
        const res = await axiosIns.delete(API_ENDPOINTS.deleteNotice + id, config)

        console.log(res); 

        this.getListNotice(_class); 
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async editNotice(id, notice) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.patch(API_ENDPOINTS.editNotice + id, notice, config);

        console.log(res); 
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        console.log(updatePost);  
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getDetailsNotice(id)  { 
        try {
            const config = getAccessToken();

          const res = await axiosIns.get(API_ENDPOINTS.detailsNotice + id, config); 
           
          console.log(res.data.msg);
          return res.data.msg;
        } catch (error) {
            console.log(error); 
        }
    }
  },
});