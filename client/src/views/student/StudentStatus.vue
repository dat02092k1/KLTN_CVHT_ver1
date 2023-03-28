<template>
  <div>
    <NavTitle :title="pageTitle" />

    <div class="flex justify-between mx-7 items-center">
      <a-select
        class="p-6"
        v-model:value="selectedOption"
        @change="handleSelectChange"
      >
        <a-select-option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </a-select-option>
      </a-select>

      <div>
        <button @click="exportToPdf">Export to PDF</button>
      </div>
    </div>

    <div id="content" class="table-container" v-if="this.students.length > 0">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>MSSV</th>
            <th>GPA</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.students" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              {{ item.studentId }}
            </td>
            <td>
              {{ item.CPA }}
            </td>
            <td>
              {{ item._class }}
            </td>
            <td>
              <span>
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h3>KHÔNG CÓ SINH VIÊN NÀO</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Select } from "ant-design-vue";
import NavTitle from "../base/NavBar/NavTitle.vue";
import { useStudentStore } from "../../stores/student.js";
import { message } from "ant-design-vue";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "MyComponent",
  components: { Select, NavTitle },
  setup() {
    const selectedOption = ref("Khen thưởng");
    const options = [
      {
        value: "Không",
        label: "Không",
      },
      { value: "Cảnh báo học vụ", label: "Cảnh báo học vụ" },
      { value: "Khen thưởng", label: "Khen thưởng" },
    ];

    const pageTitle = "Danh sách sinh viên";

    const useStudent = useStudentStore();
    const students = ref([]);

    const handleSelectChange = async () => {
      if (selectedOption.value) {
        students.value = await useStudent.getStudentStatus(
          selectedOption.value
        );
      }
    };

    onMounted(async () => {
      const status = selectedOption.value;
      students.value = await useStudent.getStudentStatus(status);
    });

    const exportToPdf = () => {
      const doc = new jsPDF();

      // Add table headers
      const headers = [["STT", "MSSV", "Class", "Status"]];

      // Add table data
      const data = students.value.map((item, index) => [
        index + 1,
        item.studentId,
        item.CPA,
        item._class,
        item.status,
      ]);

      doc.autoTable({
        head: headers,
        body: data,
      });

      // Save the PDF
      doc.save("students.pdf");
    };

    return {
      selectedOption,
      options,
      handleSelectChange,
      pageTitle,
      useStudent,
      students,
      exportToPdf,
    };
  },
};
</script>

<style scoped>
.table-container {
  margin: 0 auto;
  width: 100%;
  height: 360px;
  overflow: auto;
}

table {
  border-collapse: collapse;
  width: 60%;
  margin: auto;
}

th,
td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #fafafa;
}
</style>
