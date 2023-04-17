import { defineStore } from "pinia";
import { getAccessToken } from '../utils/config.js'
import { getRefreshToken, getUsername } from '../utils/getInfoUser.js'
import { useStudentStore } from "./student.js";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";
import { joinRoom ,getUsersOnl, logOut, addUser } from "../socket/socket-client.js";
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
    successMsg: false,
    isLoading: false, 
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
        console.log(this.user._class);
        const classNames = this.user._class.map((c) => c.name); 
        console.log(classNames);
        localStorage.setItem("class", JSON.stringify(classNames));
        localStorage.setItem("refreshToken", user.data.refreshToken);

        this.accessToken = user.data;
         
        window.localStorage.setItem("token", this.accessToken.acessToken);
        const storedToken = window.localStorage.getItem("token");

        if (user.status === 200) {
          this.userClass = getClass();
          joinRoom(this.userClass);
          addUser(getUsername());
          router.push("/");
        } else {
          console.log(this.errorMsg);
          this.errorMsg = true;
          this.isLoading = true;
          setTimeout(() => (
            this.errorMsg = false
            ), 3000); 
          throw new Error("Sai thông tn đăng nhập");
        }
      } catch (error) {
        this.errorMsg = true;
        console.log(error);
        console.log(this.errorMsg);
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
    },
    async forgetPassword(email) {
      try {
        console.log(email); 
        const res = await axiosIns.post(API_ENDPOINTS.forgetPassword, { emailAddress: email });

        console.log(res);

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000); 
      } catch (error) {
        this.errorMsg = true;
        console.log(error);
        setTimeout(() => (this.errorMsg = false), 3000); 
      }
    },
    async changePassword(data, id) {
      try {
        const config = getAccessToken(); 

        const res = await axiosIns.post(API_ENDPOINTS.changePassword + id, data, config)

        console.log(res);
        
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.log(error); 
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async resetPassword(data) {
      try {
        const res = await axiosIns.post(API_ENDPOINTS.resetPassword, data);
        console.log(res);

        if (res.status === 200) {
          this.successMsg = true;
          setTimeout(() => (this.successMsg = false), 3000);
          
          router.push("/login");
        } else {
          throw new Error("Sai thông tn đăng nhập");
        }
      } catch (error) {
        
      }
    }
  },
});
