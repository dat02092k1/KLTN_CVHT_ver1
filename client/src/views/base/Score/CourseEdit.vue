<template>
  <div class="main">
    <nav-title :title="pageTitle" class="p-4"/>

    <div class="mb-4 px-2 flex justify-center items-center h-[450px] overflow-y-auto">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
  
      <form @submit.prevent="submitForm" class="add--course m-6 p-3 bg-[#fff] h-[450px] overflow-y-auto">
        <div class="semester flex my-1">
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
              v-model="this.useScore.courseDetails.semesterCode"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              placeholder="Mã kỳ học"
              required
            />
          </div>
        </div> 

        <div
          class="subject flex my-1"
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
              required
            />
          </div>
          <div
            class="bg-gray-100 w-[110px] flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
          Mã môn
          </div>
          <div class="">
            <input
              id="pretext-input"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              v-model="subject.code"
              placeholder="Môn học"
              required
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
              required
            />
          </div>
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
          <button class="mx-3" @click.prevent="removeSubject(index)">
            <i class="fa-solid fa-square-minus"></i>
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
    </div>
    <div class="mx-6 flex justify-center">
      <a-alert v-show="useScore.successMsg === true" message="Cập nhật thành công" type="success" show-icon />
    <a-alert v-show="useScore.errorMsg === true" message="Cập nhật thất bại" type="error" show-icon />
    </div>
  </div>
     
  </template>
  
  <script>
    import { RouterLink, RouterView, useRoute } from "vue-router";
    import { useScoreStore } from "../../../stores/score.js";
    import NavTitle from "../NavBar/NavTitle.vue";

  export default {
    data() {
      return {
        semester: "",
        subjects: [{ name: "", code: "", credits: "", score: "" }],
        courseId: useRoute().params.id,
        useScore: useScoreStore(),
        course: [],
        pageTitle: "Cập nhật kết quả học tập"
      };
    },
    async mounted() { 
        this.course = this.useScore.getCourseDetails(this.courseId);
    },
    methods: {
      addSubject() {
        console.log(this.useScore.courseDetails.subjects)
        this.useScore.courseDetails.subjects.push({ name: "", code: "", credits: "", score: "" });
       
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
      console.log(course); 
      this.useScore.editCourse(this.courseId, course); 
      }
    },
    components: {
      NavTitle
    }
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

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
  </style>
  