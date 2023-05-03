import { defineStore } from "pinia";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";
import { getAccessToken } from "../utils/config.js";
import { getId, getClass } from "../utils/getInfoUser.js";

export const useReportStore = defineStore({
  id: "report",
  state: () => ({
    loading: false,
    successMsg: false,
    errorMsg: false,
    reports: []
  }),
  getters: {},
  actions: {
    async getListReport() {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(API_ENDPOINTS.getListReports, config);
        return res.data.reports; 
      } catch (error) {
        console.log(error);
      }
    },
    async addReport(reportDetails) {
        try {
            this.loading = true;
            const config = getAccessToken(); 
            const id = getId();

            const res = await axiosIns.post(API_ENDPOINTS.createReport + id, reportDetails, config) 

            this.getReports();
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    },
    async getReports() {
        try {
        const config = getAccessToken();
        const userId = getId();
        const res = await axiosIns.get(API_ENDPOINTS.getReportsOfUser + userId, config);

        this.reports = res.data.reports;

        return res.data.reports; 
        } catch (error) {
            console.log(error);
        }
    },
    async deleteReport(id) {
        try {
            this.loading = true;
            const config = getAccessToken(); 

            const res = await axiosIns.delete(API_ENDPOINTS.deleteReport + id, config) 
 
            console.log(res); 
            this.loading = false;
            this.getReports();
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    },
    async getDetailsReport(id) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(API_ENDPOINTS.getDetailsReport + id, config);

        return res.data.report;
      } catch (error) {
        console.log(error);
      }
    },
    async editReport(data, id) {
      try {
        this.loading = true;
        const config = getAccessToken();

        const res = await axiosIns.put(API_ENDPOINTS.editReport + id, data, config);

        this.loading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    }
  },
});
