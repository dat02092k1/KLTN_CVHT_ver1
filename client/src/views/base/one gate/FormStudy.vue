<template>
  <div>
    <div class="header-forum">
      <NavTitle :title="pageTitle" />

      <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">

        <div class="table-container">
  <table>
    <thead>
      <tr>
      <th>STT</th>
        <th>Mẫu đơn</th>
        <th>File</th>
        <th>Status</th>
        <th>Thời gian</th>
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
          {{ 
          formatDate(item.createdAt) 
          }}
        </td>
      </tr>
    </tbody>
  </table>
</div>
      </div>
    </div>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRaw } from "vue";
import NavTitle from"../NavBar/NavTitle.vue";
import Loading from '../Spinner/Loading.vue';
import Spinner from "../Spinner/Spinner.vue";
import { RouterLink, RouterView } from "vue-router";
import { getClass, getId, getRole } from "../../../utils/getInfoUser";
import { sendNoti } from "../../../socket/socket-client.js";
import { message } from "ant-design-vue";
import { useFormStore } from "../../../stores/form.js";

export default defineComponent({
  setup() {
     const successMsg = ref(false);
    const errorMsg = ref(false);

    const userRole = getRole(); 
    

    const useForm = useFormStore();
    const showLoading = ref(true);
    const pageTitle = ("Kế hoạch học tập");

    const forms = ref ([]);
    const studentId = getId(); 
    onMounted(async () => {
      // useForm.getListAnnouncement();
       forms.value = await useForm.getFormsByType(studentId, 'Kế hoạch học tập'); 
      showLoading.value = false;
    });
    
    function formatDate(dateString) {
    const date = new Date(dateString);
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear();
const hour = date.getHours().toString().padStart(2, '0');
const minute = date.getMinutes().toString().padStart(2, '0');
return `${day}/${month}/${year} ${hour}:${minute}`;
}

     
    return {
      formatDate,
      useForm,
      pageTitle,
      showLoading,
      successMsg,
      errorMsg,
      userRole,
      forms
    };
  },
  components: { NavTitle, Loading, Spinner },
});
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
