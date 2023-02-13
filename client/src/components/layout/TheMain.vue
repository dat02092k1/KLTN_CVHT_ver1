<template>
  <div class="main">
    <div class="main-container pt-0 px-7 pb-7">
      <div class="nav-content bg-[#324f90] p-[1.5rem]">
        <div class="nav-title text-[#fbfbff] font-bold text-[15px]">
          <div>KHUNG CHƯƠNG TRÌNH ĐÀO TẠO</div>
        </div>
      </div>
      <div class="table-content bg-[#ffffff]">
        <div class="filter-container p-6">
          <div class="row  font-bold">
            <label class="text-[14px] text-[#606266] leading-10" for=""
              >Lớp học:</label
            >
            <label class="text-[14px] text-[#606266] ml-2 leading-10" for=""
              >K64-C-CLC</label
            >
          </div>
          <RouterLink class="bg-[#324f90] text-[#fff] p-2 rounded " to="/student/form">
                    Thêm sinh viên
                  </RouterLink>
      <RouterView />
        </div>
        <div class="content-container">
           
            <table id="table-course">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>MSSV</th>
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Ngày sinh</th>
                  <th>GPA</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
                <tr class="filter-course">
                  <th></th>
                  <th>
                    <div>
                      <input
                      class="filter-input h-8 text-[14px] leading-1 font-normal"
                        type="text"
                        placeholder="MSSV"
                      />
                    </div>
                  </th>
                  <th>
                    <div>
                      <input
                      class="filter-input h-8 text-[14px] leading-1 font-normal"
                        type="text"
                        placeholder="Họ tên"
                      />
                    </div>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                   
                  </th>
                
                 
                </tr>
              </thead>
              <tbody>
                <tr
                  class="course-list"
                  v-for="(item, index) in this.useStudent.data"
                  :key="index"
                >
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>{{ item.studentId }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phone }}</td>
                  <td>
                    {{ formatDate(item.birthdate) }}
                  </td>
                  <td>{{ item.gpa }}</td>
                  <td>{{ item.status }}</td>
                  <td class="grid grid-cols-2">
                    <div>
                      <RouterLink :to="{ path: '/student/details/' + item._id }" >
                        <button>
                          <i class="fa-solid fa-circle-info text-yellow-400"></i>
                        </button>                  
                      </RouterLink>
                      
                    </div>
                    <div>
                        <button @click="useStudent.deleteStudent(item._id)">
                          <i class="fa-sharp fa-solid fa-delete-left text-red-500"></i>
                        </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
           
           
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
import axios from "axios";
import { RouterLink, RouterView } from 'vue-router'
import { useStudentStore } from "../../stores/student.js";

export default {
  data() {
    return {
      data: [],
      useStudent: useStudentStore(), 
    };
  },
  mounted() {
      
     this.useStudent.getData(); 
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/student/getAll/K64-C-CLC"
        );
        this.data = response.data.student;
        // console.log(this.data);
      } catch (error) {
        console.log(error);
      }

    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("default", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
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

.head-course th {
  padding: 0.75em 1em 0.75em 0.75em;
}
/* TABLE CSS */
.content-container {
  height: 330px;
  overflow-y: scroll;
}



#table-course {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

#table-course th,
#table-course td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}



.filter-course input[type="text"] {
  width: 100%;
  height: 100%;
  padding: 8px;
}

.filter-course select {
  width: 100%;
  height: 100%;
}


.filter-input {
  color: #606266;
  border: 1px solid black;
  padding: 6px 12px;
  width: 100%;
}

input:hover {
  border: 1px solid #324f90;
}

input:focus {
  border: 1px solid #324f90;
  outline: none;
}
/* #table-course {
  border: 1px solid #dcdfe6;
  border-collapse: collapse;
}

.filter-course th {
  padding: 0.75em 1.5em 0.75em 0.75em;
}
table tr {
  border-bottom: 1px solid #dcdfe6;
}

.filter-input {
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 6px 12px;
  width: 100%;
}

.course-list td {
  padding: 0.75em 1.5em 0.75em 0.75em;
}

table td {
    width: 150px;
}

.content-container {
  overflow-x: scroll;
}

table {  overflow: auto    } */


</style>
