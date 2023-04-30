<template>
    <div>
      <div class="header-forum">
        <NavTitle :title="pageTitle" />
  
        <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
          <div class="flex justify-end">
            <a-button
            v-show="userRole === 'manager'"
              class="bg-[#324f90] rounded"
              type="primary"
              @click="visible = true"
              >Thêm thông báo</a-button
            >
  
            <a-modal
              v-model:visible="visible"
              title="Thêm thông báo mới"
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
                <a-form-item
                  name="title"
                  label="Title"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]"
                >
                  <a-input v-model:value="formState.title" />
                </a-form-item>
  
                <a-form-item
                  name="file"
                  label="File"
                >
               
        <input type="file" @change="uploadDocs" accept=".pdf,.docx">
                </a-form-item>
  
                
              </a-form>
              <Loading v-show="useUpload.loading" />
            </a-modal>
          </div>
  
          <div>
            <a-alert v-show="useAnnouncement.successMsg === true" message="Thêm thông báo thành công" type="success" show-icon />
            <a-alert v-show="useAnnouncement.errorMsg === true" message="Thêm thông báo thất bại" type="error" show-icon />
             
            <hr style="border-top: 1px solid #ddd; margin-top: 8px;" /> 
            
            <div class="academic_announ">
                <table style="border-collapse: collapse; width: 100%; margin: auto; background-color: #ffffff;">
  <thead>
    <tr class="py-2">
      <th style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0; color: #909399">STT</th>
      <th style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0; color: #909399">Tên quy định</th>
      <th style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0; color: #909399">Tên file / Link</th>
      <th v-if="userRole === 'manager'" style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0; color: #909399">Hành động</th>

    </tr>
  </thead>
  <tbody>
    <tr class="py-2" v-for="(item, index) in useAnnouncement.listAnnouncement"
            :key="index">
      <td style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0;">{{ index + 1 }}</td>
      <td style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0; max-width: 200px; word-wrap: break-word;">{{ item.title }}</td>
      <td style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0">
        <a :href="item.fileUrl">
            file.pdf
        </a>
    </td>
    <td v-if="userRole === 'manager'" style="text-align: center; border-bottom: 1px solid #f0f2f7; padding: 10px 0">
        <a-popconfirm title="Title" @confirm="confirm(item._id)" @cancel="cancel">
    <button class="mr-1"><i class="fa-regular fa-trash-can"></i></button>
  </a-popconfirm>

    <RouterLink class="ml-1" :to="{ path: '/student/announcement/edit/' + item._id }">
                      <button>
                        <i class="fa-regular fa-pen-to-square"></i>
                      </button>
                    </RouterLink>
    
    </td>

    </tr>
   
    <!-- Add more rows as needed -->
  </tbody>
            </table>
            </div>

        </div>
        </div>
      </div>
      
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
  import { useAnnouncementStore } from "../../../stores/announcement.js";
  import { useUploadStore } from "../../../stores/upload.js";
  
  export default defineComponent({
    setup() {
      const formRef = ref();
      const visible = ref(false);
      const successMsg = ref(false);
      const errorMsg = ref(false);
      const formState = reactive({
        user: getId(),
        title: "",
        fileUrl: ""
      });
  
      const userRole = getRole(); 
      const onOk = () => {
        formRef.value
          .validateFields()
          .then((values) => {
            console.log("formState: ", toRaw(formState));
            const announcement = toRaw(formState);
            
            useAnnouncement.addAnnouncement(announcement);
  
            visible.value = false;
            formRef.value.resetFields();
            successMsg.value = true;
            setTimeout(() => (successMsg.value = false), 3000); 
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
            errorMsg.value = true;
            setTimeout(() => (errorMsg.value = false), 3000); 
          });
      };
  
      const useAnnouncement = useAnnouncementStore();
      const useUpload = useUploadStore();
      const showOptions = reactive([]);
      const _class = "K64-C-CLC";
      const showLoading = ref(true);
      const pageTitle = ("Thông báo học vụ");
  
      function handleOptionClick(option) {
        // Xử lý khi người dùng click vào một option
        console.log(option);
      }
  
      onMounted(async () => {
        useAnnouncement.getListAnnouncement();
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
        useAnnouncement.deleteAnnouncement(id); 
    };

    const cancel = e => {
      console.log(e);
      message.error('Click on No');
    };


      return {
        formState,
        formRef,
        visible,
        onOk,
        useAnnouncement,
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
        useUpload
      };
    },
    components: { NavTitle, Loading },
  });
  </script>
  
  <style scoped>
  .forum-list {
    overflow-y: scroll;
    height: calc(100vh - 150px);
  }
  .forum-item {
    border: 1px solid #85bde5;
    padding: 20px;
  }

  .academic_announ {
    height: 400px;
    margin: 10px 0;
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
  