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
              label="Tài khoản"
              name="studentId"
            >
              <a-input
                v-model:value="formState.studentId"
                placeholder="Nhập tài khoản"
                :disabled="userRole !== 'manager'"
                class="text-black"
              />
            </a-form-item>

            <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    v-if="userRole !== 'manager'"
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
        disabled
      />
       
    </a-form-item>
     
    
  </a-form>

            <a-form-item
              ref="emailAddress"
              label="Email"
              name="emailAddress"
              class="form-item block"
            >
              <a-input
                v-model:value="formState.emailAddress"
                placeholder="Nhập email"
                :disabled="userRole !== 'manager'"
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
          </div>

          <div class="mx-auto">
            <div>
              <a-form-item
                ref="name"
                label="Họ tên"
                name="name"
                class="form-item block"
                :rules="[
                  {
                    required: true,
                    message: 'Chưa điền họ tên',
                  },
                ]"
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
          <a-button type="primary" @click="onSubmit" class="bg-[#324f90]"
            >Lưu</a-button
          >
          
        </a-form-item>
      </a-form>
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
import { RouterLink, RouterView, useRoute } from "vue-router";
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";
import NavTitle from "../base/NavBar/NavTitle.vue";
import ChartCredits from "../chart/ChartCredits.vue";
import { getRole } from "../../utils/getInfoUser.js";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const pageTitle = ref("Cập nhật thông tin Sinh viên");
    const formState = reactive({
      studentId: "",
      name: "",
      gender: "",
      birthdate: undefined,
      emailAddress: "",
      phone: "",
      role: "",
      _class: "",
      address: "",
    });

    const userRole = getRole();
    const rules = {
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
    const useStudent = useStudentStore();
    const userId = useRoute().params.id;
     

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          console.log("values", formState);
          formState._class = dynamicValidateForm.domains;
          const res = await useStudent.updateStudent(userId, formState);

          if (res.status === 200) {
          setTimeout(() => {
          message.success({
          content: 'Cập nhật thành công!',
          duration: 2,
          });
          }, 1000);
          }
          else {
            setTimeout(() => {
          message.error({
          content: 'Cập nhật thất bại!',
          duration: 2,
          });
          }, 1000);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    // const formattedDob = computed(() => {
    //     return format(formState.birthdate, 'yyyy-MM-dd');
    // })

    onMounted(async () => {
      const response = await useStudent.getStudentDetails(userId);
      formState.studentId = response.userId; 
      formState.name = response.name;
      formState.gender = response.gender;
      formState.role = response.role;
      formState.emailAddress = response.emailAddress;
      formState.phone = response.phone;
      const classData = response._class.map((c) => ({ name: c.name, key: c._id }));
      dynamicValidateForm.domains.push(...classData);
       console.log(classData);
      formState.address = response.address;
      formState.birthdate = dayjs(response.birthdate);
    });

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
      pageTitle,
      userRole,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
    };
  },
  components: { NavTitle, ChartCredits, MinusCircleOutlined, PlusOutlined },
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
  max-width: 100% !important;
}
</style>
