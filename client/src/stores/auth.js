import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from '../utils/config.js'
import { useStudentStore } from "./student.js";

import router from "../router/index.js";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    error: true,
    accessToken: "",
    user: {
      _id: "",
      username: "",
      role: "",
    },
  }),
  getters: {},
  actions: {
    async login(studentId, password) {
      try {
        const user = await axios.post("http://localhost:8000/user/login", {
          studentId,
          password,
        });

        this.user = user.data.user;
        console.log(this.user);
        sessionStorage.setItem("_id", this.user._id);
        sessionStorage.setItem("username", this.user.studentId);
        sessionStorage.setItem("role", this.user.role);
        sessionStorage.setItem("class", this.user._class);

        this.accessToken = user.data;
        window.sessionStorage.setItem("token", this.accessToken.acessToken);
        const storedToken = window.sessionStorage.getItem("token");

        if (user.status === 200) {
          router.push("/student/list");
        } else {
          throw new Error("Sai thông tn đăng nhập");
        }
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      try {
        const config = getAccessToken();

          console.log(config.headers)   
        const logout = await axios.post(`http://localhost:8000/api/user/logout`, {}, config);
 
         
        sessionStorage.clear(); 

        if (logout.status === 200) {
          router.push("/login");
        } else {
          throw new Error("Đăng xuất thất bại");
        }
      } catch (error) {
        throw error; 
      }
    }
  },
});
