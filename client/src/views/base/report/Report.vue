<template>
    <div>
        Report
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
    const pageTitle = "Báo cáo tiến bịp";
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
      confirm,
      cancel,
    };
  },
  components: { NavTitle, Loading },
});
</script>