<template>
  <div class="mb-4 px-2 flex justify-center items-center">
    <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->

    <form @submit.prevent="submitForm" class="add--course m-6 bg-[#fff] p-4">
      <div class="task-title text-center">
        <h2>Update Task</h2>
      </div>

      <div class="task-content">
        <div class="flex justify-between my-2">
          <h3 class="mr-4">Task</h3>
          <span class="ml-4">
            {{ useTask.tasks.task }}
          </span>
        </div>

        <div class="grid grid-cols-2 w-[500px] my-2">
          <h3 class="mr-4">Description</h3>
          <div class="bg-[#f1f3f7] p-2">
            <span class="ml-4">
              {{ useTask.tasks.description }}
            </span>
          </div>
        </div>

        <div
          v-for="(student, index) in this.useTask.tasks.assignedStudents"
          :key="index"
        >
          <div v-if="student.studentId === username" class="grid grid-cols-2">
            <h3>{{ student.studentId }}</h3>
            <span>
              <input type="checkbox" v-model="student.isCompleted" />
            </span>
          </div>
        </div>
      </div>

      <div class="flex my-2 justify-center">
        <button class="flex bg-[#645bf5] text-[#ffffff] rounded p-3" type="submit">Lưu</button>
      </div>
    </form>

    <a-alert v-show="useTask.successMsg === true" message="Thêm sinh viên thành công" type="success" show-icon />
    <a-alert v-show="useTask.errorMsg === true" message="Thêm sinh viên thất bại" type="error" show-icon />
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useTaskStore } from "../../../stores/task.js";
import { getUsername, getId } from "../../../utils/getInfoUser.js";

export default {
  data() {
    return {
      task: "",
      assignedStudents: [{ studentId: "", isCompleted: null }],
      description: "",
      taskId: useRoute().params.taskId,
      useTask: useTaskStore(),
      task: [],
      studentId: getId(),
      username: getUsername(),
      status: null,

    };
  },
  async mounted() {
    console.log(this.taskId);
    this.task = await this.useTask.getTaskDetails(this.taskId);
    console.log(this.task);
  },
  methods: {
    submitForm() {
      const student = this.useTask.tasks.assignedStudents.find(
        (item) => item.studentId === this.username
      );
        
      if (student) {
        this.status = student.isCompleted;
        console.log(this.status);
      } else {
        console.log(`Không tìm thấy phần tử với studentId = ${this.username}`);
      }

      const isCompleted = {
        isCompleted: this.status
      };

      this.useTask.updateStatusTask(this.taskId, this.studentId, isCompleted); 
      console.log(isCompleted);
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
</style>
"
