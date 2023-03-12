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
          UET Portal
        </h1>
      </a>
    </div>

    <div class="sidebar-scrollbar mt-3">
      <ul class="hidden md:block">
        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <div class="px-5">
                <i class="fa-solid fa-house mr-4"></i>
                <span>Trang chủ</span>
              </div>
            </li>
          </a>
        </div>

        <div
          class="h-12 hover:bg-[#2d3c50] flex items-center"
          v-if="userRole === 'manager'"
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
              <router-link to="/student/chart" class="px-5">
                <i class="fa-solid fa-chart-simple mr-4"></i>
                <span>Điểm sinh viên</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <router-link to="/student/course" class="px-5">
                <i class="fa-solid fa-graduation-cap mr-4"></i>
                <span>Kết quả học tập</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <router-link :to="getRole === 'student' ? '/student/task' : '/consultant/task'" class="px-5">
                <i class="fa-solid fa-list-check mr-4"></i>
                <span>Nhiệm vụ</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <router-link to="/student/forum/posts" class="px-5">
                <i class="fa-regular fa-circle-question mr-4"></i>
                <span>Diễn đàn</span>
              </router-link>
            </li>
          </a>
        </div>

        <div class="h-12 hover:bg-[#2d3c50] flex items-center">
          <a href="">
            <li>
              <router-link to="/student/conversation" class="px-5">
                <i class="fa-regular fa-message mr-4"></i>
                <span>Trò chuyện</span>
              </router-link>
            </li>
          </a>
        </div>

        <!-- <div class="h-12 hover:bg-[#2d3c50] flex items-center justify-center"
        :class="[
          { active: activeColor === 'active2' },
          'hover:bg-2d3c50'
        ]"
        @click="changeColor('active2')">
                    <router-link class="flex items-center py-0 px-5 justify-center" to="/student/list">
                        <i class="fa-solid fa-list mr-4"></i>
                        <div>Danh sách sinh viên</div>
                    </router-link>
                </div> -->

        <!-- <div class="h-12 hover:bg-[#2d3c50] flex items-center justify-center" :class="{ active: color === activeColor }"
  @click="changeColor('active3')">
                    <router-link class="flex items-center py-0 px-5 justify-center" to="/student/chart">
                        <i class="fa-solid fa-chart-simple mr-4"></i>
                        <div>Điểm sinh viên</div>
                    </router-link>
                </div> -->

        <!-- <div class="h-12 hover:bg-[#2d3c50] flex items-center justify-center" :class="{ active: color === activeColor }"
  @click="changeColor('active3')">
                    <router-link class="flex items-center py-0 px-5 justify-center" to="/student/chart">
                        <i class="fa-solid fa-graduation-cap "></i>
                        <div>Kết quả học tập</div>
                    </router-link>           
                </div> -->

        <!-- <div class="h-12 hover:bg-[#2d3c50] flex items-center justify-center" :class="{ active: color === activeColor }"
  @click="changeColor('active4')">
                    
                <router-link class="h-12 hover:bg-[#2d3c50]" :class="{ active: color === activeColor }"
  @click="changeColor('active4')" to="/student/forum">
                    <li class="flex items-center py-0 px-5">
                        <i class="fa-regular fa-circle-question mr-4"></i>
                        <div>Diễn đàn</div>
                    </li>
                </router-link>
                </div> -->

        <!-- <div class="h-12 hover:bg-[#2d3c50] flex items-center justify-center" :class="{ active: color === activeColor }"
  @click="changeColor('active3')">
                    <a class="item__list">
                     

                    <router-link class="flex items-center py-0 px-5" to="/student/conversation">
                        <i class="fa-regular fa-message mr-3"></i>
                        <div>Trò chuyện</div>
                    </router-link>
                </a> 
                </div> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { getRole } from "../../utils/getInfoUser.js";

export default {
  data() {
    return {
      sidebarWidth: "250px",
      isOpen: false,
      activeColor: "",
      userRole: getRole(),
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
      this.sidebarWidth = this.isOpen ? "250px" : "50px";
    },
    changeColor(color) {
      this.activeColor = color === this.activeColor ? "" : color;
    },
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
}

.item__list {
  color: var(--item-color);
}

.active1 {
  background-color: #2d3c50;
  color: #409eff;
}

.active2 {
  background-color: #2d3c50;
  color: #409eff;
}

.active3 {
  background-color: #2d3c50;
  color: #409eff;
}

.active4 {
  background-color: #2d3c50;
  color: #409eff;
}
</style>
