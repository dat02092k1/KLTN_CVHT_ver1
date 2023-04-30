<template>
    <div>
        <NavTitle :title="pageTitle"/>

        <router-link class="" :to="{ path: '/consultant/progress'}" >
      <button class="bg-[#ef1419] rounded text-[#ffffff] ml-6 my-2 p-2">Quay lại</button>
              </router-link>
        <div class="post h-[350px] overflow-auto">
          <div class="forum-item w-[80%] rounded-md mx-auto bg-[#fff]">
            <div class="flex flex-col my-3">
              <label class="font-medium text-base" for="">Tiêu đề:</label>
              <span>
                <input class="p-3 w-[50%] border-solid border-black border-[1px]" type="text" v-model="report.title" >
              </span>
            </div>

            <div class="flex flex-col my-3">
              <label class="font-medium text-base" for="">Nội dung:</label>
              <span> 
                
                <textarea class="p-3 w-[50%] border-solid border-black border-[1px]" name="" id="" cols="30" rows="3" v-model="report.content"></textarea>
                 
              </span>
            </div>

            <div class="">
                <input type="file"
           accept=".pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
           ref="fileInput"
           @change="handleFileUpload"
           multiple>
    <ul v-for="(item, index) in report.fileUrl" :key="index">
        <a :href="item.url">file {{ index + 1 }}</a>
        <button @click="deleteFile(index)" class="bg-red-500 my-6 ml-2 rounded text-[#ffffff] p-2">Xóa file</button>
    </ul>
            </div>

            <!-- <div>
                <input
                type="file"
                accept=".pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ref="fileInput"
                multiple
              />
            </div> -->
          </div>

          <div class="text-center">
            <button @click="submit" class="bg-[#324f90] text-[#fff] rounded m-2 p-2">Lưu</button>
          </div>
        </div>
        <Loading v-if="useUpload.loading" />
    </div>
</template>

<script>
  import { RouterLink, useRoute } from "vue-router";
  import NavTitle from "../NavBar/NavTitle.vue";
  import { useReportStore } from "../../../stores/report.js";
  import { useUploadStore } from "../../../stores/upload.js";
  import { getId } from "../../../utils/getInfoUser.js";
  import Loading from "../Spinner/Loading.vue";
  import { message } from "ant-design-vue";

  export default { 
    data() {
      return {
        useReport: useReportStore(),
        id: useRoute().params.id,
        pageTitle: "Edit báo cáo",
        report: {
            userId: getId(),
            title: "",
            content: "",
            fileUrl: []
        },
        useUpload: useUploadStore()
      };
    },
    async mounted() {
        this.report = await this.useReport.getDetailsReport(this.id);
    },
    methods: {
        async submit() {
            if (this.$refs.fileInput.files.length === 0 && this.report.fileUrl.length === 0) {
            alert("Please select at least one file to upload.");
            return;
          }

          const reportId = this.id;

          const res = await this.useReport.editReport(this.report, reportId);
          console.log(res);

          if (res.status === 200) {
          setTimeout(() => {
          message.success({
          content: 'Cập nhật thành công!',
          duration: 2,
          });
          }, 1000);
          }
          else {
            setTimeout(() => {
          message.error({
          content: 'Cập nhật thất bại!',
          duration: 2,
          });
          }, 1000);
          }
        },
        deleteFile(index) {
            this.report.fileUrl.splice(index, 1);
        },
        async handleFileUpload(event) {
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
        formData.append('docs', files[i]);
      }
       
        const docs = await this.useUpload.uploadMultiDocs(formData);
        this.report.fileUrl = docs;
        console.log(this.report);
    }
    },
    components: { NavTitle, Loading },
  }
</script>