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
              ref="userId"
              label="UserId"
              name="userId"
            >
              <a-input
                v-model:value="formState.userId"
                placeholder="Nhập tài khoản"
              />
            </a-form-item>

            <a-form-item
              ref="password"
              label="Password"
              name="password"
              class="form-item block"
            >
              <a-input
                v-model:value="formState.password"
                placeholder="Nhập mật khẩu"
              />
            </a-form-item>

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
                  message: 'Lớp không được để trống',
                  trigger: 'blur',
                }"
              >
                <a-input
                  v-model:value="domain.name"
                  placeholder="Nhập lớp"
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
                  Add field
                </a-button>
              </a-form-item>
            </a-form>

            <a-form-item label="Vai trò" name="role" class="form-item block">
              <a-select
                v-model:value="formState.role"
                placeholder="Chọn vai trò"
              >
                <a-select-option value="student">Sinh viên</a-select-option>
                <a-select-option value="consultant">Cố vấn</a-select-option>
              </a-select>
            </a-form-item>

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
                  placeholder="(+84)"
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

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <router-link class="" :to="{ path: '/student/list' }">
            <button class="bg-[#ef1419] text-[#ffffff] mx-2 my-2 p-1">
              Quay lại
            </button>
          </router-link>

          <a-button type="primary" @click="onSubmit" class="bg-[#324f90]"
            >Create</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm"
            >Reset</a-button
          >
        </a-form-item>
      </a-form>
    </div>

    <a-alert
      v-show="useStudent.showSuccessMsg === true"
      message="Thêm sinh viên thành công"
      type="success"
      show-icon
    />
    <a-alert
      v-show="useStudent.showErrorMsg === true"
      message="Thêm sinh viên thất bại"
      type="error"
      show-icon
    />
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useStudentStore } from "../../stores/student.js";
import NavTitle from "../base/NavBar/NavTitle.vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const pageTitle = ref("Thêm Sinh Viên");
    const formState = reactive({
      userId: "",
      password: "",
      name: "",
      gender: "",
      birthdate: undefined,
      emailAddress: "",
      phone: "",
      role: "",
      _class: "",
      address: "",
    });
    const rules = {
      userId: [
        {
          required: true,
          message: "Chưa nhập tài khoản",
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
        {
          validator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (!/[a-z]/.test(value) || !/\d/.test(value)) {
                reject(new Error("Mật khẩu cần chứa cả chữ cái và số"));
              } else {
                resolve();
              }
            });
          },
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
          min: 9,
          max: 9,
          message: "Chưa nhập đúng định dạng số điện thoại",
          trigger: "blur",
          required: true,
        },
      ]
    };
    const useStudent = useStudentStore();

    const success = ref(false);
    const errorMsg = ref(false);
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState);
          formState._class = dynamicValidateForm.domains;
          console.log(formState._class);
          useStudent.addStudent(formState);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
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

    const removeDomain = (item) => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        name: "",
        key: Date.now(),
      });
      console.log(dynamicValidateForm.domains);
    };

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
      success,
      errorMsg,
      useStudent,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      removeDomain,
      addDomain,
    };
  },
  components: { NavTitle, MinusCircleOutlined, PlusOutlined },
});
</script>

<style scoped>
.add-form {
  height: 400px;
  overflow-y: scroll;
}

.form-item :deep .ant-col-14 {
  max-width: 100%;
}

.form-item :deep .ant-col-4 {
  max-width: 100%;
}
</style>
