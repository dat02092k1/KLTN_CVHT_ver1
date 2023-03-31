<template>
    <div>
        <div class="login-container fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div class="absolute">
            <div class="pb-12">
                <img src="../../assets/images/logo_banner.png" alt="">
            </div>
            <div>

            <a-alert v-show="this.store.errorMsg === true" message="Sai thông tin tài khoản hoặc mật khẩu" type="error" show-icon />
            <!--
                // ANTD COMPONENTS
            -->
            <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    class="flex flex-col"
  >
    <a-form-item class="mb-5">
      <a-input class="pt-3 pb-3 px-1 h-12 w-full" v-model:value="formState.studentId" placeholder="Username">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item class="mb-5">
      <a-input-password class="pt-3 pb-3 px-1 h-12 w-full" v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="h-12 w-full bg-[#409eff] text-white rounded"
        :disabled="formState.user === '' || formState.password === ''"
      >
        Đăng nhập
      </a-button>
    </a-form-item>
  </a-form>
  <!--
    ANTD COMPONENTS
  -->
            </div>
             
            <div>
                <button class="h-12 w-full bg-[#fff] text-[#409eff] rounded underline">Quên mật khẩu</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth.js";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { getClass } from "../../utils/getInfoUser.js";

export default {
  data() {
    return {
      studentId: '',
      password: '',   
      store: useAuthStore(),
      formState: {
        studentId: '',
      password: '',
      },
      userClass: getClass()
    };
  },
  mounted() {
      
},
  methods: {
    handleFinish(values) {
        console.log(values, this.formState);
        this.store.login(this.formState.studentId, this.formState.password);
    },
    handleFinishFailed(errors) {
        console.log(errors);
    },
    loginHandle() {
        console.log(this.studentId);
        this.store.login(this.studentId, this.password);  
    }
  },
  components: {
    UserOutlined, LockOutlined
  }
};
</script>
<style scoped>
.input__item {
    border: 1px solid #ccc;
}

.input__item:hover {
    border: 1px solid #409eff;
}

.input__item:focus {
    outline: none;
    border: 1px solid #409eff;
}

::v-deep .ant-form-inline .ant-form-item {
    margin-bottom: 1.25rem;
}
 
</style>