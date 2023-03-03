<template>
  <div>
    <div class="add-header">
      <NavTitle :title="pageTitle" />
    </div>
  <div class="add-form mx-10 ">

    <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    class="p-2 bg-[#fff]"
  >

  <div class="flex">
    <div class="mx-auto">
    <a-form-item class="form-item block" ref="studentId" label="Username" name="studentId" >
      
        <a-input  v-model:value="formState.studentId"  placeholder="Nhập tài khoản"/> 
      
    </a-form-item>

    <a-form-item ref="password" label="Password" name="password" class="form-item block">
      <a-input v-model:value="formState.password"  placeholder="Nhập mật khẩu"/>
    </a-form-item>

    <a-form-item ref="_class" label="Lớp" name="_class" class="form-item block">
      <a-input v-model:value="formState._class" placeholder="Nhập lớp"/>
    </a-form-item>

    <a-form-item label="Vai trò" name="role" class="form-item block">
      <a-select v-model:value="formState.role" placeholder="Chọn vai trò">
        <a-select-option value="student">Sinh viên</a-select-option>
        <a-select-option value="manager">Cố vấn</a-select-option>
      </a-select>
    </a-form-item>

 
    <a-form-item ref="email" label="Email" name="email" class="form-item block">
      <a-input v-model:value="formState.email" placeholder="Nhập email"/>
    </a-form-item>

    
   </div>

   <div class="mx-auto">
    <div>
    <a-form-item ref="name" label="Họ tên" name="name" class="form-item block">
      <a-input v-model:value="formState.name"  placeholder="Nhập họ tên"/>
    </a-form-item>

    <a-form-item ref="phone" label="Số điện thoại" name="phone" class="form-item block">
      <a-input v-model:value="formState.phone"  placeholder="Nhập số điện thoại"/>
    </a-form-item>

    <a-form-item label="Ngày sinh" required name="birthdate" class="form-item block">
      <a-date-picker
        v-model:value="formState.birthdate"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </a-form-item>

    <a-form-item label="Giới tính" name="gender" class="form-item block">
      <a-radio-group v-model:value="formState.gender" class="flex">
        <a-radio value="Nam">Nam</a-radio>
        <a-radio value="Nữ">Nữ</a-radio>
      </a-radio-group>
    </a-form-item>

 
    <a-form-item ref="address" label="Địa chỉ" name="address" class="form-item block">
      <a-input v-model:value="formState.address" placeholder="Nhập địa chỉ"/>
    </a-form-item>

    
   </div>
   </div>
  </div>
   

   <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" class="bg-[#324f90]">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
  </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from 'vue';
import { useStudentStore } from '../../stores/student.js';
import NavTitle from '../base/NavTitle.vue';

export default defineComponent({
  setup() {
    const formRef = ref();
    const pageTitle = ref("Thêm Sinh Viên");
    const formState = reactive({
      studentId: '',
      password: '',
      name: '',
      gender: '',
      birthdate: undefined, 
      email: '',  
      phone: '', 
      role: "",
      _class: "",
      address: '',
    });
    const rules = {
      studentId: [
        {
          required: true,
          message: 'Chưa nhập studentId',
          trigger: 'blur',
        }
      ],
      password: [
        {
          required: true,
          message: 'Chưa nhập mật khẩu',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 15,
          message: 'Mật khẩu cần có độ dài từ 6 đến 15 kí tự',
          trigger: 'blur',
        }
      ],
      name: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        }
      ],
      _class: [
        {
          required: true,
          message: 'Chưa nhập lớp',
          trigger: 'blur',
        }
      ],
      email: [
        {
          required: true,
          message: 'Please input Email',
          trigger: 'blur',
        },
        {
          type: 'email',
        message: 'The input is not valid E-mail!',
        required: true,
        trigger: 'blur',
        }
      ],
      role: [
        {
          required: true,
          message: 'Chưa chọn vai trò',
          trigger: 'change',
        },
      ],
      birthdate: [
        {
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
          type: 'object',
        },
      ],
      address: [
        {
          required: true,
          message: 'Chưa nhập địa chỉ',
          trigger: 'change',
        },
      ],
      gender: [
        {
          required: true,
          message: 'Please select gender',
          trigger: 'change',
        },
      ],
      phone: [
        {
          required: true,
          message: 'Chưa nhập số điện thoại',
          trigger: 'blur',
        },
        {
          min: 10,
          max: 10,
          message: 'Chưa nhập đúng định dạng số điện thoại',
          trigger: 'blur',
          required: true,    
          }
      ],
    };
    const useStudent = useStudentStore(); 

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState);
          useStudent.addStudent(formState);
        })
        .catch(error => {
          console.log('error', error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
      pageTitle
    };
  },
  components: { NavTitle }
});
</script>

<style scoped>
.add-form {
  height: 400px;
  overflow-y: scroll;
}

.form-item ::v-deep .ant-col-14 {
  max-width: 100%;
}

.form-item ::v-deep .ant-col-4 {
  max-width: 100% !important;
}
</style>