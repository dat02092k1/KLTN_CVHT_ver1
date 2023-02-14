<template>
    <div>
      <div class="post-wrapper">
        <NavTitle/>
        
      </div>
    </div>
  </template>
  
  <script>
  import NavTitle from './NavTitle.vue';
  import { useForumStore } from '../../stores/forum'; 
  
  export default {
      data() {
          return {
            
          };
      },
      mounted() {
      }
      ,
      methods: {},
      components: { NavTitle }
  };
  </script>
  
  <style scoped>
 
   
  </style>
  