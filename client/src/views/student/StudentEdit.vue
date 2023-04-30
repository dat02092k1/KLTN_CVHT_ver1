<template>
  <div>
    <div class="add-header">
      <NavTitle :title="pageTitle" />
    </div>
    <div class="add-form mx-10">
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
            <a-form-item
              class="form-item block"
              ref="studentId"
              label="Username"
              name="studentId"
            >
              <a-input
                v-model:value="formState.studentId"
                placeholder="Nhập tài khoản"
              />
            </a-form-item>

            <!-- <a-form-item
              ref="_class"
              label="Lớp"
              name="_class"
              class="form-item block"
            >
              <a-input
                v-model:value="formState._class"
                placeholder="Nhập lớp"
              />
            </a-form-item> -->

            <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >
    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Lớp' : ''"
      :name="['domains', index, 'name']"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.name"
        placeholder="please input domain"
        style="width: 60%; margin-right: 8px"
      />
      <MinusCircleOutlined
        v-if="dynamicValidateForm.domains.length > 1"
        class="dynamic-delete-button"
        :disabled="dynamicValidateForm.domains.length === 1"
        @click="removeDomain(domain)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <PlusOutlined />
        Thêm lớp
      </a-button>
    </a-form-item>
    
  </a-form>

            <a-form-item label="Vai trò" name="role" class="form-item block">
              <a-select
                v-model:value="formState.role"
                placeholder="Chọn vai trò"
              >
                <a-select-option value="student">Sinh viên</a-select-option>
                <a-select-option value="manager">Cố vấn</a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <div class="mx-auto">
            <div>
              <a-form-item
                ref="name"
                label="Họ tên"
                name="name"
                class="form-item block"
              >
                <a-input
                  v-model:value="formState.name"
                  placeholder="Nhập họ tên"
                />
              </a-form-item>

              <a-form-item
                ref="phone"
                label="Số điện thoại"
                name="phone"
                class="form-item block"
              >
                <a-input
                  v-model:value="formState.phone"
                  placeholder="Nhập số điện thoại"
                />
              </a-form-item>

              <a-form-item
                label="Ngày sinh"
                required
                name="birthdate"
                class="form-item block"
              >
                <a-date-picker
                  v-model:value="formState.birthdate"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                  @change="(value) => (formState.birthdate = value)"
                />
              </a-form-item>
            </div>
          </div>

          <div class="mx-auto">
            <div>
              
              <a-form-item
              ref="emailAddress"
              label="Email"
              name="emailAddress"
              class="form-item block"
            >
              <a-input
                v-model:value="formState.emailAddress"
                placeholder="Nhập email"
              />
            </a-form-item>

              <a-form-item
                label="Giới tính"
                name="gender"
                class="form-item block"
              >
                <a-radio-group v-model:value="formState.gender" class="flex">
                  <a-radio value="Nam">Nam</a-radio>
                  <a-radio value="Nữ">Nữ</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item
                ref="address"
                label="Địa chỉ"
                name="address"
                class="form-item block"
              >
                <a-input
                  v-model:value="formState.address"
                  placeholder="Nhập địa chỉ"
                />
              </a-form-item>
            </div>
          </div>
        </div>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }" v-show="userRole === 'manager'">
          <router-link class="" :to="{ path: '/manager'}" >
      <button class="bg-[#ef1419]  text-[#ffffff] mx-2 my-2 p-1">Quay lại</button>
              </router-link>
          <a-button type="primary" @click="onSubmit" class="bg-[#324f90]"
            >Lưu</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm"
            >Reset</a-button
          >
        </a-form-item>
      </a-form>
    </div>

    <div class="w-[50%] mx-10 my-2">
      <a-alert
      v-show="useStudent.showSuccessMsg === true"
      message="Cập nhật thành công"
      type="success"
      show-icon
    />
    <a-alert
      v-show="useStudent.showErrorMsg === true"
      message="Cập nhật thất bại"
      type="error"
      show-icon
    />
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  computed,
} from "vue";
import { useStudentStore } from "../../stores/student.js";
import { getRole } from "../../utils/getInfoUser.js";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";
import NavTitle from "../base/NavBar/NavTitle.vue";
import ChartCredits from "../chart/ChartCredits.vue";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const formRef = ref();
    const pageTitle = ref("Cập nhật thông tin Sinh viên");
    const formState = reactive({
      studentId: "",
      password: "",
      name: "",
      gender: "",
      birthdate: undefined,
      emailAddress: "",
      phone: "",
      role: "",
      _class: "",
      class: "", 
      address: "",
    }); 

    const userRole = getRole();
    
    const rules = {
      studentId: [
        {
          required: true,
          message: "Chưa nhập studentId",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Chưa nhập mật khẩu",
          trigger: "blur",
        },
        {
          min: 6,
          max: 15,
          message: "Mật khẩu cần có độ dài từ 6 đến 15 kí tự",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
      _class: [
        {
          required: true,
          message: "Chưa nhập lớp",
          trigger: "blur",
        },
      ],
      emailAddress: [
        {
          required: true,
          message: "Please input Email",
          trigger: "blur",
        },
        {
          type: "email",
          message: "The input is not valid E-mail!",
          required: true,
          trigger: "blur",
        },
      ],
      role: [
        {
          required: true,
          message: "Chưa chọn vai trò",
          trigger: "change",
        },
      ],
      birthdate: [
        {
          required: true,
          message: "Please pick a date",
          trigger: "change",
          type: "object",
        },
      ],
      address: [
        {
          required: true,
          message: "Chưa nhập địa chỉ",
          trigger: "change",
        },
      ],
      gender: [
        {
          required: true,
          message: "Please select gender",
          trigger: "change",
        },
      ],
      phone: [
        {
          required: true,
          message: "Chưa nhập số điện thoại",
          trigger: "blur",
        },
        {
          min: 10,
          max: 10,
          message: "Chưa nhập đúng định dạng số điện thoại",
          trigger: "blur",
          required: true,
        },
      ],
    };

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };

    const dynamicValidateForm = reactive({
      domains: [],
    });

    const removeDomain = item => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        name: '',
        key: Date.now(),
      });
      console.log(dynamicValidateForm.domains);
    };

    const useStudent = useStudentStore();
    const studentId = useRoute().params.id;
     

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState);
          formState._class = dynamicValidateForm.domains;
          console.log(formState._class);
          useStudent.updateStudent(studentId, formState);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    // const formattedDob = computed(() => {
    //     return format(formState.birthdate, 'yyyy-MM-dd');
    // })

    onMounted(async () => {
      const response = await useStudent.getStudentDetails(studentId);
      formState.studentId = response.userId;
      formState.password = response.password;
      formState.name = response.name;
      formState.gender = response.gender;
      formState.role = response.role;
      formState.emailAddress = response.emailAddress;
      formState.phone = response.phone;
      const classData = response._class.map((c) => ({ name: c.name, key: c._id }));
      dynamicValidateForm.domains.push(...classData);
      console.log(dynamicValidateForm.domains);
      console.log(response._class);
      formState.address = response.address;
      formState.birthdate = dayjs(response.birthdate);
    });

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: "",
      formState,
      rules,
      onSubmit,
      resetForm,
      pageTitle,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      removeDomain,
      addDomain,
      userRole,
      useStudent
    };
  },
  components: { NavTitle, ChartCredits, MinusCircleOutlined, PlusOutlined },
});
</script>

<style scoped>
.add-form {
  height: 400px;
  overflow: auto;
}

.form-item :deep .ant-col-14 {
  max-width: 100%;
}

.form-item :deep .ant-col-4 {
  max-width: 100% !important;
}

:deep(.ant-col-sm-4) {
  flex: 0 0 28.666667%;
  max-width: 31%;
}
</style>
