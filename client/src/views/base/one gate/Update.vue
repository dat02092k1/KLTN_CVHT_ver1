<template>
    <div>
      <NavTitle :title="pageTitle" />

      <div class="mb-4 px-2 ">
      <!-- <label class="block mb-2 text-sm" for="pretext-input">Học kỳ</label> -->
      <div class="flex items-start">
        <router-link   :to="{ path: '/consultant/onegate'}" >
      <button class="bg-[#ef1419] rounded text-[#ffffff] ml-6 my-2 p-2">Quay lại</button>
              </router-link>
      </div>
       
      <div class="flex justify-center">
        <form @submit.prevent="submitForm" class="add--course m-6 bg-[#fff] p-4 w-[50%] rounded">
        <div class="task-title text-center my-2">
          <h2>Cập nhật trạng thái</h2>
        </div>
  
        <div class="task-content my-2">
          <div class="flex my-2">
            <h3 class="mr-4">Sinh viên</h3>
            <span class="ml-4">
                {{ this.form.username }}
            </span>
          </div>   
              <div class="flex">
                <h3>Trạng thái</h3>
             
              <a-select class="px-6" v-model:value="selectedOption" @change="handleSelectChange">
    <a-select-option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </a-select-option>  
  </a-select>
              </div>
           
        </div>
  
        <div class="flex my-2 justify-center">
          <button class="flex bg-[#035e8c] text-[#ffffff] rounded p-3" type="submit">Lưu</button>
        </div>
      </form>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="w-[200px]">
        <a-alert v-show="useForm.successMsg === true" message="Cập nhật thành công" type="success" show-icon />
    <a-alert v-show="useForm.errorMsg === true" message="Cập nhật thất bại" type="error" show-icon />
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import { RouterLink, RouterView, useRoute } from "vue-router";
  import { useFormStore } from "../../../stores/form.js";
  import { getUsername, getId } from "../../../utils/getInfoUser.js";
  import NavTitle from "../NavBar/NavTitle.vue";

  export default {
    components: { NavTitle },
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
        pageTitle: "Cập nhật trạng thái biểu mẫu",
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
    },
    methods: {
      async submitForm() {
        const status = this.selectedOption;        
        const form = {
          status: status
        }
          await this.useForm.editForm(this.formId, form);
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
  