<template>
    <div>
    <nav-title :title="pageTitle" class="p-4"/>
  
  
    <div class="consultant-container mx-6 bg-[#ffffff]">
     <div class="ml-9 my-3">
      <h2>Danh sách sinh viên</h2>
      <h3>Lớp: {{ this.className }} </h3>
       
     </div>
      <table class="student-table">
        <thead>
          <tr>
            <th>STT</th>
            <th >MSSV</th>
            <th>Sinh viên</th>
            <th>Điểm</th>
            <th>Hành động</th>
          </tr>
        </thead>  
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.studentId }}</td>
            <td>{{ student.name }}</td>
            <td class="text-center">{{ roundToTwoDecimalPlaces(student.CPA) }}</td>
            <td  class="flex items-center justify-center px-1">
              <div class="m-2">
                <router-link :to="{ path: '/student/course/' + student._id }" >
                  <button class="flex items-center bg-[#409eff]  text-[#ffffff] rounded py-1 px-2 ">
                    <i class="fa-regular fa-eye"></i>
                   
                  </button>
                </router-link>
                 
              </div>
              <div>
                <router-link :to="{ path: '/student/course/add/' + student._id }" >
                  <button class="flex items-center bg-[#ff733f] text-[#ffffff] rounded py-1 px-2">
                    <i class="fa-regular fa-square-plus"></i>    
                  </button>
                </router-link>
                 
              </div>
               
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <Loading v-show="isShowSpinner"/>
  </template>
  
  <script>
  import NavTitle from "../NavBar/NavTitle.vue";
  import { useScoreStore } from "../../../stores/score.js";
  import { useStudentStore } from "../../../stores/student.js";
  import Loading from '../Spinner/Loading.vue';
  import { getRole, getId, getClass } from '../../../utils/getInfoUser.js'
  import { getAccessToken } from '../../../utils/config.js'
  
  import { RouterLink, RouterView, useRoute } from "vue-router";
  export default {
    data() {
      return {
        pageTitle: "KẾT QUẢ HỌC TẬP",
        useScore: useScoreStore(),
        useStudent: useStudentStore(),
        studentId: getId(),
        courses: [],
        userRole: getRole(),
        userClass: getClass(),
        students: [],
        studentCpa: '',
        isShowSpinner: true,
        selectedClass: "",
        className: useRoute().params.class,
      };
    },
    async mounted() {
        this.students = await this.useStudent.getData(this.className);  
        console.log(this.students);
        this.isShowSpinner = false;
      
    },
    methods: {
      roundToTwoDecimalPlaces(num) {
              return num.toFixed(2);
          }
    },
    components: { NavTitle, Loading },
  };
  </script>
  
  <style scoped>
    .table-container {
      height: 200px;
      overflow-y: scroll;
      margin: 0 26px;
    }
   
    th, td {
      border: 1px solid #ddd;
      text-align: center;
      padding: 10px;
    }
    
     
  
    .student-table {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 0 auto
  }
  .student-table th,
  .student-table td {
    border: 1px solid black;
    padding: 10px;
  }
  .student-table th {
    text-align: center;
  }
  .student-table th:nth-child(2),
  .student-table th:nth-child(3) {
    width: 200px;
  }
    .consultant-container {
      height: 400px;
      overflow-y: scroll;
    }
  
      
  </style>
  