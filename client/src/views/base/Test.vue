<template>
  <div>
    <div
      v-for="(navItem, index) in navigationWithConditions"
      :key="index"
      :class="['h-12 hover:bg-[#2d3c50]', {'bg-red-500': navItem.active}]"
      @click="navItemClick(navItem, index)"
    >
      <a href="">
        <li>
          <router-link :to="navItem.to" class="px-5">
            <i :class="navItem.iconClass"></i>
            <span>{{ navItem.title }}</span>
          </router-link>
        </li>
      </a>
    </div>
  </div>
</template>

<script>
import { getRole } from '../../utils/getInfoUser.js'

export default {
  data() {
    return {
      navigation: [
        {
          title: "Trang chủ",
          to: "/",
          iconClass: "fa-solid fa-house mr-4",
          clicked: false
        },
        {
          title: "Danh sách sinh viên",
          to: "/student/list",
          iconClass: "fa-solid fa-list mr-4",
          clicked: false
        },
        // ... other navigation items
      ],
      userRole: null
    };
  },
  computed: {
    navigationWithConditions() {
      return this.navigation.filter((navItem) => {
        if (navItem.to === '/') {
          return true; // Always show "Trang chủ" link
        } else if (navItem.to.includes('/student/')) {
          return this.userRole !== "manager";
        } else if (navItem.to.includes('/consultant/')) {
          return this.userRole === 'manager';
        }
      });
    }
  },
  methods: {
    navItemClick(index) {
      this.navigationWithConditions.forEach((navItem) => {
    navItem.active = false; // Set all items to inactive
  });
  this.navigationWithConditions[index].active = true; // Set click
}
  }
}
</script>

<style>
.clicked {
  background-color: red;
}
</style>
