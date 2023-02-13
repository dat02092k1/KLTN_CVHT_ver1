<template>
    <div>
        <div class="login-container fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div class="absolute">
            <div class="pb-12">
                <img src="../../assets/images/logo_banner.png" alt="">
            </div>
            <div class="form-item mb-5 relative">
                <div class="absolute top-3 left-2 text-[#889aa4]">
                    <i class="fa-solid fa-circle-user "></i>
                </div>
                <div class="input__item rounded">
                    <input class="pt-3 pb-3 pr-1 pl-8 h-12 w-full" type="text" tabindex="1" placeholder="Email" v-model="studentId" name="email">
                </div>
            </div>
            <div class="form-item mb-5 rounded relative">
                <div class="absolute top-3 left-2 text-[#889aa4]">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <div class="input__item rounded">
                    <input class="pt-3 pb-3 pr-1 pl-8 h-12 w-full" type="text" tabindex="1" placeholder="Password" v-model="password" name="password">
                </div>
            </div>
            <div>
                <button @click="loginHandle" class="h-12 w-full bg-[#409eff] text-white rounded">Đăng nhập</button>
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

export default {
  data() {
    return {
      studentId: '',
      password: '',   
      store: useAuthStore(),
    };
  },
  mounted() {
      
},
  methods: {
    loginHandle() {
        console.log(this.studentId);
        this.store.login(this.studentId, this.password);  
    }
  },
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
</style>