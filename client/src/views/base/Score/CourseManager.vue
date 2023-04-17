<template>

    <div>
      <div>
        <div class="add-header">
      <NavTitle :title="pageTitle" />
    </div>
      </div>
      <div class="class-list">
         
        <ul class="flex flex-col w-[50%]">
      <li v-for="_class in state.classes" :key="_class.id" class="flex justify-between bg-[#fff] ">
        <span class="text-[#3fa9ff]">
                    {{ _class.name }}
                </span>
              <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <i class="fa-solid fa-ellipsis"></i>
     </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <router-link :to="{ path: '/manager/student/' + _class.name }" >
                <span>
                    Danh sách sinh viên
                </span>
              </router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link :to="{ path: '/manager/course/' + _class.name }" >
                <span>
                    Kết quả học tập
                </span>
              </router-link>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
      </li>
    </ul>
    </div>
    </div>
  </template>
  
  <script>
  import { reactive, onMounted } from 'vue'
  import { useStudentStore } from "../../../stores/student.js";
  import { defineComponent } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import NavTitle from "../../base/NavBar/NavTitle.vue";

  export default {
    name: 'ClassList',
    components: {
    DownOutlined, NavTitle
  },
    setup() {
      const state = reactive({
        classes: []
      })
      
      const useStudent = useStudentStore();

      const pageTitle = "Danh sách các lớp";

      onMounted(async () => {
        const response = await useStudent.getAllClasses();
        
        state.classes = response;
        console.log(state.classes);
      })
  
      return {
        state,
        pageTitle
          }
    }
  }
  </script>
  
  <style scoped>
  .class-list {
    
    height: 450px;
    overflow-y: auto;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0 60px;
  }
  
  li {
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fff;
    color: #333;
    text-align: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
  }
  
  li:hover {
    background-color: #e2e2e2;
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  li:focus {
    outline: none;
    background-color: #fff;
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  