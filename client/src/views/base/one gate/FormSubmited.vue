<template>
    <div>
        <NavTitle :title="pageTitle" />

        <div class="table-container">
    <table>
      <thead>
        <tr>
        <th>STT</th>
          <th>Mẫu đơn</th>
          <th>File</th>
          <th>Status</th>
          <th>Thời gian</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in forms" :key="index">
            <td>{{ index + 1 }}</td>
          <td class="text-[#7bb2ff]">{{ item.type }}</td>
          <td>
            <button @click="downloadFile(item.fileUrl)">file</button>
          </td>
           
          <td>
            <span v-if="item.status === 'pending'" class="text-[#e9990c]" title="Pending">
                  <i class="fa-regular fa-circle-question"></i>
            </span>
      <span v-else-if="item.status === 'rejected'" title="Rejected" class="text-[#d50023]">
        <i class="fa-regular fa-circle-xmark"></i>
    </span>
      <span v-else  title="Successful" class="text-[#38af48]">
        <i class="fa-regular fa-circle-check"></i>
      </span>
          </td>
          <td>
           <span>
            {{ formatDate(item.updatedAt) }}
           </span>
          </td>
          <td>
            <div class="flex justify-center gap-2">
              <a-popconfirm title="Title" @confirm="confirm(item._id, item.type)" @cancel="cancel">
    <button class="mr-1"><i class="fa-regular fa-trash-can"></i></button>
  </a-popconfirm>
            
            
              <router-link :to="{ path: '/consultant/onegate/status/' + item._id}" >
                <span>
                <i class="fa-regular fa-pen-to-square"></i>
            </span>
              </router-link>
                 
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Select } from 'ant-design-vue';
import NavTitle from "../NavBar/NavTitle.vue";
import { useFormStore } from '../../../stores/form.js';
import { message } from "ant-design-vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

export default {
  name: 'MyComponent',
  components: { Select, NavTitle },
  setup() {
    const pageTitle = 'Danh sách biểu mẫu đã nộp';

    const useForm = useFormStore();
    
    const studentId = useRoute().params.id;

    const forms = ref ([]);

    onMounted(async () => {
        forms.value = await useForm.getUserForms(studentId); 
    })

    const downloadFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  }

  const confirm = async (id, type) => {
     
        useForm.deleteForm(id, type); 
        await useForm.getUserForms(studentId);
    };

    const cancel = e => {
      console.log(e);
      message.error('Click on No');
    };

    function formatDate(dateString) {
      const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

    return { pageTitle, useForm, downloadFile, confirm, cancel, forms, formatDate };
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