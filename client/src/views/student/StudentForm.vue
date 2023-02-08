<template>
    <div class="form-warpper pt-0 px-7 pb-7 flex-column">
      <div class="nav-content bg-[#324f90] p-[1.5rem]">
          <div class="nav-title text-[#fbfbff] font-bold text-[15px]">
            <div>THÔNG TIN CHI TIẾT</div>
          </div>
        </div>
  
     <div class="form-content">
      <form class="bg-[#ffffff]">
      <div class="form-column mx-3">
        <div class="form-group">
          <label>ID</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Ngày sinh</label>
          <input type="text" />
        </div>
  
        <div class="form-group">
          <label>Giới tính</label>
          <input type="text" />
        </div>
        <!-- Thêm các ô nhập liệu khác -->
      </div>
      <div class="form-column">
        <div class="form-group">
          <label> Họ và Tên</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Số điện thoại</label>
          <input type="text" />
        </div>
  
        <div class="form-group">
          <label>Địa chỉ</label>
          <input type="text" />
        </div>
        <!-- Thêm các ô nhập liệu khác -->
      </div>
      <div class="form-column">
        <div class="form-group">
          <label>Lớp</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Tổng tín chỉ tích lũy</label>
          <input type="text" />
        </div>
  
        <div class="form-group">
          <label>Điểm trung bình tích lũy hệ 4</label>
          <input type="text" />
        </div>
      </div>
    </form>
     </div>
  
     <div class="button--act flex my-2">
      <RouterLink to="/student/list" class="bg-[#324f90] text-[#fff] p-3 rounded mx-2">
        Quay lại
      </RouterLink>
        <RouterView />
  
        <button class="bg-[#324f90] text-[#fff] p-3 px-4 rounded mx-2">Lưu</button>
     </div>
    </div>
    
  </template>
  
  <script>
  import { RouterLink, RouterView } from 'vue-router'
  
  </script>
  <style scoped>
    form {
      display: flex;
    }
  
    .form-column {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  
    .form-group {
      margin-bottom: 20px;
    }
  
    label {
      display: block;
      margin-bottom: 10px;
    }
  
    input[type="text"] {
      width: 70%;
      height: 40px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  
    input:hover {
      border: 1px solid #324f90;
    }
  
    input:focus {
      border: 1px solid #324f90;
      outline: none;
    }
  </style>
  