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
        <div class="flex">
            <div class="mr-3">Xin chào</div>
            <span class="text-[#576e9f] font-bold cursor-pointer"> {{ this.username }} </span>
            <div class="ml-3 cursor-pointer">
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { getUsername } from '../../utils/getInfoUser.js'

export default {
    data() {
        return {
          username: ''
        }
    },
    mounted() {
        this.username = getUsername();
          
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
</style>