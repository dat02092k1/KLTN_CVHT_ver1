<template>
    <div class="mb-4 px-2 flex justify-center items-center">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
  
      <form @submit.prevent="submitForm" class="add--course m-6 bg-[#fff]">
        <div class="task flex">
          <div
            class="bg-gray-100  items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
            Task
          </div>
          <div class="flex-1">
            <input
              id="pretext-input"
              v-model="this.useTask.tasks.task"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              placeholder="Học kỳ"
            />
          </div>
        </div>

        <div class="task flex mt-3">
          <div
            class="bg-gray-100  items-center px-4 py-1 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
            Mô tả
          </div>
          <div class="flex-1">
            <textarea
              id="pretext-input"
              v-model="this.useTask.tasks.description"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              placeholder="Mô tả"
            />
          </div>
        </div>
        <div
          class="student grid grid-cols-6 gap-3"
          v-for="(student, index) in this.useTask.tasks.assignedStudents" :key="index"
        >
          <div
            class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
          {{ index + 1 }}
          </div>
           
          <div
            class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
            Sinh viên
          </div>
          <div class="">
            <input
              id="pretext-input"
              class="w-full border px-4 py-2 rounded-r focus:border-blue-500 focus:shadow-outline outline-none"
              type="text"
              v-model.number="student.studentId"
              placeholder="Điểm"
            />
          </div>
          <div
            class="bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
          >
          Trạng thái
          </div>
          <div class="">
            <input type="checkbox" v-model="student.isCompleted">
          </div>
          <button @click.prevent="removeStudent(index)">
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
  
        <div class="flex flex-col  ">
          <button class="flex" @click.prevent="addStudent">Thêm sinh viên</button>
  
        <button class="flex" type="submit">Lưu</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
    import { RouterLink, RouterView, useRoute } from "vue-router";
    import { useTaskStore } from "../../../stores/task.js";
    import { getId } from "../../../utils/getInfoUser.js";
  
  export default {
    data() {
      return {
        task: "",
        assignedStudents: [{ studentId: "", isCompleted: null }],
        description: "",  
        taskId: useRoute().params.id,
        useTask: useTaskStore(),
        task: [],
        createdBy: getId() 
      };
    },
    async mounted() { 
        this.task = await this.useTask.getTaskDetails(this.taskId);
        console.log(this.task)
    },
    methods: {
        addStudent() {
        console.log(this.useTask.tasks.assignedStudents)
        this.useTask.tasks.assignedStudents.push({ studentId: "", isCompleted: null });
      },
        removeStudent(index) {
        if (index == 0) { alert('cant remove anymore'); }
        else {
            this.useTask.tasks.assignedStudents.splice(index, 1);
        }
      },
      submitForm() {
        const taskDetails = {
        task: this.useTask.tasks.task,
        description: this.useTask.tasks.description,
        assignedStudents: this.useTask.tasks.assignedStudents,
        createdBy: this.useTask.tasks.createdBy
      };

      console.log(taskDetails);

      this.useTask.editTask(this.taskId, this.task);
       
      }
    },
  };
  </script>
  
  <style scoped>
  .student {
    display: flex;
    align-items: center;
    height: 50px;
  }
  
  .student input {
    height: 100%;
  }
  </style>
  "
  