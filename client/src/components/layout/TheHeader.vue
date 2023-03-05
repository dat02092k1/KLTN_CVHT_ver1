<template>
    <div class="header bg-[#ffffff]">
        <div class="flex items-center">
            <div class="nav-menu mr-4">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="mr-2 hidden md:block">
                Bảng điều khiển
            </div>
            <span class="text-[#97a8be]">/</span>
            <div class="ml-4 text-[#97a8be]">
                UET Study Consultant
            </div>
        </div>
        <div class="flex items-center">
            <!-- <div class="mr-3">Xin chào</div>
            <span class="text-[#576e9f] font-bold cursor-pointer"> {{ this.username }} </span>
            <div class="ml-3 cursor-pointer">
                <i class="fa-solid fa-caret-down"></i>
            </div> -->
            <div class="mr-3">Xin chào</div>
            <a-dropdown-button>
                {{ this.username }}
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
            Xem thông tin cá nhân
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            Xem lại các bài đăng của mình
          </a-menu-item>
          <a-menu-item key="3" class="flex items-center" @click="logout">
            <UserOutlined />
            Đăng xuất
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><UserOutlined /></template>
    </a-dropdown-button>
        </div>
    </div>
</template>

<script>
import { getUsername } from '../../utils/getInfoUser.js'
import { useAuthStore } from '../../stores/auth.js'

import { defineComponent } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';

export default {
    data() {
        return {
          username: '',
          useAuth: useAuthStore()   
        }
    },
    mounted() {
        this.username = getUsername();
    },
    methods: {
        handleButtonClick(e) {
            console.log('click left button', e);
        },
        handleMenuClick(e) {
      console.log('click', e);
        },
        logout() {
            this.useAuth.logout();
        }
    },
    components: {
        UserOutlined
    }
 }
</script>

<style scoped>
.header {
    width: calc(100% - 250px);
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    padding: 14px 20px;
} 

::v-deep .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;
}
</style>