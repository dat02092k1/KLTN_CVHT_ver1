<template>
  <div>
    <div class="header-forum">
      <NavTitle :title="pageTitle" />

      <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
        <div class="flex justify-between items-center">
          <div>
            <router-link :to="{ path: '/student/onegate/forms/' + studentId }">
              <button class="bg-[#2296f3] p-2 rounded text-[#ffffff]">
                Danh sách mẫu đã nộp
              </button>
            </router-link>
          </div>

          <a-button
            class="bg-[#324f90] rounded"
            type="primary"
            @click="visible = true"
            >Thêm biểu mẫu</a-button
          >

          <a-modal
            v-model:visible="visible"
            title="Thêm biểu mẫu mới"
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
                name="type"
                label="Type"
                :rules="[
                  {
                    required: true,
                    message: 'Chưa điền tên biểu mẫu!',
                  },
                ]"
              >
                <a-input v-model:value="formState.type" />
              </a-form-item>


              <a-form-item name="file" label="File">
                <input type="file" @change="uploadDocs">
              </a-form-item>
            </a-form>
            <Spinner v-show="useUpload.loading" />
          </a-modal>
        </div>

        <div class="flex justify-center my-4">
          <a-alert
            v-show="useForm.successMsg === true"
            message="Thêm biểu mẫu thành công"
            type="success"
            show-icon
          />
          <a-alert
            v-show="useForm.errorMsg === true"
            message="Thêm biểu mẫu thất bại"
            type="error"
            show-icon
          />

          <a-menu
            v-model:selectedKeys="selectedKeys"
            style="width: 300px"
            mode="inline"
            :open-keys="openKeys"
            @openChange="onOpenChange"
          >
            <a-sub-menu key="sub1">
              <template #icon>
                <MailOutlined />
              </template>
              <template #title>Biểu mẫu</template>
              <a-menu-item key="1">
                <span><i class="fa-solid fa-sheet-plastic"></i> </span>
                <router-link :to="{ path: '/student/onegate/training' }">
                  <span> Phiếu đánh giá kết quả rèn luyện </span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="2">
                <span><i class="fa-solid fa-sheet-plastic"></i> </span>
                <router-link :to="{ path: '/student/onegate/meeting' }">
                  <span> Biên bản họp lớp </span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="3">
                <span><i class="fa-solid fa-sheet-plastic"></i> </span>
                <router-link :to="{ path: '/student/onegate/study' }">
                  <span> Kế hoạch học tập </span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="4">
                <span><i class="fa-solid fa-sheet-plastic"></i> </span>
                <router-link :to="{ path: '/student/onegate/rest' }">
                  <span> Khác </span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs, toRaw, watch } from "vue";
import NavTitle from "../NavBar/NavTitle.vue";
import Loading from "../Spinner/Loading.vue";
import Spinner from "../Spinner/Spinner.vue";
import { RouterLink, RouterView } from "vue-router";
import {
  getClass,
  getId,
  getRole,
  getUsername,
} from "../../../utils/getInfoUser";
import { sendNoti } from "../../../socket/socket-client.js";
import { message } from "ant-design-vue";
import { useFormStore } from "../../../stores/form.js";
import { useUploadStore } from "../../../stores/upload.js";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);
    const successMsg = ref(false);
    const errorMsg = ref(false);
    const userClass = getClass()
    const formState = reactive({
      student: getId(),
      type: "",
      fileUrl: "",
      _class: userClass[0],
    });    

    const studentId = getId();
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      selectedKeys: [],
    });

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          if(!formState.fileUrl) {
            alert("Chưa chọn file");
            return;
          }
          
          console.log("formState: ", toRaw(formState));
          const form = toRaw(formState);

          useForm.addForm(form);
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

    const useForm = useFormStore();
    const useUpload = useUploadStore();
    const showLoading = ref(true);
    const pageTitle = "Biểu mẫu";
    const username = getUsername();
    const userRole = getRole();


    // onMounted(async () => {
    //    showLoading.value = false;
    // });

    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    const uploadDocs = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('doc', file);
        const docs = await useUpload.uploadDocs(formData);
        formState.fileUrl = docs;
        console.log(formState.fileUrl);
      }

    return {
      formState,
      formRef,
      visible,
      onOk,
      useForm,
      pageTitle,
      showLoading,
      uploadDocs,
      successMsg,
      errorMsg,
      username,
      userRole,
      useUpload,
      ...toRefs(state),
      onOpenChange,
      studentId
    };
  },
  components: {
    NavTitle,
    Loading,
    Spinner,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
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
</style>
