<template>
  <div>
    <nav-title :title="pageTitle" />

    <div class="flex justify-between">
      <router-link class="" :to="getCoursePath()">
        <button class="bg-[#ef1419] rounded text-[#ffffff] ml-6 my-2 p-2">
          Quay lại
        </button>
      </router-link>

      <div v-if="userRole === 'manager'">
        <router-link class="mr-6" :to="{ path: '/student/course/add/' + id }">
        <button class="bg-[#324f90] rounded text-[#ffffff] ml-6 my-2 p-2">
          Thêm điểm
        </button>
      </router-link>

      <router-link class="mr-6" :to="{ path: '/student/import-courses/' + id }" v-show="userRole === 'manager'">
        <button class="bg-[#324f90] rounded text-[#ffffff] ml-6 my-2 p-2">
          Import excel
        </button>
      </router-link>
      </div>
    </div>
    <div class="">
      <div class="table-container mx-3">
        <table v-for="(course, index) in courses" :key="index" class="w-[80%]">
          <thead>
            <tr class="flex justify-between items-center my-2" v-show="userRole === 'manager'">
              <router-link
                :to="{ path: '/student/course/edit/' + course._id }"
                class="bg-[#51a6ef] text-[#fff] rounded p-2"
              >
                Cập nhật
              </router-link>

              <a-popconfirm
                title="Title"
                @confirm="confirm(course._id, id)"
                @cancel="cancel"
              >
                <button
                  class="bg-[#ef1419] rounded text-[#ffffff] ml-6 my-2 p-2"
                >
                  Xóa
                </button>
              </a-popconfirm>
            </tr>
            <tr></tr>
            <tr>
              <th>STT</th>
              <th>Môn học</th>
              <th>Mã môn học</th>
              <th>Số tín</th>
              <th>Điểm số</th>
              <th>Điểm chữ</th>
            </tr>

            <tr>
              <th class="semester" colspan="6">{{ course.semester }} Mã kỳ học: {{ course.semesterCode }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in course.subjects" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="w-[250px]">{{ item.name }}</td>
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

    <div class="mx-6 my-1">
      <div class="flex gap-1 font-bold">
        <div class="font-bold">Tổng trung bình tích lũy: </div>
    <span class="font-bold">{{ studentCpa }}</span>
      </div>
    <div class="flex gap-1 font-bold">
      <div>Tổng số tín chỉ tích lũy: </div>
    <span>{{ this.student.total_credits }}</span>
    </div>
    </div>
    
  </div>
</template>

<script>
import NavTitle from "../NavBar/NavTitle.vue";
import { useScoreStore } from "../../../stores/score.js";
import { useStudentStore } from "../../../stores/student.js";
import { message } from "ant-design-vue";
import { getRole, getId, getClass } from "../../../utils/getInfoUser.js";
import { getAccessToken } from "../../../utils/config.js";
import { notification } from "ant-design-vue";

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
      studentCpa: "",
      studentClass: "",
    };
  },
  async mounted() {
    this.courses = await this.useScore.getCourses(this.id);
     
    this.student = await this.useStudent.getStudentDetails(this.id);
     
    this.studentCpa = this.student.CPA;
    this.studentClass = this.student._class[0].name;
  },
  methods: {
    roundToTwoDecimalPlaces(num) {
      return num.toFixed(2);
    },
    getCoursePath() {
      if (this.userRole === "manager") {
        return { path: "/manager/course/" + this.studentClass };
      } else if (this.userRole === "consultant") {
        return { path: "/student/course" };
      }
    },
    async confirm(courseId, studentId) {
      console.log(courseId, studentId);
      this.useScore.deleteCourse(courseId, studentId);
      this.courses = await this.useScore.getCourses(studentId);
    },
    cancel(e) {
      console.log(e);
      message.error("Click on No");
    },
    openNotification() {
      notification.open({
        message: "Notification Title",
        description: "description.",
      });

      setTimeout(() => {
        notification.open({
          message: "New Title",
          description: "New description.",
        });
      }, 1000);
    },
  },
  computed: {
    storeSuccessMsg() {
      return this.useScore.successMsg;
    },
  },
  watch: {
    storeSuccessMsg(value) {
      if (value) {
        setTimeout(() => {
        notification.open({
          message: "New Title",
          description: "New description.",
        });
      }, 1000);
      }
    },
  },
  components: { NavTitle },
};
</script>

<style scoped>
.table-container {
  height: 350px;
  overflow-y: auto;
  margin: 0 26px;
}

table {
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
}
th,
td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 10px;
}
th {
  background-color: #f2f2f2;
}

tr td {
  background-color: #ffffff;

}
tr .semester {
  background-color: #ffffff;
  text-align: left;
   
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
