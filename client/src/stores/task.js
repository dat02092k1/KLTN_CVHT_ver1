import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from "../utils/config.js";
import { getUsername, getId } from "../utils/getInfoUser.js";

import API_ENDPOINTS from "../api/api.js";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    createdBy: getId(),
  }),
  getters: {},
  actions: {
    async getTasks() {
      try {
        const accessToken = window.sessionStorage.getItem("token");
        const config = {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        };
 

        const tasks = await axios.get('http://localhost:8000/api/student/get-task-all', {
            params: {
              createdBy: this.createdBy,
            },
            headers: {
              token: `Bearer ${accessToken}`,
            },
          });

        console.log(tasks);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
