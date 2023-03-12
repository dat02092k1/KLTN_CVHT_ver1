<template>
    <div>
    <nav-title :title="pageTitle"/>
  
     
    <router-link :to="{ path: '/student/course/add/' + id }" >
      <button class="bg-[#324f90] text-[#ffffff] ml-6 my-2 p-2">Thêm môn học</button>
              </router-link>
    <div class="">
      <div  class="table-container hidden mx-3 bg-[#ffffff]">
      <table>
        <thead>
          <tr>
            <td colspan="3" class="semester">HỌC KỲ 1 - NĂM HỌC 2022-2023</td>
          </tr>
          <tr>
            <th>STT</th>
            <div>
              <th class="subject" colspan="2">Môn học</th>
              <th>Số tín</th>
            <th>Điểm</th>
            <th>Trạng thái</th>
            </div>
             
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courses" :key="index">
            <td>{{ index + 1 }}</td>
            <div v-for="(item, index) in course.subjects" :key="index">
              <td class="subject" style="width: 50%;">{{ item.name }}</td>
              <td style="width: 50%;">{{ item.credits }}</td>
              <td>{{ item.score }}</td>
            </div>

            <td>
              <router-link :to="{ path: '/student/course/edit/' + course._id }" class="bg-[#51a6ef] text-[#fff] rounded p-2">
                Cập nhật
              </router-link>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-container mx-3">
      <table v-for="(course, index) in courses" :key="index">
        <thead>
          <tr class="flex justify-between items-center my-2">

            <div class="semester flex">
              <h3>Học kỳ: </h3>
              <span class="ml-2">
                {{ course.semester }}
              </span>
            </div>  
            <router-link :to="{ path: '/student/course/edit/' + course._id }" class="bg-[#51a6ef] text-[#fff] rounded p-2">
                Cập nhật
              </router-link>
          </tr>
          <tr>
            
          </tr>
          <tr>
            <th>STT</th>
              <th>Môn học</th>
              <th>Số tín</th>
            <th>Điểm số</th>
            <th>Điểm chữ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in course.subjects" :key="index">
              <td>{{ index + 1 }}</td>
              <td >{{ item.name }}</td>
              <td>{{ item.credits }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.grade }}</td>            
          </tr>
        </tbody>
      </table>

      <hr>
       
    </div>
    </div>
    <div>Tổng trung bình tích lũy: </div>
    <span>{{ studentCpa }}</span>
   
  </div>
  
  </template>
  
  <script>
  import NavTitle from "../NavTitle.vue";
  import { useScoreStore } from "../../../stores/score.js";
  import { useStudentStore } from "../../../stores/student.js";
  
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
        student: [],
        id: useRoute().params.id,
        studentCpa: ''
      };
    },
    async mounted() {
      this.courses = await this.useScore.getCourses(this.id); 
      console.log(this.courses)
      this.student = await this.useStudent.getStudentDetails(this.id); 
      console.log(typeof(this.student.CPA));
      this.studentCpa = this.roundToTwoDecimalPlaces(this.student.CPA);   
      console.log(this.studentCpa)
    },
    methods: {
        roundToTwoDecimalPlaces(num) {
            return num.toFixed(2);
        },
        editCourse(id) {
          try {
            console.log(id);  
          } catch (error) {
            console.log(error); 
          }
        }
    },
    components: { NavTitle },
  };
  </script>
  
  <style scoped>

  .table-container {
    height: 350px;
    overflow-y: scroll;
    margin: 0 26px;
  }
 
   table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
  }
  th, td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 10px;
  }
  th {
    background-color: #f2f2f2;
  }
  /* td.subject, th.subject {
    width: 50%;
    text-align: left;
  } */
  /* th.stt {
    width: 10%;
  }
  th.sotin {
    width: 10%;
  }
  th.diem {
    width: 30%;
  } */
  </style>
  