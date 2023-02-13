import { defineStore } from "pinia";
import axios from "axios";
import { useStudentStore } from "./student.js";

import router from "../router/index.js";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    error: true,
    accessToken: "",
  }),
  getters: {
  },
  actions: {
    async login(studentId, password) {
        try {
            const user = await axios.post("http://localhost:8000/user/login", {
                studentId,
                password,
            })
            this.accessToken = user.data;
            window.sessionStorage.setItem("token", this.accessToken.acessToken)
            const storedToken = window.sessionStorage.getItem("token");


            if (user.status === 200) {
                router.push("/student/list")
            }
            else {
                throw new Error("Sai thông tn đăng nhập");  
            }
        } catch (error) {
            throw error;
        }
    }
  },
});