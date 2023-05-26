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
    userId: getId(),
    successMsg: false,
    errorMsg: false,
    loading: false,
  }),
  getters: {},
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
        const config = getAccessToken(); 
        
        const res = await axiosIns.post(
          API_ENDPOINTS.addAnnouncement,
          announcement,
          config
        );

        console.log(res);
        this.getListAnnouncement();
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async deleteAnnouncement(id) {
      try {
        const config = getAccessToken();

        const deleteAnnouncement = await axiosIns.delete(
          API_ENDPOINTS.deleteAnnouncement + id,
          config
        );

        this.getListAnnouncement();
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getSpecifiedAnnouncement(id) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(
          API_ENDPOINTS.getAnnouncement + "/" + id,
          config
        );

        return res.data.announcement;
      } catch (error) {
        console.log(error);
      }
    },
    async editAnnouncement(id, announcement) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.put(
          API_ENDPOINTS.editAnnouncement + id,
          announcement,
          config
        );

        console.log(res.data);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
  },
});
