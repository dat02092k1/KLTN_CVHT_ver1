<template>
  <div>
    <div class="header-forum">
      <NavTitle :title="pageTitle" />

      <div class="forum-list bg-[#fff] px-[1.5rem] py-4 mx-6 rounded">
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

              <a-form-item
                name="image"
                label="Image"
              >
             
      <input type="file" @change="uploadImage" accept="image/*">
              </a-form-item>

              
            </a-form>
            <Spinner v-show="useImg.loading" />
          </a-modal>
          
        </div>

        <div class="forum-table bg-[#fff]">
          <a-alert v-show="useForum.successMsg === true" message="Thêm bài đăng thành công" type="success" show-icon />
          <a-alert v-show="useForum.errorMsg === true" message="Thêm bài đăng thất bại" type="error" show-icon />
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
                <div v-if="userRole === 'manager' || username === item.username" @click="handleOptionClick('edit')">
                  <router-link :to="{ path: '/student/forum/edit/' + item._id }"
                    >Sửa</router-link
                  >
                </div>
                <div v-if="userRole === 'manager' || username === item.username" @click="deletePost(item._id)">Xóa</div>
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

      <div class="flex flex-col ml-[1.5rem]">
          <div class="flex gap-1">
            <button @click="prevPage" :disabled="currentPage === 1">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <span> Trang: {{ currentPage }} / {{ useForum.totalPages }} </span>
            <button
              @click="nextPage"
              :disabled="currentPage === useForum.totalPages"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <ul class="flex gap-1">
            <li
              v-for="page in pages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
          </ul>
        </div>
    </div>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRaw, watch, computed } from "vue";
import NavTitle from"../NavBar/NavTitle.vue";
import Loading from '../Spinner/Loading.vue';
import Spinner from '../Spinner/Spinner.vue';
import { RouterLink, RouterView } from "vue-router";
import { getClass, getId, getRole, getUsername } from "../../../utils/getInfoUser";
import { sendNoti } from "../../../socket/socket.js";
import { message } from "ant-design-vue";
import { useForumStore } from "../../../stores/forum.js";
import { useUploadStore } from "../../../stores/upload.js";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);
    const successMsg = ref(false);
    const errorMsg = ref(false);
    const userClass = getClass();
    const selectedOption = ref(userClass[0]);
    const formState = reactive({
      user: getId(),
      title: "",
      content: "",
      imageUrl: "",
      _class: selectedOption.value
    });

    const optionsWithValueAndLabel = userClass.map((className) => {
      return { value: className, label: className };
    });

    watch(selectedOption, async (newVal) => {
      await useForum.getPostsPerPage(newVal, currentPage.value);
      formState._class = newVal;
      console.log(formState._class);
    });

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          console.log("formState: ", toRaw(formState));
          const post = toRaw(formState);
          
          useForum.addPost(post);

          const noti = {
          noti: post.title,
          room: post._class
        }
          sendNoti(noti);
          useForum.getPostsPerPage(formState._class, 1);
          console.log(formState._class);
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

    const useForum = useForumStore();
    const useImg = useUploadStore();
    const showOptions = reactive([]);
    const _class = "K64-C-CLC";
    const showLoading = ref(true);
    const pageTitle = ("Diễn đàn FAQ");
    const username = getUsername();
    const userRole = getRole();

    function handleOptionClick(option) {
      // Xử lý khi người dùng click vào một option
      console.log(option);
    }

    const currentPage = ref(1);

    onMounted(async () => {
      await useForum.getPostsPerPage(selectedOption.value, currentPage.value);
      showLoading.value = false;
    });

    function deletePost(id) {
      showLoading.value = true;
      useForum.deletePost(id, selectedOption.value, currentPage.value);
      showLoading.value = false;
    }

    const uploadImage = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const img = await useImg.uploadImg(formData);
      formState.imageUrl = img;
      console.log(formState.imageUrl);
    }
     
    const prevPage = () => {
      showLoading.value = true;
      currentPage.value -= 1;
      useForum.getPostsPerPage(selectedOption.value, currentPage.value);
      showLoading.value = false;
    };

    const nextPage = () => {
      showLoading.value = true;
      currentPage.value += 1;
      useForum.getPostsPerPage(selectedOption.value, currentPage.value);
      showLoading.value = false;
    };

    const goToPage = (page) => {
      showLoading.value = true;
      currentPage.value = page;
      useForum.getPostsPerPage(selectedOption.value, currentPage.value);
      showLoading.value = false;
    };

    const pages = computed(() => {
      const pages = [];
      for (let i = 1; i <= useForum.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    });
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
      uploadImage,
      successMsg,
      errorMsg,
      username,
      userRole,
      useImg,
      optionsWithValueAndLabel,
      selectedOption,
      currentPage,
      prevPage,
      nextPage,
      goToPage,
      pages
    };
  },
  components: { NavTitle, Loading, Spinner } 
});
</script>

<style scoped>
.forum-list {
  height: calc(100vh - 150px - 30px);
}

.forum-table {
  overflow-y: auto;
  height: 300px;
}
.forum-item {
  border: 1px solid #85bde5;
  padding: 20px;
}
</style>
