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
              >Thêm kế hoạch học tập</a-button
            >
  
            <a-modal
              v-model:visible="visible"
              title="Phiếu kế hoạch học tập"
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
                        Sinh viên chọn phiếu theo yêu cầu, số bản bằng tiếng Việt hoặc tiếng Anh; mẫu Kế hoạch học tập cần ghi rõ họ tên, lớp, và các yêu cầu khác, cụ thể theo mẫu file bên dưới.
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
  import { sendNoti } from "../../../socket/socket.js";
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
        type: "Kế hoạch học tập",  
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
      const pageTitle = ("Kế hoạch học tập");
  
      function handleOptionClick(option) {
        // Xử lý khi người dùng click vào một option
        console.log(option);
      }
  
      onMounted(async () => {
        // useForm.getListAnnouncement();
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
        sampleFile  
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
  </style>
  