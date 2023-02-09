import { defineStore } from "pinia";
import axios from "axios";

export const useStudentStore = defineStore({
  id: "student",
  state: () => ({
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
    }
  }),
  getters: {
  },
  actions: {
    async getData() {
        try {
          const response = await axios.get(
            "http://localhost:8000/student/getAll/K64-C-CLC"
          );
          this.data = response.data.student;
          console.log(this.data);
        } catch (error) {
          console.log(error);
        }
      },
    async postData() {
        try {
          console.log(this.student);
          const response = await axios.post('http://localhost:8000/student/create', this.student);
          console.log(response.data);  
        } catch (error) {
          console.error(error);
        }
    },
    async updateStudent(id, details) {
      try {
        console.log(id);
        console.log(details);
        const response = await axios.patch(`http://localhost:8000/student/update/${id}`, details
        ); 
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    ,
    async getStudentDetails(id) {
      try {
        const response = await axios.get(`http://localhost:8000/student/details/${id}`);   
        this.studentDetails = response.data.details;
        console.log(this.studentDetails.studentId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStudent(id) {
      try {
        console.log(id);
        const response = await axios.delete(`http://localhost:8000/student/remove/${id}`);   

        console.log(response);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    }
  },
});