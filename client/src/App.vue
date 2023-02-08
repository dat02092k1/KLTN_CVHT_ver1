<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheMain from './components/layout/TheMain.vue'
import StudentDetails from './views/student/StudentDetails.vue'
</script>

<template>
  <div class="container">
    <TheSidebar /> 
      <TheHeader/>
      <!-- <TheMain />    -->
      
        
        <RouterLink to="/student/list"></RouterLink>
      <RouterView />
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
