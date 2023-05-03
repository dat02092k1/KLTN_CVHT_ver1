<template>
  <div class="main">
    <div class="main-container pt-0 px-7 pb-7">
      <div class="nav-content bg-[#324f90] p-[1.5rem]">
        <div class="nav-title text-[#fbfbff] font-bold text-[15px]">
          <div>DANH SÁCH SINH VIÊN</div>
        </div>
      </div>
      <div class="table-content bg-[#ffffff]">
        <div class="filter-container p-6">
          <div class="row font-bold flex items-center">
            <label class="text-[14px] text-[#606266] leading-10" for=""
              >Lớp học:</label
            >
            {{ selectedClass }}
          </div>
          <div class="flex justify-between">
            <RouterLink
              class="bg-[#324f90] text-[#fff] p-2 rounded"
              to="/student/add"
            >
              Thêm người dùng
            </RouterLink>

            <RouterLink
              class="bg-[#324f90] text-[#fff] p-2 rounded"
              :to="{ path: '/student/import-excel' }"
            >
              Import excel
            </RouterLink>
          </div>
        </div>
        <div class="content-container">
          <table id="table-course">
            <thead>
              <tr>
                <th>STT</th>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Địa chỉ</th>
                <th>Ngày sinh</th>

                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
              <tr class="filter-course">
                <th></th>
                <th>
                  <div>
                    <input
                      class="filter-input h-8 text-[14px] leading-1 font-normal"
                      type="text"
                      placeholder="MSSV"
                      v-model="this.filters.userId"
                    />
                  </div>
                </th>
                <th>
                  <div>
                    <input
                      class="filter-input h-8 text-[14px] leading-1 font-normal"
                      type="text"
                      placeholder="Họ tên"
                      v-model="this.searchName"
                    />
                  </div>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr
                class="course-list"
                v-for="(item, index) in this.filteredStudents"
                :key="index"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ item.userId }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.emailAddress }}</td>
                <td>
                  {{ formatIsoDate(item.birthdate) }}
                </td>

                <td>
                  <span v-show="item.role === 'student'"> Sinh viên </span>
                  <span v-show="item.role === 'consultant'">
                    Cố vấn học tập
                  </span>
                </td>
                <td class="flex items-center gap-2 justify-center">
                  <div>
                    <RouterLink :to="{ path: '/student/edit/' + item._id }">
                      <button>
                        <i class="fa-solid fa-pen-to-square text-[#ffc107]"></i>
                      </button>
                    </RouterLink>
                  </div>
                  <div>
                    <a-button @click="showConfirm(item._id)">
                      <i class="fa-solid fa-delete-left text-red-500"></i>
                    </a-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Spinner v-if="isShowSpinner" />
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useStudentStore } from "../../stores/student.js";
import Spinner from "../../views/base/Spinner/Spinner.vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode, defineComponent } from "vue";
import { Modal } from "ant-design-vue";
import { getRole } from "../../utils/getInfoUser.js";
import { format, parseISO } from "date-fns";
export default {
  data() {
    return {
      data: [],
      useStudent: useStudentStore(),
      filters: {
        userId: "",
        name: "",
      },
      filterText: "",
      students: [],
      showFilter: false,
      searchName: "",
      isShowSpinner: true,
      userRole: getRole(),
      selectedClass: useRoute().params.class,
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) => {
        const isMatchById = student.userId
          .toString()
          .includes(this.filters.userId);
        const isMatchByName =
          student.name && student.name.includes(this.searchName);

        if (this.filters.userId && this.searchName) {
          return isMatchById && isMatchByName;
        } else if (this.filters.userId) {
          return isMatchById;
        } else if (this.searchName) {
          return isMatchByName;
        } else return true;
      });
    },
  },
  async mounted() {
    await this.useStudent.getUsersInClass(this.selectedClass);
    this.students = this.useStudent.data;
    this.isShowSpinner = false;
  },
  watch: {
    async selectedClass(newVal) {
      await this.useStudent.getUsersInClass(newVal);
      this.students = this.useStudent.data;
    },
  },
  methods: {
    async getDataStudent(_class) {
      try {
        const response = await this.useStudent.getData(_class);
        this.students = this.useStudent.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatIsoDate(dtStr) {
      const dtUtc = new Date(dtStr);

      const tzOffset = -7; // UTC+7
      const dtVn = new Date(dtUtc.getTime() + tzOffset * 60 * 60 * 1000);

      return dtVn.toLocaleDateString("en-GB");
    },
    formatDate(dateStr) {
      if (!dateStr) {
        console.error("birthdate is not provided");
        return;
      } else {
        const dateObj = parseISO(dateStr);
        const formattedDate = format(dateObj, "dd/MM/yyyy");
      }
    },
    showConfirm(id) {
      Modal.confirm({
        title: "Có chắc chắn muốn xóa sinh viên này ?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "",
        onOk: async () => {
          try {
            const result = await this.useStudent.deleteStudent(id);

            this.students = await this.useStudent.getUsersInClass(
              this.selectedClass
            );

            await new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() > 0.5) {
                  resolve();
                } else {
                  reject(new Error("Oops errors!"));
                }
              }, 1000);
            });
          } catch (error) {
            console.log(error.message);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {},
      });
    },
  },
  components: {
    Spinner,
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
  height: 290px;
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
</style>
