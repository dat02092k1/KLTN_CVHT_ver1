<script setup>
import { RouterLink, RouterView, useRoute} from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheMain from './components/layout/TheMain.vue'
import StudentDetails from './views/student/StudentDetails.vue'
import { onMounted, onUpdated } from 'vue'
import axios from "axios";
import { receiveNoti, getUsersOnl, joinRoom, addUser, getMessages } from "./socket/socket-client.js";
import { getClass, getUsername } from "./utils/getInfoUser.js";
import { notification } from 'ant-design-vue';
import { h } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';

const route = useRoute();
const _class = getClass();
const username = getUsername();
const members = [];
const msg = [];
onMounted(() => {
   
    joinRoom(_class);
    addUser(username);
  // receiveNoti(noti => alert('post new: ' + noti));
  receiveNoti(noti => openNotification(noti));

  getMessages(() => members, username, () => msg, data => popupMsg(data));
  // getUsersOnl() 
    });

    const openNotification = (data) => {
      notification.open({
        message: 'Thông báo mới',
        description: data,
        icon: () => h(SmileOutlined, {
          style: 'color: #108ee9',
        }),
      });
    };

    const popupMsg = (data) => {
      notification.open({
        message: 'Tin nhắn mới',
        description: data,
        icon: () => h(SmileOutlined, {
          style: 'color: #108ee9',
        }),
      });
    };

</script>

<template>
  <div class="container">
    <TheSidebar v-if="!$route.meta.hideSidebar"/> 
      <TheHeader v-if="!$route.meta.hideHeader"/>
      <!-- <TheMain />    -->
      
<!--         
        <RouterLink to="/student/list"></RouterLink> -->
  
        
          <RouterView />
 
      <!-- <RouterView /> -->
  </div>
  
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    background-color: #f4f7ff;
}
</style>
