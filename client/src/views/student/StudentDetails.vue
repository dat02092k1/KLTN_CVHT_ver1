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
                disabled
                class="text-black"
              />
            </a-form-item>

            <a-form-item
              ref="_class"
              label="Lớp"
              name="_class"
              class="form-item block"
              v-show="userRole !== 'manager'"
            >
              <a-input
                v-model:value="formState._class"
                placeholder="Nhập lớp"
                disabled
              />
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
                disabled
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
    const studentId = useRoute().params.id;
     

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState);
          useStudent.updateStudent(studentId, formState);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    // const formattedDob = computed(() => {
    //     return format(formState.birthdate, 'yyyy-MM-dd');
    // })

    onMounted(async () => {
      const response = await useStudent.getStudentDetails(studentId);
      formState.studentId = response.userId; 
      formState.name = response.name;
      formState.gender = response.gender;
      formState.role = response.role;
      formState.emailAddress = response.emailAddress;
      formState.phone = response.phone;
      console.log(response._class.map(item => item.name).join(', '));
      formState._class = response._class.map(item => item.name).join(', ');
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
      pageTitle,
      userRole
    };
  },
  components: { NavTitle, ChartCredits },
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
