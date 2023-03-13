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
    errorMsg: false
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
        localStorage.setItem("_id", this.user._id);
        localStorage.setItem("username", this.user.studentId);
        localStorage.setItem("role", this.user.role);
        localStorage.setItem("class", this.user._class);

        this.accessToken = user.data;
        window.localStorage.setItem("token", this.accessToken.acessToken);
        const storedToken = window.localStorage.getItem("token");

        if (user.status === 200) {
          router.push("/student/list");
        } else {
          console.log(this.errorMsg);
          this.errorMsg = true;
          setTimeout(() => (this.errorMsg = false), 3000); 
          throw new Error("Sai thông tn đăng nhập");
        }
      } catch (error) {
        this.errorMsg = true;
        console.log(this.errorMsg);
        setTimeout(() => (this.errorMsg = false), 3000); 
        throw error;
      }
    },
    async logout() {
      try {
        const config = getAccessToken();

          console.log(config.headers)   
        const logout = await axios.post(`http://localhost:8000/api/user/logout`, {}, config);
 
         
        localStorage.clear(); 

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
