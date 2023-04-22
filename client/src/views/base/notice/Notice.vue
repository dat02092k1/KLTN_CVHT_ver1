<template>
    <div>
      <div class="header-forum">
        <NavTitle :title="pageTitle" />
  
        <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
          <div class="flex justify-between items-center">
            <div>
              <label for=""> Lớp: </label>
              <a-select class="p-6" v-model:value="selectedOption" >
      <a-select-option v-for="option in optionsWithValueAndLabel" :key="option.value" :value="option.value">
        {{ option.label }}
      </a-select-option>  
    </a-select>
            </div>
  
            <a-button
            v-show="userRole === 'consultant'"
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
                  name="subject"
                  label="Tiêu đề"
                  :rules="[
                    {
                      required: true,
                      message: 'chưa điền tiêu đề!',
                    },
                  ]"
                >
                  <a-input v-model:value="formState.subject" />
                </a-form-item>
  
                <a-form-item
                  name="message"
                  label="Nội dung"
                  :rules="[
                    {
                      required: true,
                      message: 'Vui lòng chọn nội dung!',
                    },
                  ]"
                >
                  <a-textarea v-model:value="formState.message" />
                </a-form-item>
  
                
  
                
              </a-form>
             </a-modal>
            
          </div>
  
          <div>
            <a-alert v-show="useNotice.successMsg === true" message="Thao tác thành công" type="success" show-icon />
            <a-alert v-show="useNotice.errorMsg === true" message="Thao tác thất bại" type="error" show-icon />
            <div
              v-for="(item, index) in useNotice.listNotice"
              :key="index"
              class="forum-item bg-[#ecf2f7] my-3 w-[60%] rounded-md cursor-pointer"
                
            >
              <div class="flex justify-between relative">
                <div class="font-bold">
                  {{ item.subject }}
                </div>
  
                <div @click="showOptions[index] = !showOptions[index]">
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
                <div
                  v-if="showOptions[index]"
                  class="absolute right-[-8px] top-6 bg-[#f0f2f5] text-xs p-1"
                >
                  
                  <div v-if="userRole === 'consultant'" @click="handleOptionClick('edit')">
                    <router-link :to="{ path: '/consultant/notice/edit/' + item._id }"
                      >Sửa</router-link
                    >
                  </div>
                  <div v-if="userRole === 'consultant'" @click="deleteNotice(item._id)">Xóa</div>
                </div>
              </div>
              <div>
                {{ item.username }}
              </div>
              <div>
                {{ item.message }}
              </div>
            </div>
            <hr style="border-top: 1px solid #ddd" />
          </div>
        </div>
      </div>
      <Loading v-if="showLoading" />
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, reactive, ref, toRaw, watch } from "vue";
  import NavTitle from"../NavBar/NavTitle.vue";
  import Loading from '../Spinner/Loading.vue';
  import Spinner from '../Spinner/Spinner.vue';
  import { RouterLink, RouterView } from "vue-router";
  import { getClass, getId, getRole, getUsername, getStudentClass } from "../../../utils/getInfoUser";
  import { sendNoti } from "../../../socket/socket-client.js";
  import { message } from "ant-design-vue";
  import { useNoticeStore } from "../../../stores/notice.js";
  import { useUploadStore } from "../../../stores/upload.js";
  
  export default defineComponent({
    setup() {
      const formRef = ref();
      const visible = ref(false);
      const successMsg = ref(false);
      const errorMsg = ref(false);
      const userClass = getClass();
      const selectedOption = ref('');
      if (getRole === 'consultant') {
        selectedOption.value = (userClass[0]);
      } 
      else {
        selectedOption.value = (getStudentClass());
      }
      const formState = reactive({
        user: getId(),
        message: "",
        subject: "",
        _class: ""
      });
  
      const optionsWithValueAndLabel = userClass.map((className) => {
        return { value: className, label: className };
      });
  
      watch(selectedOption, async (newVal) => {
        await useNotice.getListNotice(newVal);
        formState._class = newVal;
       });
  
      const onOk = () => {
        formRef.value
          .validateFields()
          .then(async (values) => {
            console.log("formState: ", toRaw(formState));
            const notice = toRaw(formState);
            const noti = {
            noti: notice.subject,
            room: notice._class
          }
            sendNoti(noti);  
             
            useNotice.addNotice(notice);
            await useNotice.getListNotice(selectedOption.value);
            visible.value = false;
            formRef.value.resetFields();
            console.log("reset formState: ", toRaw(formState));
            successMsg.value = true;
            setTimeout(() => (successMsg.value = false), 3000); 
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
            errorMsg.value = true;
            setTimeout(() => (errorMsg.value = false), 3000); 
          });
      };
  
      const useNotice = useNoticeStore();
      const useImg = useUploadStore();
      const showOptions = reactive([]);
       const showLoading = ref(true);
      const pageTitle = ("Thông báo");
      const username = getUsername();
      const userRole = getRole();
       
      function handleOptionClick(option) {
        // Xử lý khi người dùng click vào một option
        console.log(option);
      }
  
      onMounted(async () => {
        await useNotice.getListNotice(selectedOption.value);
        formState._class = selectedOption.value;
        showLoading.value = false;
      });
  
      function deleteNotice(id) {
        console.log(id);
         useNotice.deleteNotice(id, selectedOption.value);
      }
  
      const uploadImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const img = await useImg.uploadImg(formData);
        formState.imageUrl = img;
        console.log(formState.imageUrl);
      }
       
      
      return {
        formState,
        formRef,
        visible,
        onOk,
        useNotice,
        pageTitle,
        showLoading,
        showOptions,
        deleteNotice,
        handleOptionClick,
        uploadImage,
        successMsg,
        errorMsg,
        username,
        userRole,
        useImg,
        optionsWithValueAndLabel,
        selectedOption
      };
    },
    components: { NavTitle, Loading, Spinner } 
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

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
  </style>
  