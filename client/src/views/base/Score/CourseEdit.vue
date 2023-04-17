<template>
    <div class="mb-4 px-2 flex justify-center items-center">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
  
      <form @submit.prevent="submitForm" class="add--course m-6 p-3 bg-[#fff]">
        <div class="semester flex">
          <div
            class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
            Học kỳ
          </div>
          <div class="">
            <input
              id="pretext-input"
              v-model="this.useScore.courseDetails.semester"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              placeholder="Học kỳ"
            />
          </div>
        </div>

        <div class="semester flex">
          <div
            class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
            Mã kỳ học
          </div>
          <div class="">
            <input
              id="pretext-input"
              v-model="this.useScore.courseDetails.semesterCode"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              placeholder="Mã kỳ học"
            />
          </div>
        </div> 

        <div
          class="subject flex"
          v-for="(subject, index) in this.useScore.courseDetails.subjects" :key="index"
        >
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
            />
          </div>
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
            />
          </div>
          <div
            class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
            Số tín
          </div>
          <div class="">
            <input
              id="pretext-input"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
             
              placeholder="Số tín chỉ"
              v-model.number="subject.credits" type="text"
            />
          </div>
          <button class="mx-3" @click.prevent="removeSubject(index)">
            <i class="fa-solid fa-square-minus"></i>
          </button>
        </div>
  
        <div class="flex flex-col  ">
          <button class="flex" @click.prevent="addSubject">Thêm môn học</button>
  
        <button class="flex" type="submit">Lưu</button>
        </div>
      </form>

      <a-alert v-show="useScore.successMsg === true" message="Thêm sinh viên thành công" type="success" show-icon />
    <a-alert v-show="useScore.errorMsg === true" message="Thêm sinh viên thất bại" type="error" show-icon />
    </div>
  </template>
  
  <script>
    import { RouterLink, RouterView, useRoute } from "vue-router";
    import { useScoreStore } from "../../../stores/score.js";
  
  export default {
    data() {
      return {
        semester: "",
        subjects: [{ name: "", credits: "", score: "" }],
        courseId: useRoute().params.id,
        useScore: useScoreStore(),
        course: []
      };
    },
    async mounted() { 
        this.course = this.useScore.getCourseDetails(this.courseId);
    },
    methods: {
      addSubject() {
        console.log(this.useScore.courseDetails.subjects)
        this.useScore.courseDetails.subjects.push({ name: "", credits: "", score: "" });
       
      },
      removeSubject(index) {
        if (index == 0) { alert('cant remove anymore'); }
        else {
            this.useScore.courseDetails.subjects.splice(index, 1);
        }
      },
      submitForm() {
        const course = {
        semester: this.useScore.courseDetails.semester,
        studentId: this.useScore.courseDetails.student,
        subjects: this.useScore.courseDetails.subjects,
        semesterCode: this.useScore.courseDetails.semesterCode
      };

      this.useScore.editCourse(this.courseId, course); 
      }
    },
  };
  </script>
  
  <style scoped>
  .subject {
    display: flex;
    align-items: center;
    height: 50px;
  }
  
  .subject input {
    height: 100%;
  }
  </style>
  "
  