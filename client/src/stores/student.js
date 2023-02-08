import { defineStore } from "pinia";
import axios from "axios";

export const useStudentStore = defineStore({
  id: "student",
  state: () => ({
    data: [],
    student: {
      studentId: '',
      name: '',
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
    }
  },
});