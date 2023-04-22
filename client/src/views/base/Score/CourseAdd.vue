<template>
  <div class="main">
    <nav-title :title="pageTitle" class="p-4"/>

    <div class="mb-4 px-2 flex flex-col">
    <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->

    <router-link class="" :to="getCoursePath()" >
      <button class="bg-[#ef1419] rounded text-[#ffffff] ml-6 my-2 p-2">Quay lại</button>
              </router-link>
    <form @submit.prevent="submitForm" class="add--course m-6 p-2 bg-[#fff] h-[350px] overflow-y-auto">
      <div class="semester flex my-1">
        <div
          class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
        >
          Học kỳ
        </div>
        
        <div class="">
          <input
            id="pretext-input"
            v-model="semester"
            class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
            type="text"
            placeholder="Học kỳ"
             required
          />
        </div>
      </div>
       
      <div class="semester flex my-1">
        <div
          class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
        >
          Mã kỳ học
        </div>
        
        <div class="">
          <input
            id="pretext-input"
            v-model="semesterCode"
            class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
            type="text"
            placeholder="Mã học kỳ"
            required
          />
        </div>
      </div>

      <div
        class="subject flex gap-1"
        v-for="(subject, index) in subjects" :key="index"
      >
        <div class="flex">
          <div
          class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
        >
        {{ index + 1 }}
        </div>
        <div class="">
          <input
            id="pretext-input"
            class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
            type="text"
            v-model="subject.name"
            placeholder="Môn học"
            required
          />
        </div>
        </div>
        
        <div class="flex">
          <div
          class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
        >
          Mã 
        </div>
        <div class="">
          <input
            id="pretext-input"
            class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
            type="text"
            v-model.number="subject.code"
            placeholder="Mã môn học"
            required
          />
        </div>
        </div>
        
        <div class="flex">
          <div
          class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
        >
          Điểm
        </div>
        <div class="">
          <input
            id="pretext-input"
            class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
            type="text"
            v-model.number="subject.score"
            placeholder="Điểm"
            required
          />
        </div>
        </div>

        <div class="flex">
          <div
          class="bg-gray-100 w-[110px] flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
        >
          Số tín
        </div>
        <div class="">
          <input
            id="pretext-input"
            class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
           
            placeholder="Số tín chỉ"
            v-model.number="subject.credits" type="number"
            required
          />
        </div>
        </div>

        <button @click.prevent="removeSubject(index)">
          <i class="fa-solid fa-minus"></i>
        </button>
      </div>

      <div class="flex flex-col  ">
        <button class="flex" @click.prevent="addSubject">
          <div class="flex gap-1">
              <span>Thêm môn học</span> <span><i class="fa-solid fa-square-plus"></i></span> 
            </div>
          </button>

          <div class="flex justify-center items-center">
            <button class=" rounded p-2 bg-[#035e8c] text-[#fff] w-[50px]" type="submit">Lưu</button>
          </div>
       
      </div>
    </form>

    <a-alert v-show="useScore.successMsg === true" message="Thêm sinh viên thành công" type="success" show-icon />
    <a-alert v-show="useScore.errorMsg === true" message="Thêm sinh viên thất bại" type="error" show-icon />
  </div>
  </div>
  
</template>

<script>
  import { RouterLink, RouterView, useRoute } from "vue-router";
  import { useScoreStore } from "../../../stores/score.js";
  import { useStudentStore } from "../../../stores/student.js";
  import { getRole } from "../../../utils/getInfoUser.js";
  import NavTitle from "../NavBar/NavTitle.vue";

export default {
  data() {
    return {
      semester: "",
      subjects: [{ name: "", code: "", credits: "", score: "" }],
      studentId: useRoute().params.id,
      useScore: useScoreStore(),
      useStudent: useStudentStore(),
      semesterCode: null,
      student: [],
      userRole: getRole(),
      pageTitle: "Thêm kết quả học tập"
    };
  },
  methods: {
    addSubject() {
      this.subjects.push({ name: "", code: "", credits: "", score: "" });
    },
    removeSubject(index) {
      if (index == 0) { alert('cant remove anymore'); }
      else {
      this.subjects.splice(index, 1);
      }
    },
    submitForm() {
      const course = {
        semester: this.semester,
        studentId: this.studentId,
        subjects: this.subjects,
        semesterCode: this.semesterCode
      };

      this.useScore.addCourses(course);

      console.log(course);
    },
    getCoursePath() {
      return { path: "/student/course/" + this.studentId };
    }
  },
  async mounted() {
    this.student = await this.useStudent.getStudentDetails(this.studentId);
  },
  components: { NavTitle }
};
</script>

<style scoped>
.main {
  padding: 14px 20px;
  width: calc(100% - 250px);
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
}

.subject {
  display: flex;
  align-items: center;
  height: 50px;
}

.subject input {
  height: 100%;
}
</style>

