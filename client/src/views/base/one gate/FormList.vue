<template>
    <div>
        <NavTitle :title="pageTitle" />

        <div>
          <a-select class="p-6" v-model:value="selectedOption" @change="handleSelectChange">
    <a-select-option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </a-select-option>  
  </a-select>
    
  <div class="table-container">
    <table>
      <thead>
        <tr>
        <th>STT</th>
          <th>Sinh viên</th>
          <th>Loại biểu mẫu</th>
          <th>File</th>
          <th>Thời gian nộp</th>
          <th>Status</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in useForm.listForms" :key="index">
            <td>{{ index + 1 }}</td>
          <td class="text-[#7bb2ff]">{{ item.username }}</td>
          <td>
            {{ item.type }}
          </td>
          <td>
            <button @click="downloadFile(item.fileUrl)">file</button>
          </td>
          <td>
            {{ formatDate(item.createdAt) }}
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

  </div>

</template>


<script>
import { ref, onMounted } from 'vue';
import { Select } from 'ant-design-vue';
import NavTitle from "../NavBar/NavTitle.vue";
import { useFormStore } from '../../../stores/form.js';
import { getClass } from '../../../utils/getInfoUser.js';

import { message } from "ant-design-vue";

export default {
  name: 'MyComponent',
  components: { Select, NavTitle },
  setup() {
     
    const userClass = getClass();
    const selectedOption = ref(userClass[0]);
    const optionsWithValueAndLabel = [
      { value: 'Phiếu đánh giá kết quả rèn luyện', label: 'Phiếu đánh giá kết quả rèn luyện' },
      { value: 'Kế hoạch học tập', label: 'Kế hoạch học tập' },
      { value: 'Biên bản họp lớp', label: 'Biên bản họp lớp' },
    ];
    
    const options = userClass.map((className) => {
  return { value: className, label: className };
});
     const pageTitle = 'Danh sách biểu mẫu sinh viên';

    const useForm = useFormStore();

    const handleSelectChange = async () => {
      if (selectedOption.value) {
        await useForm.getListForm(selectedOption.value);
        
      }
    };

    onMounted(async () => {
        const type = selectedOption.value;
        await useForm.getListForm(type); 
    })

    const downloadFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  }

  const confirm = (id, type) => {
     
        useForm.deleteForm(id, type); 
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

    return { selectedOption, options, handleSelectChange, pageTitle, useForm, downloadFile, confirm, cancel, formatDate };
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
 
::-webkit-scrollbar {
  width: 10px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>