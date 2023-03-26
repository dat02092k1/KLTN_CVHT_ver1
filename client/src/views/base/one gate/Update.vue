<template>
    <div class="mb-4 px-2 flex justify-center items-center">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
  
      <form @submit.prevent="submitForm" class="add--course m-6 bg-[#fff] p-4">
        <div class="task-title text-center">
          <h2>Update status</h2>
        </div>
  
        <div class="task-content">
          <div class="flex justify-between my-2">
            <h3 class="mr-4">Task</h3>
            <span class="ml-4">
                {{ this.form.username }}
            </span>
          </div>
   
  
           
              <h3>{{ this.form.username }}</h3>
             
              <a-select class="p-6" v-model:value="selectedOption" @change="handleSelectChange">
    <a-select-option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </a-select-option>  
  </a-select>
           
        </div>
  
        <div class="flex my-2 justify-center">
          <button class="flex bg-[#645bf5] text-[#ffffff] rounded p-3" type="submit">Lưu</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { RouterLink, RouterView, useRoute } from "vue-router";
  import { useFormStore } from "../../../stores/form.js";
  import { getUsername, getId } from "../../../utils/getInfoUser.js";
  
  export default {
    data() {
      return {
        task: "",
        assignedStudents: [{ studentId: "", isCompleted: null }],
        description: "",
        formId: useRoute().params.id,
        useForm: useFormStore(),
        form: [],
        studentId: getId(),
        username: getUsername(),
        status: null,
        selectedOption: null,
        options:  [
      { value: 'pending', label: 'Đang duyệt' },
      { value: 'accepted', label: 'Chấp nhận' },
      { value: 'rejected', label: 'Từ chối' },
    ]
      };
    },
    async mounted() {
      this.form = await this.useForm.getDetailsForm(this.formId);
      this.selectedOption = this.form.status;
      console.log(this.form);
    },
    methods: {
      async submitForm() {
        const status = this.selectedOption;        
  
          await this.useForm.editForm(this.formId, status);
      },
      handleSelectChange(value) {
        console.log(value);
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
  