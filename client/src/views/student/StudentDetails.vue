<template>
  <div class="form-warpper pt-0 px-7 pb-7 flex-column">
    <div class="nav-content bg-[#324f90] p-[1.5rem]">
      <div class="nav-title text-[#fbfbff] font-bold text-[15px]">
        <div>THÊM SINH VIÊN</div>
      </div>
    </div>

    <div class="form-content">
      <form class="bg-[#ffffff]">
        <div class="form-column mx-3">
          <div class="form-group">
            <label>ID</label>
            <input required type="text" v-model="this.useStudent.student.studentId"/>
            <!-- <p v-if="this.useStudent.error" class="error">{{ usernameError  }}</p> -->
          </div>
          <div class="form-group">
            <label>Ngày sinh</label>
            <input type="text" v-model="this.useStudent.student.birthdate"/>
          </div>

          <div class="form-group">
            <label>Giới tính</label>
            <select name="gender" id="gender" v-model="this.useStudent.student.gender">
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div class="form-group">
            <label>Học phí</label>
            <select name="gender" id="gender" v-model="this.useStudent.student.paidFee">
              <option value="true">Đã đóng</option>
              <option value="false">Chưa</option>
            </select>
          </div>
           
        </div>

        <div class="form-column mx-3">
          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="text" v-model="this.useStudent.student.password"/>
          </div>
          <div class="form-group">
            <label>Vai trò</label>
            <select name="gender" id="gender" v-model="this.useStudent.student.role">
              <option value="student">Sinh viên</option>
              <option value="manager">Cố vấn học tập</option>
            </select>
          </div>
           
        </div>
        <div class="form-column">
          <div class="form-group">
            <label> Họ và Tên</label>
            <input type="text" v-model="this.useStudent.student.name"/>
          </div>
          <div class="form-group">
            <label>Số điện thoại</label>
            <input type="text" v-model="this.useStudent.student.phone"/>
          </div>

          <div class="form-group">
            <label>Địa chỉ</label>
            <input type="text" v-model="this.useStudent.student.address"/>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="this.useStudent.student.emailAddress"/>
          </div>

        </div>
        <div class="form-column">
          <div class="form-group">
            <label>Lớp</label>
            <input type="text" v-model="this.useStudent.student._class"/>
          </div>
          <div class="form-group">
            <label>Tổng tín chỉ tích lũy</label>
            <input type="text" v-model="this.useStudent.student.total_creadits"/>
          </div>

          <div class="form-group">
            <label>Điểm trung bình tích lũy hệ 4</label>
            <input type="text" v-model="this.useStudent.student.gpa"/>
          </div>

          <div class="form-group">
            <label>Trạng Thái</label>
            <select name="gender" id="gender" v-model="this.useStudent.student.status">
              <option value="Không">Không</option>
              <option value="Cảnh báo học vụ">Cảnh báo học vụ</option>
              <option value="Thiếu tín chỉ">Thiếu tín chỉ</option>
              <option value="Thiếu học phí">Thiếu học phí</option>
              <option value="Khen thưởng">Khen thưởng</option>
            </select>
          </div>

          
        </div>

        
        

        
      </form>
    </div>

    <div class="button--act flex my-2">
      <RouterLink
        to="/student/list"
        class="bg-[#324f90] text-[#fff] p-3 rounded mx-2"
      >
        Quay lại
      </RouterLink>
      <RouterView />

      <button @click="saveData" class="bg-[#324f90] text-[#fff] p-3 px-4 rounded mx-2">
        Lưu
      </button>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useStudentStore } from "../../stores/student.js";

export default {
  data() {
    return {
      student: {
        studentId: '',
        name: '',
        phone: ''
      },
      useStudent: useStudentStore(),
      usernameError: 'Không được để trống',
      errors: [],
    }
  }, 
  methods: {
    saveData() {
      
      this.errors = [];
      var isValid = this.isValidData();  
      // validate data
      if (isValid) {
      this.useStudent.postData(); 
      }
      else {
        alert('error');
        console.log('error');   
      }
    }
    ,
    isValidData() { 
      try {
        if (!this.validateRequired(this.useStudent.student.studentId)) {
          this.errors.push("Mã sinh viên không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.password)) {
          this.errors.push("MK không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.name)) {
          this.errors.push("Tên không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.role)) {
          this.errors.push("Vai trò không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.birthdate)) {
          this.errors.push("Ngày sinh không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.address)) {
          this.errors.push("Địa chỉ không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.role)) {
          this.errors.push("Vai trò không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.birthdate)) {
          this.errors.push("Ngày sinh không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.address)) {
          this.errors.push("Địa chỉ không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.emailAddress)) {
          this.errors.push("Vai trò không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.phone)) {
          this.errors.push("Ngày sinh không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.gender)) {
          this.errors.push("Địa chỉ không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student.status)) {
          this.errors.push("Ngày sinh không được phép trống");
          console.log(this.errors);
        }

        if (!this.validateRequired(this.useStudent.student._class)) {
          this.errors.push("Địa chỉ không được phép trống");
          console.log(this.errors);
        }


        if (this.errors.length > 0) {
          alert('loi')
          return false;
        }
        return true;

      } catch (error) {
        console.log(error); 
      }
    },
    validateRequired(value) {
      try {
        if (value == "" || value == null || value == undefined) {
        return false;
      }
      return true;
      } catch (error) {
        console.log(error);
      }
    }, 
  }
}
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
  width: 50%;
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
