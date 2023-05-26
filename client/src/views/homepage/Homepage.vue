<template>
    <div class="main">
      <NavTitle :title="pageTitle" />
       <div class="bg-[#fff] h-full mx-6 overflow-y-auto">
        <div class="flex justify-between items-center w-[50%]">
          <Notifications class="ml-4" v-if="this.userRole !== 'manager'" />
        </div>
         
        <div class="grid grid-cols-2 my-4 mx-3">
          <div class="">
            <img 
        src="https://masterclasseducation.org/wp-content/themes/masterclass-education/img/home-college.png" 
        alt=""
        style="width: 100%; height: 350px;"
        >
          </div>
          <div class="mt-[50px]">
            <h2 class="text-lg font-semibold">
              UET Consultant
            </h2>
            <p>
              Một nền tảng trực tuyến giúp hỗ trợ hoạt động cố vấn học tập trong việc quản lý lớp. Kích hoạt hệ thống “cảnh báo sớm” nhằm nâng cao tỷ lệ sinh viên
              cũng như giúp đỡ các sinh viên có hoàn cảnh khó khăn trong đời sống và môi trường đại học
            </p>
          </div>
        </div>

      

       </div>
    </div>
</template>

<script>
import Notifications from '../base/Notification/Notification.vue';
import NavTitle from"../base/NavBar/NavTitle.vue";
import {
  getRole,
} from "../../utils/getInfoUser.js";

export default {
  components: {
    Notifications,
    NavTitle
  },
  data() {
    return {
      pageTitle: "Trang chủ",
      userRole: getRole()
    }
  }
};
</script>

<style scoped>
 .main {
  padding: 14px 20px;
  width: calc(100% - 250px);
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>