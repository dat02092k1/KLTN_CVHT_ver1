import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from "../utils/config.js";
import { getUsername, getId } from "../utils/getInfoUser.js";

import API_ENDPOINTS from "../api/api.js";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    createdBy: getId(),
    tasks: []
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
 

        const tasks = await axios.get(API_ENDPOINTS.getTasks, {
            params: {
              createdBy: this.createdBy,
            },
            headers: {
              token: `Bearer ${accessToken}`,
            },
          });
          this.tasks = tasks.data.tasks;
        console.log(this.tasks);
        return tasks.data.tasks;
      } catch (error) {
        console.log(error);
      }
    },
    async assignTasks(taskDetails) {
      try {
        const config = getAccessToken();

        const task = await axios.post(API_ENDPOINTS.assignTask, taskDetails, config)

        console.log(task);
        this.getTasks();     
      } catch (error) {
        console.log(error);
      }
    },
    async getTaskDetails(taskId) {
      try {
        const config = getAccessToken();
        const getTask = await axios.get(API_ENDPOINTS.getDetailsTask + taskId, config)

        this.tasks = getTask.data.task; 
        return getTask.data.task; 
      } catch (error) {
        console.log(error); 
      }
    },
    async editTask(taskId, taskDetails) {
      try {
        const config = getAccessToken();
        const task = await axios.put(API_ENDPOINTS.editTask + taskId, taskDetails, config)

        console.log(task);
         
      } catch (error) {
        console.log(error); 
      }
    },
    async getTasksOfStudent(_id) {
      try {
        const config = getAccessToken();
        console.log(_id);
        const task = await axios.get(API_ENDPOINTS.getTasksOfStudent + _id, config)

        console.log(task.data.tasks);
        return task.data.tasks;
      } catch (error) {
        console.log(error); 
      }
    },
    async updateStatusTask(taskId, studentId, isCompleted) {
      try {
        const config = getAccessToken();

        const update = await axios.put(API_ENDPOINTS.updateStatus + taskId + '/' + studentId, isCompleted, config)

        console.log(update);    
      } catch (error) {
        console.log(error); 
      }
    }
  },
});
