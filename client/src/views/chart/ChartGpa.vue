<template>
    <div v-if="isAdmin" class="bg-[#fff]">
      <div class="row font-bold flex items-center">
            <label class="text-[14px] text-[#606266] leading-10" for=""
              >Lớp học:</label
            >
    <select v-model="selectedClass">
      <option v-for="className in userClass" :value="className">{{ className }}</option>
    </select>
  </div> 
      <!-- <Bar v-if="loaded" :data="chartData" /> -->
      <Line v-if="loaded" :data="chartData" :options="chartOptions"/>
      <Loading v-if="isShowSpinner" />
    </div>
  </template>
  
  <script> 
  import { Bar, Line } from 'vue-chartjs'
  import Loading from '../base/Spinner/Loading.vue';
  import { getRole, getClass } from "../../utils/getInfoUser.js";
  import { useStudentStore } from "../../stores/student.js";
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
      isShowSpinner: true,
      selectedClass: "",
      userClass: getClass(),
      useStudent: useStudentStore(),
      userlist: []
    }),
    watch: {
    async selectedClass(newVal) {
      this.userlist = await this.useStudent.getData(newVal);

      const fetchData = this.userlist;
        this.isShowSpinner = false;
        
        const gpa = fetchData.map(number => number.CPA);
        const student = fetchData.map(number => number.studentId);
        console.log(gpa);
        console.log(student);
        this.chartData = {
          labels: student,
          datasets: [
          {
            label: `Thống kê điểm của sinh viên lớp ${this.selectedClass}`,
            backgroundColor: '#f87979',
            data: gpa
          }
          ]
          }

          this.chartOptions = {
            responsive: true
          }

        this.loaded = true
    },
    },
      async mounted () {    
       try {
        const role = getRole(); 
        this.selectedClass = this.userClass[0];
        if (role === 'consultant') {
          this.isAdmin = true;
        } 

        this.userlist  = await this.useStudent.getData(this.selectedClass); 
        console.log(this.userlist);
        const fetchData = this.userlist;
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
