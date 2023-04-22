import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from "../utils/config.js";
import { getClass, getId } from "../utils/getInfoUser";
import { axiosIns } from "../api/axios.js";

export const useStudentStore = defineStore({
  id: "student",
  state: () => ({
    error: true,
    data: [],
    studentDetails: [],
    student: {
      studentId: "",
      password: "",
      name: "",
      role: "",
      birthdate: "",
      address: "",
      emailAddress: "",
      phone: "",
      gender: "",
      total_creadits: 0,
      status: "",
      _class: "",
      gpa: 0,
      paidFee: false,
    },
    _class: getClass(),
    accessToken: "",
    successMsg: false,
    errorMsg: false,
  }),
  getters: {
    showSuccessMsg: (state) => state.successMsg,
    showErrorMsg: (state) => state.errorMsg,
  },
  actions: {
    async getData(_class) {
      try {
        console.log('class ' + _class)
        const config = getAccessToken();

        const response = await axiosIns.get(
          `http://localhost:8000/student/getAll/${_class}`,
          config
        );
         
        this.data = response.data.allStudent;

        return response.data.allStudent;
      } catch (error) {
        console.log(error);
      }
    },
    async postData() {
      try {
        const config = getAccessToken();
         
        const response = await axiosIns.post(
          "http://localhost:8000/student/create",
          this.student,
          config
        );
        console.log(response.data);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.error(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async addStudent(student) {
      try {
        const config = getAccessToken();  

        const response = await axiosIns.post(
          "http://localhost:8000/student/create",
          student,
          config
        );
        console.log(response.data);
        this.$state.successMsg = true;
        setTimeout(() => (this.$state.successMsg = false), 3000);
      } catch (error) {
        console.error(error);
        this.$state.errorMsg = true;
        setTimeout(() => (this.$state.errorMsg = false), 3000);
      }
    },
    async updateStudent(id, details) {
      try {
        const config = getAccessToken();
         
        const response = await axiosIns.patch(
          `http://localhost:8000/student/update/${id}`,
          details,
          config
        );
        console.log(response);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
      } catch (error) {
        console.error(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getStudentDetails(id) {
      try {
        const config = getAccessToken(); 

        const response = await axiosIns.get(
          `http://localhost:8000/student/details/${id}`,
          config
        );
        this.studentDetails = response.data.details;
        console.log(response.data.details._class);
        return response.data.details;
         
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStudent(id) {
      try {
        const accessToken = window.localStorage.getItem("token");
        console.log(accessToken);
        const config = {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        };
        const response = await axiosIns.delete(
          `http://localhost:8000/student/remove/${id}`,
          config
        );

        console.log(response);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        this.getData();
        return response;
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getStudentStatus(_class, status) {
      try {
        const config = getAccessToken();
        const res = await axiosIns.get(`http://localhost:8000/student/status/${_class}?status=${status}`, config);

        console.log(res.data.students);

         return res.data.students;
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },   
    async getStudentsInClass() {
      try {
        const config = getAccessToken();
        const id = getId();
        const res = await axiosIns.get(`http://localhost:8000/student/in-class/${id}`, config);

        console.log(res.data.students);

         return res.data.students;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllClasses() {
      try {
        const config = getAccessToken();

        const res = await axiosIns.get(`http://localhost:8000/student/all-class`, config);

        console.log(res.data.classes);

         return res.data.classes;
      } catch (error) {
        throw error;
      }
    },
    async getUsersInClass(_class) {
      try {
        const config = getAccessToken();

        const response = await axiosIns.get(
          `http://localhost:8000/users/in/${_class}`,
          config
        );
         
        this.data = response.data.allStudent;

        return response.data.allStudent;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
