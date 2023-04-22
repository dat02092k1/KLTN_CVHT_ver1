<template>
    <div>
        <div class="add-header">
      <NavTitle :title="pageTitle" />
    </div>
        <router-link class="" :to="{ path: '/consultant/notice'}" >
      <button class="bg-[#ef1419]  text-[#ffffff] mx-6 rounded my-2 p-1">Quay lại</button>
              </router-link>
        <div class="bg-[#fff] m-6">
         
        <a-form 
        class="p-3 rounded"
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
                      message: 'Please input the subject of collection!',
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
                      message: 'Please input the message of collection!',
                    },
                  ]"
                >
                  <a-textarea v-model:value="formState.message" />
                </a-form-item>  

                <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="flex gap-1">
              
          <a-button type="primary" @click="onSubmit" class="bg-[#324f90]"
            >Lưu</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm"
            >Reset</a-button
          >
        </a-form-item>
              </a-form>
    </div>
    </div>
    
</template>

<script>
  import { defineComponent, onMounted, reactive, ref, toRaw, watch } from "vue";
  import NavTitle from"../NavBar/NavTitle.vue";
  import Loading from '../Spinner/Loading.vue';
  import { getId, getClass } from "../../../utils/getInfoUser";
  import { useNoticeStore } from "../../../stores/notice.js";
  import { RouterLink, RouterView, useRoute } from "vue-router";

  export default defineComponent({
    setup() {
      const formRef = ref();
      const successMsg = ref(false);
      const errorMsg = ref(false);
      const formState = reactive({
        user: "",
        message: "",
        subject: "",
        _class: ""
      });
  
      const useNotice = useNoticeStore();
      const noticeId = useRoute().params.id; 
      const pageTitle = ref("Sửa thông báo");
 
      onMounted(async () => {
        const data = await useNotice.getDetailsNotice(noticeId);
        console.log(data);
        formState._class = data._class;
        formState.subject = data.subject;
        formState.message = data.message;
        formState.user = data.userId;
      });
       
      const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState);
        useNotice.editNotice(noticeId, formState);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    }; 

      return {
        formState,
        formRef,
        useNotice,
        successMsg,
        errorMsg,
        pageTitle,
        onSubmit,
        resetForm 
      };
    },
    components: { NavTitle, Loading } 
  });
</script>

<style scoped>
:deep(.ant-form-item-control-input-content) {
    display: flex;
    align-items: center;
}
</style>