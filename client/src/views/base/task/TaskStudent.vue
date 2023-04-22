<template>
    <div>
      <NavTitle :title="pageTitle" />
      <div class="header-forum">
        <div
          class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded h-[450px] overflow-y-scroll"
        >
           
  
          <div v-for="(task, index) in tasks" :key="index" class="my-6">
            <a-card :title="task.task" style="width: 400px">
              <template #extra>
              <router-link :to="{ path: '/student/task/update/' + task._id + '/' + id }" >more</router-link> 
               </template>
               <div class="text-xs flex justify-end">
              {{ formatDate(task.createdAt) }}
            </div>
  
            <div
                class="flex justify-between"
                v-for="(item, index) in task.assignedStudents"
                :key="index"
              >
                <p>{{ item.studentId }}</p>
                <input
                  type="radio"
                  disabled
                  v-bind:value="item.isCompleted"
                  v-bind:checked="item.isCompleted"
                />
              </div>
              <div v-if="task.duration" class="text-xs flex justify-end">
              Hạn nộp: {{ format(task.duration) }}
            </div>
            </a-card>
          </div>
        </div>
  
        <!-- <div>
          <section class="tasks-container">
            <p class="loading-text">njdnm</p>
            <div class="tasks"></div>
          </section>
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    toRaw,
    computed,
  } from "vue";
  import { useStudentStore } from "../../../stores/student.js";
  import { useTaskStore } from "../../../stores/task.js";
  
  import { RouterLink, RouterView } from "vue-router";
  import { getUsername, getId } from "../../../utils/getInfoUser.js";
  import { message } from "ant-design-vue";
  import NavTitle from "../NavBar/NavTitle.vue";

  export default defineComponent({
    setup() {
      const formRef = ref();
      const visible = ref(false);
  
      const formState = reactive({
        task: "",
        description: "",
        complete: null,
        assignedStudents: [],
        // _class: getClass(),
      });
  
      const useTask = useTaskStore();
      const isComplete = ref();
      const tasks = ref([]);
      const studentsId = ref([]);
      const id = getId(); 
      const pageTitle = 'Danh sách nhiệm vụ được giao'; 

      onMounted(async () => {
        tasks.value = await useTask.getTasksOfStudent(id);
        
      });
  
      function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }

    function format(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
      return {
        formState,
        formRef,
        value: ref([]),
        tasks,
        useTask,
        id,
        pageTitle,
        formatDate,
        format 
      };
    },
    components: {
      NavTitle
    }
  });
  </script>
  
  <style scoped>
  :deep .ant-switch-checked ant-switch {
    background-color: #1890ff;
  }
  </style>
  