<template>
  <div>
  <nav-title :title="pageTitle"/>

  <div class="table-container" v-if="userRole === 'student'">
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
        </tr>
      </tbody>
    </table>
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
          <td class="text-center">{{ student.gpa }}</td>
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
      students: []
    };
  },
  async mounted() {
    if (this.userRole === 'student') {
    this.courses = await this.useScore.getCourses(this.studentId); 
    console.log(this.courses)
    }
    else {
      this.students = await this.useStudent.getData();  
      console.log(this.students)
    }
  },
  methods: {
    
  },
  components: { NavTitle },
};
</script>

<style scoped>
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
