<template>
    <div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Tên:</label>
          <input type="text" id="name" v-model="form.name" :class="{ 'error': errors.name }" />
          <span v-if="errors.name">{{ errors.name }}</span>
        </div>
  
        <div class="form-group">
          <label for="phone">Số điện thoại:</label>
          <input type="text" id="phone" v-model="form.phone" :class="{ 'error': errors.phone }" />
          <span v-if="errors.phone">{{ errors.phone }}</span>
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" :class="{ 'error': errors.email }" />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
  
        <button type="submit">Gửi</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          phone: '',
          email: ''
        },
        errors: {
          name: '',
          phone: '',
          email: ''
        }
      }
    },
    methods: {
      submitForm() {
        this.errors = {}
        if (!this.form.name) {
          this.errors.name = 'Tên không được để trống'
        }
        if (!this.form.phone) {
          this.errors.phone = 'Số điện thoại không được để trống'
        }
        if (!this.form.email) {
          this.errors.email = 'Email không được để trống'
        }
        if (Object.keys(this.errors).length === 0) {
          // form data is valid, do something here (e.g. submit the form)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .error {
    border: 1px solid red;
  }
  </style>
  