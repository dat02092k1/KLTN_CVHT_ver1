<script setup>
import { RouterLink, RouterView, useRoute} from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheMain from './components/layout/TheMain.vue'
import StudentDetails from './views/student/StudentDetails.vue'
import { onMounted, onUpdated } from 'vue'
import axios from "axios";

const route = useRoute();

async function refreshToken() {
  try {
    const token = await axios.post('http://localhost:8000/token/refresh');
    console.log(token); 
    
  } catch (error) {
    console.log(error); 
  }
}

// onMounted(() => {
//       setInterval(() => {
//         refreshToken();
//       }, 5 * 1000);  
//     });

// onUpdated(() => {
//       setInterval(() => {
//         refreshToken();
//       }, 5 * 1000); 
//     });
</script>

<template>
  <div class="container">
    <TheSidebar v-if="route.name !== 'login'"/> 
      <TheHeader v-if="route.name !== 'login'"/>
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
