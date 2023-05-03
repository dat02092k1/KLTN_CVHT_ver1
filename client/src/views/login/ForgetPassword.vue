<template>
         <div class="login-container fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div class="absolute">
            <div class="pb-12">
                <img src="../../assets/images/logo_banner.png" alt="">
            </div>
            <div>
        <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="emailAddress"
      :rules="[{ required: true, message: 'Chưa nhập địa chỉ email!' }]"
    >
      <a-input v-model:value="formState.emailAddress" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
        </a-form>
            </div>
            <div class="w-[400px]">
        <a-alert v-show="useAuth.successMsg === true" message="Hệ thống đã gửi link reset mật khẩu kèm mã xác nhận đến mail của bạn" type="success" show-icon />
    <a-alert v-show="useAuth.errorMsg === true" message="Gửi mã xác nhận thất bại" type="error" show-icon />
      </div>
        </div>

        
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth.js';

export default defineComponent({
  setup() {
    const formState = reactive({
      emailAddress: '',
    });
    const onFinish = values => {
      console.log('Success:', values);
      useAuth.forgetPassword(formState.emailAddress);

    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const useAuth = useAuthStore();
    return {
      formState,
      onFinish,
      onFinishFailed,
      useAuth
    };
  },
});
</script>

<style scoped>

</style>