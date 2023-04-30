<template>
  <div>
    <nav-title :title="pageTitle" class="p-4"/>


    <div class="mx-auto w-[70%] h-[400px] overflow-y-auto">
    <a-list item-layout="horizontal" size="small" :pagination="pagination" :data-source="listData">
      
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
                 
          <a-list-item-meta :description="item.username">
    
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar><a-avatar src="https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg" /></template>
          </a-list-item-meta>
          Nội dung: 
          <span>
            {{ item.content }}
          </span>
           
          <div>Files:</div>
          <div class="flex gap-2">
            <div v-for="(file, index) in item.fileUrl" :key="index">
            <span class="text-[#008dff]">
                <a :href="file.url">
                file {{ index + 1 }}</a> </span>
          </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
  </div>
  </template>
  <script>
  import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import { useReportStore } from '../../../stores/report.js';
  import NavTitle from "../NavBar/NavTitle.vue";

  const listData = ref ([]);
  for (let i = 0; i < listData.value.length; i++) {
    listData.value.push({
        username: `ant design vue part ${i}`,
      title: `ant design vue part ${i}`,
      avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }
  export default defineComponent({
    components: {
      StarOutlined,
      LikeOutlined,
      MessageOutlined,
      NavTitle
    },
    setup() {
      const pagination = {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      };
      
      const useReport = useReportStore();

      const pageTitle = "Báo cáo tiến độ các lớp";
      onMounted(async () => { 
        listData.value = await useReport.getListReport(); 
      })

      return {
        listData,
        pagination,
        pageTitle
      };
    },
  });
  </script>

  <style scoped>
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
  </style>