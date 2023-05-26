<template>
    <div>
        <NavTitle :title="pageTitle" />

        <div class="table-container p-4">
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
            
            
              <button @click="showModal(item._id)">
                <span>
                <i class="fa-regular fa-pen-to-square"></i>
            </span>
              </button>
                 
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
            <a-alert
            v-show="useForm.successMsg === true"
            message="Thao tác thành công"
            type="success"
            show-icon
          />
            <a-alert
            v-show="useForm.errorMsg === true"
            message="Thao tác thất bại"
            type="error"
            show-icon
          />
          </div>

    <a-modal
            v-model:visible="visible"
            title="Sửa biểu mẫu"
            ok-text="Lưu"
            cancel-text="Cancel"
            @ok="onOk"
          >
            <a-form
              ref="formRef"
              :model="formState"
              layout="vertical"
              name="form_in_modal"
            >
              <a-form-item
                name="type"
                label="Biểu mẫu"
                :rules="[
                  {
                    required: true,
                    message: 'Chưa điền tên biểu mẫu!',
                  },
                ]"
              >
                <a-input v-model:value="formState.type" />
              </a-form-item>


              <a-form-item name="file" label="File"
              >
                <a-input v-model:value="formState.fileUrl" class="my-1" />
                <input class="mt-1" type="file" @change="uploadDocs" accept=".pdf,.docx">
              </a-form-item>
            </a-form>
            <Spinner v-show="useUpload.loading" />
          </a-modal>
  </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive, toRaw } from 'vue';
import { Select } from 'ant-design-vue';
import NavTitle from "../NavBar/NavTitle.vue";
import { useFormStore } from '../../../stores/form.js';
import { useUploadStore } from "../../../stores/upload.js";
import { message } from "ant-design-vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import {
  getStudentClass,
  getId,
  getUsername,
} from "../../../utils/getInfoUser";
import Spinner from "../Spinner/Spinner.vue";

export default {
  name: 'MyComponent',
  components: { Select, NavTitle, Spinner },
  setup() {
    const pageTitle = 'Danh sách biểu mẫu đã nộp';

    const useForm = useFormStore();
    
    const studentId = useRoute().params.id;

    const forms = ref ([]);

    const formRef = ref();
    const visible = ref(false);
    const useUpload = useUploadStore();

    const formState = reactive({
      student: getId(),
      type: "",
      fileUrl: "",
      _class: getStudentClass(),
      formId: "",
      username: "",
    });    

    onMounted(async () => {
        forms.value = await useForm.getUserForms(studentId); 
    })

    const downloadFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  }

  const uploadDocs = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('doc', file);
        const docs = await useUpload.uploadDocs(formData);
        formState.fileUrl = docs;
        console.log(formState.fileUrl);
      }

  const onOk = () => {
      formRef.value
        .validateFields()
        .then(async (values) => {
          if (!formState.fileUrl) {
            alert('Chưa nhập file');
            return;
          }
          console.log("formState: ", toRaw(formState));
          const form = toRaw(formState);

          await useForm.editForm(formState.formId, form);
          forms.value = await useForm.getUserForms(studentId);
          visible.value = false;
          formRef.value.resetFields();
          console.log("reset formState: ", toRaw(formState));
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

  const confirm = async (id, type) => {  
        await useForm.deleteForm(id, type); 
        forms.value = await useForm.getUserForms(studentId);
    };

    const cancel = e => {
      console.log(e);
      message.error('Click on No');
    };

    const showModal = async (formId) => {
      visible.value = true;
      const data = await useForm.getDetailsForm(formId);
      formState.type = data.type;
      formState.fileUrl = data.fileUrl;
      formState.formId = data._id;
      formState.username = data.username;
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

    return { pageTitle, useForm, uploadDocs,
      downloadFile, confirm, cancel, 
      forms, formatDate, showModal, 
      formState, formRef, visible, 
      onOk, useUpload };
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