import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from '../utils/config.js'
import { getRefreshToken } from '../utils/getInfoUser.js'
import { useStudentStore } from "./student.js";
import { axiosIns } from "../api/axios.js";
import { joinRoom ,getUsersOnl, logOut } from "../socket/socket.js";
import { getClass } from "../utils/getInfoUser.js";

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
    errorMsg: false,
    userClass: getClass()
  }),
  getters: {},
  actions: {
    async login(studentId, password) {
      try {
        const user = await axiosIns.post("http://localhost:8000/api/user/login",
        {
          studentId,
          password,
        });

        this.user = user.data.user;
        console.log(user.status);
        localStorage.setItem("_id", this.user._id);
        localStorage.setItem("username", this.user.studentId);
        localStorage.setItem("role", this.user.role);
        localStorage.setItem("class", this.user._class);
        localStorage.setItem("refreshToken", user.data.refreshToken);

        this.accessToken = user.data;
         
        window.localStorage.setItem("token", this.accessToken.acessToken);
        const storedToken = window.localStorage.getItem("token");

        if (user.status === 200) {
          console.log(this.userClass);
          this.userClass = getClass();
          joinRoom(this.userClass);
          router.push("/student/list");
        } else {
          console.log(this.errorMsg);
          this.errorMsg = true;
          setTimeout(() => (this.errorMsg = false), 3000); 
          throw new Error("Sai thông tn đăng nhập");
        }
      } catch (error) {
        this.errorMsg = true;
        console.log(error);
        setTimeout(() => (this.errorMsg = false), 3000); 
        throw error;
      }
    },
    async logout() {
      try {
        const config = getAccessToken();

          console.log(config.headers)   
        const logout = await axiosIns.post(`http://localhost:8000/api/user/logout`, {}, config);
 
        const _class = getClass();
        logOut(_class);        
        localStorage.clear(); 

        if (logout.status === 200) {
          router.push("/login");
        } else {
          throw new Error("Đăng xuất thất bại");
        }
      } catch (error) {
        throw error; 
      }
    },
   
      // try {
      //   const refreshToken = getRefreshToken(); 

      //   const res = await axios.post(`http://localhost:8000/api/token-refresh`, {
      //     refreshToken: refreshToken
      //   })
      //   console.log(res); 
      // } catch (error) {
      //   console.log(error); 
      // }
      refreshToken() {
      return new Promise((resolve, reject) => {
        axiosIns
          .post(`token-refresh`)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
});
