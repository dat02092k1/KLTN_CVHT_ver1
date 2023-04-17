<template>
    <div>
      <div class="header-forum">
        <NavTitle :title="pageTitle" />
  
        <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
          <div class="flex justify-end">
            <a-button
              class="bg-[#324f90] rounded"
              type="primary"
              @click="visible = true"
              >Thêm phiếu KQRL</a-button
            >
  
            <a-modal
              v-model:visible="visible"
              title="Phiếu đánh giá kết quả rèn luyện"
              ok-text="Create"
              cancel-text="Cancel"
              @ok="onOk"
            >
              <a-form
                ref="formRef"
                :model="formState"
                layout="vertical"
                name="form_in_modal"
              >
                <div
                  
                >  
                <div class="flex gap-1">
                    <span class="text-red-500 text-xl"> * </span> <label>Lưu ý :</label>
                </div>
                <p class="text-sm italic">
                        Sinh viên chọn phiếu theo yêu cầu, số bản bằng tiếng Việt hoặc tiếng Anh; phiếu đánh giá KQRL cần ghi rõ họ tên, lớp, và các yêu cầu khác, cụ thể theo mẫu file bên dưới.
                </p>
                <div class="flex gap-1">
                    <span class="text-red-500 text-xl">*</span>
                <label>
                    File mẫu:
                </label>

                <a :href="sampleFile">sample.pdf</a>
               
                </div>
                </div>
                
  
            
                <a-form-item
                  name="file"
                  label="File nộp:">
               
        <input type="file" @change="uploadDocs">
                </a-form-item>
  
                
              </a-form>
            </a-modal>
          </div>
  
          <div class="table-container">
    <table>
      <thead>
        <tr>
        <th>STT</th>
          <th>Mẫu đơn</th>
          <th>File</th>
          <th>Status</th>
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
      <Loading v-if="showLoading" />
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, reactive, ref, toRaw } from "vue";
  import NavTitle from"../NavBar/NavTitle.vue";
  import Loading from '../Spinner/Loading.vue';
  import { RouterLink, RouterView } from "vue-router";
  import { getClass, getId, getRole } from "../../../utils/getInfoUser";
  import { sendNoti } from "../../../socket/socket-client.js";
  import { message } from "ant-design-vue";
  import { useFormStore } from "../../../stores/form.js";
  import { useUploadStore } from "../../../stores/upload.js";
  
  export default defineComponent({
    setup() {
      const formRef = ref();
      const visible = ref(false);
      const successMsg = ref(false);
      const errorMsg = ref(false);
      const formState = reactive({
        student: getId(),
        type: "Phiếu đánh giá kết quả rèn luyện",  
        fileUrl: ""
      });
  
      const userRole = getRole(); 
      const onOk = () => {
        formRef.value
          .validateFields()
          .then((values) => {
            console.log("formState: ", toRaw(formState));
            const form = toRaw(formState);
            
            useForm.addForm(form);
  
            visible.value = false;
            formRef.value.resetFields();
             
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
             
          });
      };
  
      const useForm = useFormStore();
      const useUpload = useUploadStore();
      const showOptions = reactive([]);
      const showLoading = ref(true);
      const pageTitle = ("Đánh giá KQRL");
  
      function handleOptionClick(option) {
        // Xử lý khi người dùng click vào một option
        console.log(option);
      }
  
      const forms = ref ([]);
      const studentId = getId(); 
      onMounted(async () => {
        // useForm.getListAnnouncement();
         forms.value = await useForm.getFormsByType(studentId, formState.type); 
        showLoading.value = false;
      });
  
      function deletePost(id) {
        console.log(id);
        // useForum.deletePost(id);
      }
  
      const uploadDocs = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('doc', file);
        const docs = await useUpload.uploadDocs(formData);
        formState.fileUrl = docs;
        console.log(formState.fileUrl);
      }
       
      const confirm = (id) => {
        useForm.deleteAnnouncement(id); 
    };

    const cancel = e => {
      console.log(e);
      message.error('Click on No');
    };

    const sampleFile = "https://res.cloudinary.com/dpnjutbws/raw/upload/v1679729291/File_docs_CVHT_UET/t9uwd8hsq6fn6dnqrxrs.pdf"; 

      return {
        formState,
        formRef,
        visible,
        onOk,
        useForm,
        pageTitle,
        showLoading,
        showOptions,
        deletePost,
        handleOptionClick,
        uploadDocs,
        successMsg,
        errorMsg,
        confirm,
        cancel,
        userRole,
        sampleFile,
        forms
      };
    },
    components: { NavTitle, Loading },
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
  