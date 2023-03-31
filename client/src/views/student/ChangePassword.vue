<template>
   <div>
    <div class="add-header">
      <NavTitle :title="pageTitle" />
    </div>

    <div class="mx-10 bg-[#ffffff] p-2">
        <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
    >
    <a-form-item has-feedback label="Mật khẩu cũ" name="oldPass">
        <a-input v-model:value="formState.oldPass" />
      </a-form-item>

      <a-form-item has-feedback label="Mật khẩu mới" name="pass">
        <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="Confirm" name="checkPass">
        <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
      </a-form-item>
       
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
    </div>

    <div class="toast-msg">
        <a-alert v-show="useAuth.successMsg === true" message="Thay đổi mật khẩu thành công" type="success" show-icon />
        <a-alert v-show="useAuth.errorMsg === true" message="Thay đổi mật khẩu thất bại" type="error" show-icon />
    </div>
   </div>
  </template>
  <script>
  import { defineComponent, reactive, ref } from 'vue';
  import { useAuthStore } from '../../stores/auth.js';
  import { useRoute } from "vue-router";
  import NavTitle from "../base/NavBar/NavTitle.vue";

  export default defineComponent({
    setup() {
      const formRef = ref();

      const formState = reactive({
        pass: '',
        checkPass: '',
        oldPass: '',
      });
      
      const useAuth = useAuthStore(); 

      const userId = useRoute().params.id;

      let validatePass = async (_rule, value) => {
        if (value === '') {
          return Promise.reject('Please input the password');
        } else {
          if (formState.checkPass !== '') {
            formRef.value.validateFields('checkPass');
          }
          return Promise.resolve();
        }
      };
      let validatePass2 = async (_rule, value) => {
        if (value === '') {
          return Promise.reject('Please input the password again');
        } else if (value !== formState.pass) {
          return Promise.reject("Two inputs don't match!");
        } else {
          return Promise.resolve();
        }
      };
      const rules = {
        oldPass: [{
            required: true,
        }],
        pass: [{
          required: true,
          validator: validatePass,
          trigger: 'change',
        },
        {
          min: 6,
          max: 15,
          message: "Mật khẩu cần có độ dài từ 6 đến 15 kí tự",
          trigger: "blur",
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'change',
        }]
      };
      const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      };
      const handleFinish = values => {
        const data = {
            oldPassword: formState.oldPass,
            newPassword: formState.pass
        }

        useAuth.changePassword(data, userId);
        console.log(values, data);
      };

      const handleFinishFailed = errors => {
        console.log(errors);
      };

      const resetForm = () => {
        formRef.value.resetFields();
      };

      const handleValidate = (...args) => {
        console.log(args);
      };

      const pageTitle = "Đổi mật khẩu";

      return {
        formState,
        formRef,
        rules,
        layout,
        handleFinishFailed,
        handleFinish,
        resetForm,
        handleValidate,
        useAuth,
        pageTitle
      };
    },
    components: { NavTitle },
  });
  </script>

  <style scoped>
  :deep(.ant-col-4) {
  flex: 40%;
  max-width: 100%;
}
</style>