import { defineStore } from "pinia";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";
import { getAccessToken } from "../utils/config.js";
import { getId, getClass } from "../utils/getInfoUser.js";

export const useFormStore = defineStore({
  id: "form",
  state: () => ({
    error: true,
    listForms: [],
    form: null,
    userId: getId(),
    successMsg: false,
    errorMsg: false,
    loading: false,
  }),
  getters: {},
  actions: {
    async getListForm(type) {
      try {
        const config = getAccessToken();
        const _class = getClass();

        const res = await axiosIns.get(API_ENDPOINTS.getForm + _class + `?type=${type}`, config);

        console.log(res.data);
        this.listForms = res.data.forms;
        console.log(this.listForms); 
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addForm(form) {
      try {
        const config = getAccessToken();

        console.log(form);
        const res = await axiosIns.post(API_ENDPOINTS.addForm, form, config);

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async deleteForm(id, type) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.delete(
          API_ENDPOINTS.deleteForm + id,
          config
        );

        console.log(res);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        this.getListForm(type);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getDetailsForm(id) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(
          API_ENDPOINTS.detailForm + id,
          config
        );

        console.log(res.data);
        return res.data.form;
      } catch (error) {
        console.log(error);
      }
    },
    async editForm(id, status) {
      try {
        const config = getAccessToken();
        const form = {
          status: status
        }
        console.log(id, form);
        const res = await axiosIns.put(
          API_ENDPOINTS.editForm + id,
          form,
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
    async getUserForms(id) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(API_ENDPOINTS.getUserForms + id, config);

        console.log(res.data.form);
        return res.data.form;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
