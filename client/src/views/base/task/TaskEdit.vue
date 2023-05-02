<template>
    <div class="task-form mb-4 px-2 mx-auto flex justify-center items-center relative">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
      <router-link class="absolute top-3 left-4"  :to="{ path: '/consultant/task'}" >
      <button class="bg-[#ef1419] rounded text-[#ffffff] p-2">Quay lại</button>
              </router-link>
              
      <form @submit.prevent="submitForm" class="add--course m-6 p-3 bg-[#fff]">
        <div class="task flex">
          <div
            class="items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
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
              required
            />
          </div>
        </div>

        <div class="task flex mt-3">
          <div
            class="items-center px-4 py-1 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none"
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
              @change="handleDes"
            > </textarea>
          </div>
        </div>
  
        <a-form-item
                name="assignedStudents"
                label="Sinh viên"
              >
                <a-select
                  v-model:value="this.formState.studentAssign"
                  mode="tags"
                  style="width: 100%"
                  placeholder="Chọn sinh viên"
                  :options="optionStudents"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>

        <div>
          <div
            class="items-center px-1 py-1"
          >
            Thời hạn: 
          </div>
          <a-date-picker
        v-model:value="this.useTask.tasks.duration"
        show-time
        type="date"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
        </div>

        <div class="flex flex-col items-center my-2">
        <button class="flex p-2 rounded text-[#fff] bg-[#324f90]" type="submit">Lưu</button>
        </div>
      </form>

      <div class="w-[60%] h-[60%] flex flex-col items-center">
         <h3>
          Tỉ lệ sinh viên hoàn thành nhiệm vụ đề ra
         </h3>
        <Pie v-if="loaded" :data="chartData" :options="chartOptions"/>
      </div>
    </div>

    
  </template>
  
  <script>
    import { RouterLink, RouterView, useRoute } from "vue-router";
    import { useTaskStore } from "../../../stores/task.js";
    import { useStudentStore } from "../../../stores/student.js";
    import { getAccessToken } from "../../../utils/config.js";
    import { getId } from "../../../utils/getInfoUser.js";
    import { Pie } from 'vue-chartjs'
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { message } from "ant-design-vue";

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
        useStudent: useStudentStore(),
        task: [],
        loaded: false,
      chartData: null,
      data: [],
      chartOptions: null,
      students: [],
      studentIds: [],
      formState: {
        studentAssign: []
      }          
      };
    },
    async mounted() { 
        this.task = await this.useTask.getTaskDetails(this.taskId);
        console.log(this.task);
        this.students = await this.useStudent.getData(this.task._class); 
        
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

          this.formState.studentAssign = this.useTask.tasks.assignedStudents.map((student) => ({
                    value: student.student,
                    label: student.studentId,
                }));

          this.studentIds = this.useTask.tasks.assignedStudents.map((student) => ({
        student: student.student,
      }));

            console.log(this.formState.studentAssign);
            console.log(this.studentIds);
          this.loaded = true
    },
    computed: {
      optionStudents() {
        if (this.students && this.students.length > 0) {
            
            return this.students.map((student) => ({
                value: student._id,
                label: student.userId,
            }));
        } else {
            return [];
        }
      }
    },
    methods: {
      async submitForm() {
        if (this.studentIds.length === 0) {
          alert("Chưa chọn sinh viên");
          return;
        }

        const taskDetails = {
        task: this.useTask.tasks.task,
        description: this.useTask.tasks.description,
        duration: this.useTask.tasks.duration,
        assignedStudents: this.studentIds,
      };

      console.log(taskDetails);
      const res = await this.useTask.editTask(this.taskId, taskDetails);

      if (res.status === 200) {
        setTimeout(() => {
          message.success({
          content: 'Cập nhật thành công!',
          duration: 2,
        });
      }, 1000);
      }
      else {
        setTimeout(() => {
          message.error({
          content: 'Cập nhật thất bại!',
          duration: 2,
        });
      }, 1000);
      }
      },
      handleChange(value) {
        console.log(value);
        this.studentIds = value.map((studentId) => ({
        student: studentId,
      }));
      console.log(this.studentIds);
    },
    handleDes() {
      console.log(this.studentIds);
      console.log(this.useTask.tasks.description);
    },
    
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

  .add--course {
    height: 320px;
    width: 400px;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
  </style>
  