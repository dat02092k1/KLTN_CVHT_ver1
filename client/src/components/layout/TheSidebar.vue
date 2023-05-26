<template>
  <div class="sidebar hidden md:flex" :style="{ width: sidebarWidth }">
    <div class="sidebar-logo-container bg-black leading-[50px]">
      <a href="" class="flex justify-center items-center">
        <img
          class="w-8 h-8 align-middle mr-3"
          src="../../assets/images/logo_small.png"
          alt=""
        />
        <h1 class="text-[#fff] font-semibold leading-[50px] text-[14px]">
          UET Consultant
        </h1>
      </a>
    </div>

    <div class="sidebar-scrollbar mt-3">
      <ul class="hidden md:block">
        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <router-link to="/" class="px-5">
                <i class="fa-solid fa-house mr-4"></i>
                <span>Trang chủ</span>
              </router-link>
            </li>
          </a>
        </div>

        <div
          class="h-12 hover:bg-[#2d3c50] flex items-center"
          v-if="userRole === 'consultant' "
        >
          <a href="">
            <li>
              <router-link to="/student/list" class="px-5"> 
                <i class="fa-solid fa-list mr-4"></i>
                <span>Danh sách sinh viên</span>
              </router-link>
            </li>
          </a>
        </div>

        <div
          class="h-12 hover:bg-[#2d3c50] flex items-center"
          v-if="userRole === 'manager'"
        >
          <a href="">
            <li>
              <router-link to="/manager" class="px-5">
                <i class="fa-solid fa-list mr-4"></i>
                <span>Quản lý sinh viên</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <router-link to="/student/announcement" class="px-5">
                <i class="fa-solid fa-school mr-4"></i>
                <span>Thông báo học vụ</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole === 'consultant'">
          <a href="">
            <li>
              <router-link to="/consultant/progress" class="px-5">
                <i class="fa-solid fa-paste mr-4"></i>
                <span>Báo cáo</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole === 'manager'">
          <a href="">
            <li>
              <router-link to="/consultant/reports-list" class="px-5">
                <i class="fa-solid fa-paste mr-4"></i>
                <span>Báo cáo</span>
              </router-link>
            </li>
          </a>
        </div>

        <div
          class="h-12 hover:bg-[#2d3c50] flex items-center"
          v-if="userRole === 'consultant'"
        >
          <a href="">
            <li>
              <router-link to="/student/chart" class="px-5">
                <i class="fa-solid fa-chart-simple mr-4"></i>
                <span>Điểm sinh viên</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole !== 'manager'">
          <a href="">
            <li>
              <router-link to="/student/course" class="px-5">
                <i class="fa-solid fa-graduation-cap mr-4"></i>
                <span>Kết quả học tập</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole !== 'manager'">
          <a href="">
            <li>
              <router-link to="/consultant/notice" class="px-5">
                <i class="fa-solid fa-bullhorn mr-4"></i>
                <span>Thông báo</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole !== 'manager'">
          <a href="">
            <li>
              <router-link :to="getRole === 'student' ? '/student/onegate' : '/consultant/onegate'" class="px-5">
                <i class="fa-solid fa-file-waveform mr-5"></i>  
                <span>Biểu mẫu</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole !== 'manager'">
          <a href="">
            <li>
              <router-link :to="getRole === 'student' ? '/student/task' : '/consultant/task'" class="px-5">
                <i class="fa-solid fa-list-check mr-4"></i>
                <span>Nhiệm vụ</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole !== 'manager'">
          <a href="">
            <li>
              <router-link :to="getForumPath()" class="px-5">
                <i class="fa-regular fa-circle-question mr-4"></i>
                <span>Diễn đàn</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center" v-if="userRole !== 'manager'">
          <a href="">
            <li>
              <router-link to="/user/chat" class="px-5">
                <i class="fa-regular fa-message mr-4"></i>
                <span>Trò chuyện</span>
              </router-link>
            </li>
          </a>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { getRole } from "../../utils/getInfoUser.js";
import { MailOutlined } from '@ant-design/icons-vue';

export default {
  data() {
    return {
      sidebarWidth: "250px",
      isOpen: false,
      activeColor: "",
      userRole: getRole(),
      state: {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      selectedKeys: [],
      route: useRoute() 
    }
    };
  },
  computed: {
    forumPath() {
      if (this.userRole === 'consultant') {
        return "/consultant/forum/posts"
      } else if (this.userRole === 'student') {
        return '/student/forum/posts'
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
      this.sidebarWidth = this.isOpen ? "250px" : "50px";
    },
    changeColor(color) {
      this.activeColor = color === this.activeColor ? "" : color;
    }, 
    getForumPath() {
      if (this.userRole === 'consultant') {
        return "/consultant/forum/posts"
      }
      else if (this.userRole === 'student') {
        return '/student/forum/posts'
      }
    }
  },
  computed: {
    getRole() {
      return this.userRole;
    },
  },
};
</script>

<style scoped>
:root {
  --item-color: #b3bfce;
}
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #304156;
  box-sizing: border-box;
  flex-direction: column;
  flex-wrap: nowrap;
  color: #fff;
  overflow-y: auto;
}

.item__list {
  color: var(--item-color);
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>
