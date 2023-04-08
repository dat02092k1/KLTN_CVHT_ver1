<template>
  <div>
    <button @click="openNoti(showNoti)">Open the notification box</button>
  </div>
</template>

<script>
import { SmileOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { defineComponent, h, ref, watch } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const showNoti = ref(false);

    const openNoti = (event) => {
      showNoti.value = !showNoti.value;
      console.log(showNoti.value);

      notification.open({
        message: 'Notification Title: ' + event,
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: () => h(SmileOutlined, {
          style: 'color: #108ee9',
        }),
      });
    };

    // Watch for changes in showNoti and display the notification if it becomes true
    watch(showNoti, (newValue, oldValue) => {
      if (newValue === true) {
        openNoti();
      }
    });

    // Call an API and set showNoti to true when the API returns a response
    const callAPI = async () => {
      // Call some API here
      const response = await axios.get('https://example.com/api');
      
      // Set showNoti to true if the API call was successful
      if (response.status === 200) {
        showNoti.value = true;
      }
    };

    return {
      showNoti,
      openNoti,
      callAPI
    };
  },
});
</script>
