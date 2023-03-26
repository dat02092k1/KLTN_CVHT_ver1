import { defineStore } from "pinia";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";
 import { getAccessToken } from "../utils/config.js";
 import { getId } from "../utils/getInfoUser.js";

export const useAnnouncementStore = defineStore({
  id: "announcement",
  state: () => ({
    error: true,
    listAnnouncement: [],
    post: null,
    comments: [],
    getComment: [],
    userId: getId()
  }),
  getters: {
  },
  actions: {
    async getListAnnouncement() {
        try {
            const config = getAccessToken();
          
          const res = await axiosIns.get(API_ENDPOINTS.getAnnouncement, config);            
          
            console.log(res.data.announcement); 
            this.listAnnouncement = res.data.announcement; 
            return res.data.announcement;
        } catch (error) {
            console.log(error);   
        }
    },
    async addAnnouncement(announcement) {
      try {
        const accessToken = window.localStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          console.log(announcement);
        const res = await axiosIns.post(API_ENDPOINTS.addAnnouncement, announcement, config);

        console.log(res);
        this.getListAnnouncement();         
      } catch (error) {
        console.log(error); 
      }
    },
    async deleteAnnouncement(id) {
      try {
        const config = getAccessToken(); 
          
        const deleteAnnouncement = await axiosIns.delete(API_ENDPOINTS.deleteAnnouncement + id, config)

        console.log(deleteAnnouncement); 

        this.getListAnnouncement(); 
      } catch (error) {
        console.log(error);
      }
    },
    async getSpecifiedAnnouncement(id) {
        try {
          const config = getAccessToken(); 
            
          const res = await axiosIns.get(API_ENDPOINTS.getAnnouncement + '/' + id, config)
  
          console.log(res.data.announcement); 
          return res.data.announcement;
        } catch (error) {
          console.log(error);
        }
      },
    async editAnnouncement(id, announcement) {
        try {
            const config = getAccessToken(); 
            
          const res = await axiosIns.put(API_ENDPOINTS.editAnnouncement + id, announcement, config)
  
          console.log(res.data); 
           
        } catch (error) {
            console.log(error);
        }
    }
  },
});