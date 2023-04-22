<template>
  <div class="flex items-center gap-1">
    <h2>Thông báo</h2>
    <div>
      <div
        class="notification-icon"
        @click="showNotifications"
        :class="{ active: displayNotifications }"
      >
        <i class="fa-solid fa-bell"></i>
        <span v-if="notificationCount" class="badge">{{
          notificationCount
        }}</span>
      </div>

      <ul
        v-if="displayNotifications"
        class="bg-[#ffffff] p-2 h-[300px] overflow-y-auto absolute"
      >
        <h2 class="font-bold">Thông báo</h2>
        <li v-for="notification in notifications" :key="notification._id">
          <div class="noti_item hover:bg-[#e4e6eb] flex flex-col">
            <span>{{ notification.message }}</span>

            <button
              class="text-xs text-end"
              @click="markAsRead(notification._id)"
            > Mark as read
            </button>
            <router-link v-if="notification.postId" :to="'/student/forum/post/' + notification.postId._id">xem bài đăng</router-link>
            <router-link v-if="notification.noticeId" :to="'/consultant/notice/'">Xem thông báo</router-link>

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { axiosIns } from "../../../api/axios.js";
import { useNotiStore } from "../../../stores/notification.js";
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      notifications: [],
      useNoti: useNotiStore(),
      displayNotifications: false,
    };
  },
  async mounted() {
    const response = await this.useNoti.getNotification();
    this.notifications = response;

    console.log(this.notifications);
  },
  computed: {
    notificationCount() {
      return this.notifications.length;
    },
  },
  methods: {
    async markAsRead(notificationId) {
      //   await axios.patch(`/api/notifications/${notificationId}`);
      //   this.notifications = this.notifications.filter(
      //     (notification) => notification._id !== notificationId
      //   );
      this.useNoti.readNotification(notificationId);
    },
    showNotifications() {
      this.displayNotifications = !this.displayNotifications;
    },
  },
};
</script>

<style scoped>
.active {
  color: #1876f2;
}

.notification-icon {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  font-size: 20px;
}

.badge {
  position: absolute;
  top: 0;
  right: -10px;
  display: inline-block;
  min-width: 16px;
  padding: 2px 4px;
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #007bff;
  border-radius: 10px;
}
</style>
