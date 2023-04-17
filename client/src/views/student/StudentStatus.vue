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

      <div class="p-2 text-[#fff] font-medium bg-[#f16a99] rounded">
        <button @click="exportToPdf">Export to PDF</button>
      </div>
    </div>

    <div id="content" class="table-container" v-if="this.students.length > 0">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>MSSV</th>
            <th>Họ tên</th>
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
              {{ item.name }}
            </td>
            <td>
              {{ item.CPA }}
            </td>
            <td>
              {{ item._class[0].name }}
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
import unorm from "unorm";
import { RouterLink, RouterView, useRoute } from "vue-router";

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

    const _class = useRoute().params.class;
    const useStudent = useStudentStore();
    const students = ref([]);

    const handleSelectChange = async () => {
      if (selectedOption.value) {
        students.value = await useStudent.getStudentStatus(_class, selectedOption.value);
      }
    };

    onMounted(async () => {
      const status = selectedOption.value;
      console.log(_class);
      students.value = await useStudent.getStudentStatus(_class, status);
      console.log(students.value);
    });

    function normalizeName(name) {
      // Remove diacritical marks (accents)
  name = unorm.nfd(name).replace(/[\u0300-\u036f]/g, "");

// Remove excess spaces
name = name.replace(/\s+/g, " ").trim();

// Split name into words
const words = name.split(" ");

// Normalize each word
const normalizedWords = words.map((word) => {
  if (word.length === 1) {
    return word.toUpperCase();
  } else {
    // Capitalize the first letter
    word = word.charAt(0).toUpperCase() + word.slice(1);

    // Convert the remaining letters to lowercase
    word = word.replace(/([^\W_]+[^\s-]*) */g, (txt) =>
      txt.charAt(0) + txt.substr(1).toLowerCase()
    );

    return word;
  }
});

// Join the words back together
return normalizedWords.join(" ");
    }
    const exportToPdf = () => {
      const doc = new jsPDF();

      // Add table headers
      const headers = [["STT", "MSSV", "Name", "CPA", "Class", "Status"]];

      // Add table data
      const data = students.value.map((item, index) => [
        index + 1,
        item.studentId,
        normalizeName(item.name),
        item.CPA,
        item._class[0].name,
        normalizeName(item.status),
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
