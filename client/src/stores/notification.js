import { defineStore } from "pinia";
 import axios from "axios";
 import { getAccessToken } from '../utils/config.js'
 import { axiosIns } from "../api/axios.js";

export const useNotiStore = defineStore({
  id: "notification",
  state: () => ({
    notifications: []
  }),
  getters: {
  },
  actions: {
    async getNotification() {
        try {
            const config = getAccessToken();
             
            const notis = await axiosIns.get(`http://localhost:8000/api/get/notifications`, config); 
             
            return notis.data.notifications;      
        } catch (error) {
            console.log(error);         
        }
    },
    async readNotification(id) {
        try {
            const accessToken = window.localStorage.getItem("token");
    const config = {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    };
            const notis = await axiosIns.patch(`http://localhost:8000/api/read/notifications/${id}`, {}, {
                headers: {
                    token: `Bearer ${accessToken}`,
                  }
            }); 
             
            return notis.data.notifications;      
        } catch (error) {
            console.log(error);         
        }
    }
  },
});