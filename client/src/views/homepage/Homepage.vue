<template>
    <div class="main">
      <NavTitle :title="pageTitle" />
       <div class="bg-[#fff] h-full mx-6">
        <h1>HOMEPAGE UET</h1>
        <Notifications v-if="this.userRole !== 'manager'" />
        <div class="flex justify-center">
          <img 
        src="https://github.com/hiencoi999/student_management/blob/master/client/src/HomePage/Component/logo1.png?raw=true" 
        alt=""
        style="width: 300px; height: 200px;"
        >
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
   /* overflow-y: hidden; */
}
</style>