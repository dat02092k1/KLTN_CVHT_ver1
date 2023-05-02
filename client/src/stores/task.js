import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from "../utils/config.js";
import { getUsername, getId } from "../utils/getInfoUser.js";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
    totalPage: null,
    successMsg: false,
    errorMsg: false,
  }),
  getters: {},
  actions: {
    async getTasks() {
      try {
        const accessToken = window.localStorage.getItem("token");
        const config = {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        };

        const tasks = await axiosIns.get(API_ENDPOINTS.getTasks, { 
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
    async assignTasks(_class, taskDetails) {
      try {
        const config = getAccessToken();
         const task = await axiosIns.post(
          API_ENDPOINTS.assignTask,
          taskDetails,
          config
        );

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        const page = 1;
        this.getTasksPerPage(_class, page); 
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getTaskDetails(taskId) {
      try {
        const config = getAccessToken();
        const getTask = await axiosIns.get(
          API_ENDPOINTS.getDetailsTask + taskId,
          config
        );

        this.tasks = getTask.data.task;
         return getTask.data.task;
      } catch (error) {
        console.log(error);
      }
    },
    async editTask(taskId, taskDetails) {
      try {
        const config = getAccessToken();
         
        const task = await axiosIns.put(
          API_ENDPOINTS.editTask + taskId,
          taskDetails,
          config
        );

        return task;
      } catch (error) {
        console.log(error);
      }
    },
    async getTasksOfStudent(_id) {
      try {
        const config = getAccessToken();
        console.log(_id);
        const task = await axiosIns.get(
          API_ENDPOINTS.getTasksOfStudent + _id,
          config
        );

        console.log(task.data.tasks);
        return task.data.tasks;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatusTask(taskId, studentId, isCompleted) {
      try {
        const config = getAccessToken();

        const update = await axiosIns.put(
          API_ENDPOINTS.updateStatus + taskId + "/" + studentId,
          isCompleted,
          config
        );

        console.log(update);

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async deleteTask(_class, id) {
      try {
        const config = getAccessToken();

        const deleteTask = await axiosIns.delete(
          API_ENDPOINTS.deleteTask + id,
          config
        );

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);

        this.getTasksPerPage(_class, 1);          
      } catch (error) {
        console.log(error); 
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getTasksPerPage(_class, page) {
      try {
        const config = getAccessToken();
         console.log(page);
        const res = await axiosIns.get(
          API_ENDPOINTS.getTasksPerPage + _class + `?page=${page}`,
          config
        );
        console.log(res.data.tasks);
        this.totalPage = res.data.tasks.total;
        console.log(this.totalPage);
        this.tasks = res.data.tasks.tasks;
        return res.data.tasks;
      } catch (error) {
        console.log(error); 
      }
    }
  },
});
