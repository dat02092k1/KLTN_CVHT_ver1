import { defineStore } from "pinia";
 import axios from "axios";

export const useStudentStore = defineStore({
  id: "student",
  state: () => ({
    error: true,
    data: [],
    studentDetails:[],
    student: {
      studentId: '',
      password: '',
      name: '',
      role: '',
      birthdate: '',
      address: '',
      emailAddress: '',
      phone: '',
      gender: '',
      total_creadits: 0,
      status: '',
      _class: '',
      gpa: 0,
      paidFee: false,
    },
    accessToken: '',
  }),
  getters: {
  },
  actions: {
    async getData() {
        try {
          const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
  
          const response = await axios.get(
            "http://localhost:8000/student/getAll/K64-C-CLC", config
          );
          this.data = response.data.allStudent;
          console.log(this.data);
        } catch (error) {
          console.log(error);
        }
      },
    async postData() {
        try {
          const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
          const response = await axios.post('http://localhost:8000/student/create', this.student, config);
          console.log(response.data);  
        } catch (error) {
          console.error(error);
        }
    },
    async updateStudent(id, details) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
        const response = await axios.patch(`http://localhost:8000/student/update/${id}`, details, config
        ); 
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    ,
    async getStudentDetails(id) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
  
        const response = await axios.get(`http://localhost:8000/student/details/${id}`, config);   
        this.studentDetails = response.data.details;
        console.log(this.studentDetails.studentId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStudent(id) {
      try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
        const response = await axios.delete(`http://localhost:8000/student/remove/${id}`, config);   

        console.log(response);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    }
  },
});