<template>
    <div v-if="isAdmin">
     <div class="">
        <Pie v-if="loaded" :data="chartData" :options="chartOptions"/>
      <Loading v-if="isShowSpinner" />
     </div>
    </div>
  </template>
  
  <script> 
  import { Pie } from 'vue-chartjs'
  import Loading from '../base/Spinner/Loading.vue';
  import { useStudentStore } from '../../stores/student.js'

  import axios from 'axios'
  
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

  ChartJS.register(ArcElement, Tooltip, Legend)
 
  export default {
    name: 'BarChart',
    components: { Pie, Loading },
    data: () => ({
      loaded: false,
      chartData: null,
      data: [],
      chartOptions: null,
      isAdmin: false,
      isShowSpinner: true,
      useStudent: useStudentStore() 
    }),
      async mounted () {    
       try {
        const accessToken = window.localStorage.getItem("token");
        const role = window.localStorage.getItem("role");
          console.log(role);
        
        if (role === 'manager') {
          this.isAdmin = true;
        }
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          }; 
            
        const id = '63e79db418fff3798ea25b88'
        const users = await this.useStudent.getStudentDetails(id);  
        console.log(users.total_creadits); 
        const currentCredits = users.total_creadits; 
        const creditsLeft = 138 - currentCredits;
        this.chartData = {
          labels: users,
          datasets: [
          {
            label: 'Thống kê số tín chỉ tích lũy',
            backgroundColor: ['#9559a4', '#63ccf2'],
            data: [currentCredits, creditsLeft]
          }
          ]
          }
         
          this.isShowSpinner = false;

          this.chartOptions = {
            responsive: true
          }

        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
  </script>

  <!-- <template>
    <div>
        <Pie v-if="loaded" :data="chartData" :options="chartOptions"/>
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs';
  import { useStudentStore } from '../../stores/student.js'

  
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

  ChartJS.register(ArcElement, Tooltip, Legend)
  export default {
    name: 'PieChart',
    extends: Pie,
    props: ['chartData', 'chartOptions'], 
    mounted() {
        this.loaded = true;

    },
  };
  </script>
   -->