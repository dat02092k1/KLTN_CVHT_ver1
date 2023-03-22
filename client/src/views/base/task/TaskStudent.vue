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
              <!-- <p> Description: " {{ task.description }} "</p> -->
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
        createdBy: getId(),
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
  
      return {
        formState,
        formRef,
        value: ref([]),
        tasks,
        useTask,
        id,
        pageTitle
      };
    },
    components: {
      NavTitle
    }
  });
  </script>
  
  <style scoped>
  ::v-deep .ant-switch-checked ant-switch {
    background-color: #1890ff;
  }
  </style>
  