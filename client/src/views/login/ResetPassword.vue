<template>
    <div class="bg-[#fff] h-full flex justify-center items-center">
        <a-form
        class="flex-[0.5]"
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="Password" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Mã xác thực:" name="token">
      <a-input v-model:value="formState.token" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth.js';

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive({
      pass: '',
      checkPass: '',
      token: undefined,
    });
     
    const useAuth = useAuthStore();

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
      }],
      token: [{
        trigger: 'change',
      }],
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
      console.log(values, formState);
      const data = {
        token: formState.token,
        password: formState.pass
      }
      useAuth.resetPassword(data)
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
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
    };
  },
});
</script>