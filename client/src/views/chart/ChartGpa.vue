<template>
    <div v-if="isAdmin">
      <!-- <Bar v-if="loaded" :data="chartData" /> -->
      <Line v-if="loaded" :data="chartData" :options="chartOptions"/>
      <Loading v-if="isShowSpinner" />
    </div>
  </template>
  
  <script> 
  import { Bar, Line } from 'vue-chartjs'
  import Loading from '../base/Spinner/Loading.vue';

  import axios from 'axios'
  import { axiosIns } from "../../api/axios.js";

  // import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
  // ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
 
  export default {
    name: 'BarChart',
    components: { Line, Loading },
    data: () => ({
      loaded: false,
      chartData: null,
      data: [],
      chartOptions: null,
      isAdmin: false,
      isShowSpinner: true
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
        const userlist  = await axiosIns.get('http://localhost:8000/student/getAll/K64-C-CLC', config); 
        console.log(userlist);
        const fetchData = userlist.data.allStudent;
        this.isShowSpinner = false;
        
        const gpa = fetchData.map(number => number.CPA);
        const student = fetchData.map(number => number.studentId);
        console.log(gpa);
        console.log(student);
        this.chartData = {
          labels: student,
          datasets: [
          {
            label: 'Thống kê điểm của sinh viên lớp K64-C-CLC',
            backgroundColor: '#f87979',
            data: gpa
          }
          ]
          }

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
