<template>
  <div>
    <NavTitle :title="pageTitle" />

    <div class="flex justify-end my-2 mx-7">
      <router-link :to="{ path: '/student/onegate/forms/' + studentId }">
        <button class="bg-[#2296f3] p-2 rounded text-[#ffffff]">
          Danh sách mẫu đã nộp
        </button>
      </router-link>
    </div>

    <div class="flex flex-col justify-center items-center my-4">
      <div class="my-3">
        <h2 class="font-bold text-lg">Chọn biểu mẫu nộp</h2>
      </div>
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
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue";
import NavTitle from "../NavBar/NavTitle.vue";
import { getId } from "../../../utils/getInfoUser.js";
import { useFormStore } from "../../../stores/form.js";

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    NavTitle,
  },
  setup() {
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      selectedKeys: [],
    });

    const pageTitle = "Điền biểu mẫu";

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

    const useForm = useFormStore();

    const studentId = getId();

    const forms = ref([]);
    onMounted(async () => {
      // const _id = getId();
      // forms.value = await useForm.getUserForms(_id);
      // console.log(forms.value);
    });
    return {
      ...toRefs(state),
      onOpenChange,
      pageTitle,
      forms,
      studentId,
    };
  },
});
</script>
