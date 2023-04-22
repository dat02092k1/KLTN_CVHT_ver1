<template>
  <div>
  <nav-title :title="pageTitle" class="p-4"/>

  <div class="" v-if="userRole === 'student'">
    <div class="table-container mx-3 bg-[#ffffff]">

      <div class="table-container mx-3">
        <table v-for="(course, index) in courses" :key="index" class="w-[80%] m-3">
          <thead class="bg-[#efefef]">
            <tr></tr>
            <tr>
              <th>STT</th>
              <th>Môn học</th>
              <th>Mã môn học</th>
              <th>Số tín</th>
              <th>Điểm số</th>
              <th>Điểm chữ</th>
            </tr>

            <tr class="bg-[#fff]">
              <th class="semester" colspan="5">{{ course.semester }}  Mã kỳ học: {{ course.semesterCode }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in course.subjects" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.credits }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.grade }}</td>
            </tr>
          </tbody>
        </table>

        <hr />
      </div>
       
    </div>

    <div class="font-bold mx-6 my-2">
      <div class="flex gap-1">
        <div>Tổng trung bình tích lũy: </div>
    <span>{{ studentCpa.CPA }}</span>
      </div>
    <div class="flex gap-1">
      <div>Tổng số tín chỉ tích lũy: </div>
    <span>{{ studentCpa.total_credits }}</span>
    </div>
    </div>
  </div>

  <div class="consultant-container mx-6 bg-[#ffffff]" v-else>
   <div class="ml-9 my-3">
    <h2>Danh sách sinh viên</h2>
    <h3>Lớp: <select v-model="selectedClass">
      <option v-for="className in userClass" :value="className">{{ className }}</option>
    </select> </h3>
     
   </div>
    <table class="student-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>MSSV</th>
          <th>Sinh viên</th>
          <th>Điểm</th>
          <th>Hành động</th>
        </tr>
      </thead>  
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td>{{ student.userId }}</td>
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
      selectedClass: ""
    };
  },
  watch: {
    async selectedClass(newVal) {
      this.students = await this.useStudent.getData(newVal);
     },
  },
  async mounted() {
    if (this.userRole === 'student') {
    this.courses = await this.useScore.getCourses(this.studentId); 
    this.studentCpa = await this.useStudent.getStudentDetails(this.studentId);
    console.log(this.studentCpa);
    this.isShowSpinner = false;
    }
    else {
      this.selectedClass = this.userClass[0];
      this.students = await this.useStudent.getData(this.selectedClass);  
      console.log(this.students);
      this.isShowSpinner = false;
    }
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
    height: 400px;
    overflow-y: auto;
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

  ::-webkit-scrollbar {
  width: 10px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
    
</style>
