<template>
    <div class="task-form mb-4 px-2 mx-auto flex justify-center items-center">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
  
      <form @submit.prevent="submitForm" class="add--course m-6 p-3 bg-[#fff]">
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
          class="student grid grid-cols-6 gap-3 my-5"
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
  
        <div>
          <a-date-picker
        v-model:value="this.useTask.tasks.duration"
        show-time
        type="date"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
        </div>
        <div class="flex flex-col  ">
          <button class="flex" @click.prevent="addStudent">Thêm sinh viên</button>
  
        <button class="flex" type="submit">Lưu</button>
        </div>
      </form>

      <div class="w-[60%] h-[60%] flex flex-col items-center">
         <h3>
          Tỉ lệ sinh viên hoàn thành nhiệm vụ đề ra
         </h3>
        <Pie v-if="loaded" :data="chartData" :options="chartOptions"/>
      
      </div>

      <a-alert v-show="useTask.successMsg === true" message="Thêm sinh viên thành công" type="success" show-icon />
    <a-alert v-show="useTask.errorMsg === true" message="Thêm sinh viên thất bại" type="error" show-icon />
    </div>

    
  </template>
  
  <script>
    import { RouterLink, RouterView, useRoute } from "vue-router";
    import { useTaskStore } from "../../../stores/task.js";
    import { getAccessToken } from "../../../utils/config.js";
    import { getId } from "../../../utils/getInfoUser.js";
    import { Pie } from 'vue-chartjs'
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

  ChartJS.register(ArcElement, Tooltip, Legend)
    export default {
      components: { Pie },
    data() {
      return {
        task: "",
        assignedStudents: [{ studentId: "", isCompleted: null }],
        description: "",  
        duration: undefined, 
        taskId: useRoute().params.id,
        useTask: useTaskStore(),
        task: [],
        createdBy: getId(),
        loaded: false,
      chartData: null,
      data: [],
      chartOptions: null,
      };
    },
    async mounted() { 
        this.task = await this.useTask.getTaskDetails(this.taskId);

        const completedStudents = this.task.assignedStudents.filter(student => student.isCompleted === true);

        const numCompletedStudents = completedStudents.length;
        const remainStudents = this.task.assignedStudents.length - numCompletedStudents;

        this.chartData = {
          labels: this.task,
          datasets: [
          {
            label: 'Thống kê số lượng sinh viên hoàn thành',
            backgroundColor: ['#cc1357', '#63ccf2'],
            data: [numCompletedStudents, remainStudents]
          }
          ]
          }

          this.loaded = true
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
        duration: this.useTask.tasks.duration,
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

  .task-form {
    height: 450px;
    overflow-y: scroll;
  }
  </style>
  