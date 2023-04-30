import { defineStore } from "pinia";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";
import { getAccessToken } from "../utils/config.js";
import { getId, getClass, getRole } from "../utils/getInfoUser.js";

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
    userRole: getRole(),    
  }),
  getters: {},
  actions: {
    async getListForm(_class) {
      try {
        const config = getAccessToken();
 
        const res = await axiosIns.get(API_ENDPOINTS.getForm + _class, config);

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
    async deleteForm(id, _class) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.delete(
          API_ENDPOINTS.deleteForm + id + `?userId=${this.userId}`,
          config
        );

        console.log(res);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        if (this.userRole === 'consultant') {
          this.getListForm(_class); 
        }
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
    async editForm(id, form) {
      try {
        const config = getAccessToken();
        
        console.log(form);
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
    async getFormsByType(id, type) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(API_ENDPOINTS.getFormsByType + id + `?type=${type}`, config);

        console.log(res.data);
        return res.data.forms;
      } catch (error) {
        console.log(error);
      } 
    },
    async getFormsRest(id) {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(API_ENDPOINTS.getFormsRest + id, config);

        console.log(res.data);
        return res.data.forms;
      } catch (error) {
        console.log(error);
      } 
    }
  },
});
