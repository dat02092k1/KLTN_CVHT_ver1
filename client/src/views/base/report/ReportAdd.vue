<template>
  <div>
    <div class="mx-6">
      <NavTitle :title="pageTitle" />

      <div class="flex my-3 rounded justify-end mx-6">
        <a-button type="primary" @click="showModal">Thêm báo cáo</a-button>
        <a-modal v-model:visible="visible" title="Thêm báo cáo" @ok="handleOk">
          <a-form
            ref="formRef"
            :model="formState"
            layout="vertical"
            name="form_in_modal"
          >
            <a-form-item
              name="title"
              label="Tiêu đề"
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
              name="content"
              label="Nội dung báo cáo"
              :rules="[
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ]"
            >
              <a-input v-model:value="formState.content" />
            </a-form-item>

            <a-form-item name="file" label="File báo cáo:">
              <input
                type="file"
                accept=".pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ref="fileInput"
                multiple
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>

      <div class=" bg-[#fff] mx-6 h-[400px] overflow-y-auto">
        <a-list
          item-layout="horizontal"
          size="small"
          :pagination="pagination"
          :data-source="useReport.reports"
          class="my-2"
        >
          <template #renderItem="{ item }">
            <a-list-item key="item.title">
              <a-list-item-meta :description="item.username">
                <template #title>
                  <a :href="item.href">{{ item.title }}</a>
                </template>
                <template #avatar
                  ><a-avatar
                    src="https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg"
                /></template>
              </a-list-item-meta>
              Nội dung: {{ item.content }}
              <div>Files:</div>
              <div class="flex gap-2">
                <div v-for="(file, index) in item.fileUrl" :key="index">
                  <span class="text-[#008dff]">
                    <a :href="file.url"> file {{ index + 1 }}</a>
                  </span>
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-xs"> 
                {{ formatDate(item.createdAt) }}  
                </span>

                <div>
                    <RouterLink class="mr-1" :to="{ path: '/consultant/report/edit/' + item._id }">
                      <button class="mr-1">
                      <i class="fa-regular fa-pen-to-square"></i>
                    </button> 
                    </RouterLink>
                    
                  <span>
                    <a-popconfirm
                      title="Title"
                      @confirm="confirm(item._id)"
                      @cancel="cancel"
                    >
                      <button class="mr-1">
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </a-popconfirm>
                  </span>
                </div>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
    <Loading v-if="useReport.loading" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRaw, onMounted } from "vue";
import NavTitle from "../NavBar/NavTitle.vue";
import Loading from "../Spinner/Loading.vue";
import { getId } from "../../../utils/getInfoUser.js";
import { useReportStore } from "../../../stores/report.js";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const pageTitle = "Báo cáo tiến độ";
    const showLoading = ref(false);

    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          console.log("formState: ", toRaw(formState));
          if (fileInput.value.files.length === 0) {
            alert("Please select at least one file to upload.");
            return;
          }

          const formData = new FormData();
          formData.append("title", formState.title);
          formData.append("content", formState.content);
          formData.append("userId", formState.userId);
          const files = fileInput.value.files;
          for (let i = 0; i < files.length; i++) {
            formData.append("docs", files[i]);
          }

          console.log(formData);

          useReport.addReport(formData);
          visible.value = false;
          formRef.value.resetFields();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    const useReport = useReportStore();
    const fileInput = ref();
    const formRef = ref();
    const formState = reactive({
      userId: getId(),
      title: "",
      content: "",
      fileUrl: [],
    });

    onMounted(async () => {
      await useReport.getReports();
    });
 

    const pagination = {
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    };

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }


    const confirm = async (id) => {
      const data = await useReport.deleteReport(id);
      console.log(data);
    };

    const cancel = (e) => {
      console.log(e);
      message.error("Click on No");
    };
    return {
      pageTitle,
      showLoading,
      formRef,
      visible,
      showModal,
      handleOk,
      fileInput,
      formState,
      useReport,
      pagination,
      confirm,
      cancel,
      formatDate
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

:deep(.ant-btn) {
  background-color: #1890ff;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>
