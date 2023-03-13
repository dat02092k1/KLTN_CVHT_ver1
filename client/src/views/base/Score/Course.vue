<template>
  <div>
  <nav-title :title="pageTitle" class="p-[15px]"/>

  <div class="" v-if="userRole === 'student'">
    <div class="table-container mx-3 bg-[#ffffff]">
      <table style="width: 80%;">
        <thead>
          <tr>
            <td colspan="3" class="semester">HỌC KỲ 1 - NĂM HỌC 2022-2023</td>
          </tr>
          <tr class="bg-[#f2f2f2]"> 
            <th>STT</th>
            <div class="grid grid-cols-12">
              <th class="subject col-span-3" colspan="2" >Môn học</th>
              <th class="col-span-3">Số tín</th>
            <th class="col-span-3">Điểm</th>
            <th class="col-span-3">Điểm chữ</th>
            </div>
             
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courses" :key="index">
            <td>{{ index + 1 }}</td>
            <div class="grid grid-cols-12 " v-for="(item, index) in course.subjects" :key="index">
              <td class="subject col-span-3 text-center" >{{ item.name }}</td>
              <td class="text-center col-span-3" >{{ item.credits }}</td>
              <td class="text-center col-span-3">{{ item.score }}</td>
              <td class="text-center col-span-3">{{ item.grade }}</td>
            </div>  

            
            
          </tr>
        </tbody>
      </table>

       
    </div>

    <div>Tổng trung bình tích lũy: </div>
    <span>{{ studentCpa.CPA }}</span>
  </div>

  <div class="consultant-container" v-else>
    <h2>Danh sách sinh viên</h2>
    <h3>Lớp: <span class="font-bold"> {{ userClass }} </span></h3>
    <table class="student-table">
      <thead>
        <tr>
          <th>STT</th>
          <th colspan="2">Sinh viên</th>
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
          <td class="flex flex-col items-center justify-center">
            <div class="m-2">
              <router-link :to="{ path: '/student/course/' + student._id }" >
                <button class="flex items-center bg-[#409eff]  text-[#ffffff] rounded py-1 px-2">
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

</template>

<script>
import NavTitle from "../NavBar/NavTitle.vue";
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
      students: [],
      studentCpa: ''
    };
  },
  async mounted() {
    if (this.userRole === 'student') {
    this.courses = await this.useScore.getCourses(this.studentId); 
    this.studentCpa = await this.useStudent.getStudentDetails(this.studentId);
    console.log(this.courses, this.studentCpa.CPA)
    }
    else {
      this.students = await this.useStudent.getData();  
      console.log(this.students)
    }
  },
  methods: {
    roundToTwoDecimalPlaces(num) {
            return num.toFixed(2);
        }
  },
  components: { NavTitle },
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
