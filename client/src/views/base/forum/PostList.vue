<template>
  <div>
    <div class="header-forum">
      <NavTitle :title="pageTitle.value" />

      <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
        <div class="flex justify-end">
          <a-button
            class="bg-[#324f90] rounded"
            type="primary"
            @click="visible = true"
            >Thêm bài đăng</a-button
          >

          <a-modal
            v-model:visible="visible"
            title="Thêm bài đăng mới"
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
              name="content"
              label="Content"
               :rules="[
                  {
                    required: true,
                    message: 'Please input the content of collection!',
                  },
                ]"
              >
                <a-textarea v-model:value="formState.content" />
              </a-form-item>
            </a-form>
          </a-modal>
        </div>

        <div>
          <div
            v-for="(item, index) in useForum.listPost"
            :key="index"
            class="forum-item bg-[#ecf2f7] my-3 w-[60%] rounded-md cursor-pointer"
          >
            <div class="flex justify-between relative">
              <div class="font-bold">
                {{ item.title }}
              </div>

              <div @click="showOptions[index] = !showOptions[index]">
                <i class="fa-solid fa-ellipsis"></i>
              </div>
              <div
                v-if="showOptions[index]"
                class="absolute right-[-8px] top-6 bg-[#f0f2f5] text-xs p-1"
              >
                <div @click="handleOptionClick('view')">
                  <router-link
                    :to="{ path: '/student/forum/post/' + item._id }"
                  >
                    Xem
                  </router-link>
                </div>
                <div @click="handleOptionClick('edit')">
                  <router-link :to="{ path: '/student/forum/edit/' + item._id }"
                    >Sửa</router-link
                  >
                </div>
                <div @click="deletePost(item._id)">Xóa</div>
              </div>
            </div>
            <div>
              {{ item.username }}
            </div>
            <div>
              {{ item._class }}
            </div>
          </div>
          <hr style="border-top: 1px solid #ddd" />
        </div>
      </div>
    </div>
    <Spinner v-if="showLoading" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRaw } from "vue";
import NavTitle from "../NavTitle.vue";
import Spinner from "../Spinner/Spinner.vue";

import { RouterLink, RouterView } from "vue-router";
import { getUsername, getClass } from "../../../utils/getInfoUser";

import { useForumStore } from "../../../stores/forum.js";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);

    const formState = reactive({
      username: getUsername(),
      title: "",
      content: "",
      _class: getClass(),
    });

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          console.log("formState: ", toRaw(formState));
          const post = toRaw(formState);
          useForum.addPost(post);
          useForum.getListPosts(getClass());
          visible.value = false;
          formRef.value.resetFields();
          console.log("reset formState: ", toRaw(formState));
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    const useForum = useForumStore();

    const showOptions = reactive([]);
    const _class = "K64-C-CLC";
    const showLoading = ref(true);
    const pageTitle = ref("Diễn đàn FAQ");

    function handleOptionClick(option) {
      // Xử lý khi người dùng click vào một option
      console.log(option);
      // ở đây có thể gọi các method tương ứng với option được chọn
      // ví dụ: this.handleViewClick() nếu option là 'view'
      // ẩn các option sau khi người dùng click
    }

    onMounted(async () => {
      useForum.getListPosts(_class);
      showLoading.value = false;
    });

    function deletePost(id) {
      useForum.deletePost(id);
    }

    return {
      formState,
      formRef,
      visible,
      onOk,
      useForum,
      pageTitle,
      showLoading,
      showOptions,
      deletePost,
      handleOptionClick,
    };
  },
  components: { NavTitle, Spinner },
});
</script>

<!-- <script>
import NavTitle from "../NavTitle.vue";
import Spinner from "../Spinner/Spinner.vue";

import { RouterLink, RouterView } from "vue-router";
import { useForumStore } from "../../../stores/forum.js";

export default {
  data() {
    return {
      useForum: useForumStore(),
      _class: "K64-C-CLC",
      showOptions: [],
      showLoading: true,
      pageTitle: "Diễn đàn FAQ",
    };
  },
  mounted() {
    this.useForum.getListPosts(this._class);
    this.showLoading = false;
  },
  methods: {
    handleOptionClick(option) {
      // Xử lý khi người dùng click vào một option
      console.log(option);
      // ở đây có thể gọi các method tương ứng với option được chọn
      // ví dụ: this.handleViewClick() nếu option là 'view'
      // ẩn các option sau khi người dùng click
    },
    deletePost(id) {
      this.useForum.deletePost(id);
    },
  },
  components: { NavTitle, Spinner },
};
</script> -->

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
