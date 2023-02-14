<template>
    <div>
      <!-- <Bar v-if="loaded" :data="chartData" /> -->
      <Line v-if="loaded" :data="chartData" :options="chartOptions"/>
    </div>
  </template>
  
  <script> 
  import { Bar, Line } from 'vue-chartjs'
  import axios from 'axios'
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
  // export default {
  //   name: 'BarChart',
  //   components: { Bar },
  //   data: () => ({
  //     loaded: false,
  //     chartData: null,
  //     data: [],
      
  //   }),
    // async mounted () {    
    //    try {
    //     const userlist  = await axios.get('http://localhost:8000/student/getAll/K64-C-CLC')
    //     const fetchData = userlist.data.student;
         
    //     const gpa = fetchData.map(number => number.gpa);
    //     const student = fetchData.map(number => number.name);
    //     console.log(gpa);
    //     console.log(student);
    //     this.chartData = {
    //       labels: student,
    //     datasets: [
    //       {
    //         label: 'Data One',
    //         backgroundColor: '#f87979',
    //         data: gpa
    //     }
    //   ]
    //   }
    //     this.loaded = true
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },
  //   methods: {
  //       fillData () {
  //       this.datacollection = {
  //         labels: this.time,
  //         datasets: [
            
  //         ]
  //       }
  //     },
  //   }
  // }
  export default {
    name: 'BarChart',
    components: { Line },
    data: () => ({
      loaded: false,
      chartData: null,
      data: [],
      chartOptions: null
    }),
      async mounted () {    
       try {
        const accessToken = window.sessionStorage.getItem("token");
          console.log(accessToken);
          const config = {
            headers: {
              'token': `Bearer ${accessToken}`
            }
          };
        const userlist  = await axios.get('http://localhost:8000/student/getAll/K64-C-CLC', config); 
        const fetchData = userlist.data.student;
         
        const gpa = fetchData.map(number => number.gpa);
        const student = fetchData.map(number => number.studentId);
        console.log(gpa);
        console.log(student);
        this.chartData = {
          labels: student,
          datasets: [
          {
            label: 'Thống kê GPA của sinh viên lớp K64-C-CLC',
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
