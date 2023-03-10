<!-- <template>
  <div>
    <div class="header-forum">
      <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
        <div class="flex justify-center">
          <a-form
              ref="formRef"
              :model="formState"
              layout="vertical"
              name="form_in_modal"
            >
              <a-form-item
                name="task"
                label="Nhiệm vụ"
                :rules="[
                  {
                    required: true,
                    message: 'Chưa điền nhiệm vụ',
                  },
                ]"
              >
                <a-input v-model:value="formState.task" />
              </a-form-item>

              <a-form-item name="description" label="Mô tả">
                <a-textarea v-model:value="formState.description" />
              </a-form-item>

               <a-form-item name="complete" label="Hoàn thành" class="flex">
                <a-checkbox v-model:checked="checked"></a-checkbox>
              </a-form-item> 

              <a-form-item
                name="assignedStudents"
                label="Sinh viên"
                :rules="[
                  {
                    required: true,
                    message: 'Chưa chọn sinh viên',
                    trigger: 'change',
                  },
                ]"
              >
                <a-select
                  v-model:value="formState.assignedStudents"
                  mode="tags"
                  style="width: 100%"
                  placeholder="Chọn sinh viên"
                  :options="options"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="flex">
          <a-button type="primary" @click="onSubmit" class="bg-[#324f90]"
            >Lưu</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm"
            >Reset</a-button
          >
        </a-form-item>
            </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRaw, computed  } from "vue";
import { useStudentStore } from "../../stores/student";
import { useTaskStore } from "../../stores/task.js";

import { RouterLink, RouterView } from "vue-router";
import { getUsername, getId } from "../../utils/getInfoUser";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);

    const formState = reactive({
      task: "",
      description: "",
      complete: null,
      assignedStudents: [],
      createdBy: getId(),
    });

    const useStudent = useStudentStore(); 
    const useTask = useTaskStore(); 
     
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState);
           
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleChange = (value) => {
      formState.assignedStudents = value
      console.log(formState.assignedStudents);  
      
    };

     const checked = ref(false);

    

    const students = ref([]);
    const taskId = "6408b78722b12a097ace731a";   
    onMounted(async () => {
      students.value = await useStudent.getData();
      const response = await useTask.getTaskDetails(taskId); 
      console.log(response);
      formState.task = response.task;
      formState.description = response.description;

      const studentsAssign = response.assignedStudents.map(({ studentId }) => ({ studentId }));
       
      formState.assignedStudents = studentsAssign;
      console.log(formState.assignedStudents);
    });

    const options = computed(() => {
  if (students.value.length > 0) {
    return students.value.map((student) => ({
      value: student._id,
      label: student.studentId
    }));
  } else {
    return [];
  }
});

     
    return {
      formState,
      formRef,
      students,
      value: ref([]),
      handleChange,
      options,
      checked,
      onSubmit,
      resetForm,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      }
    };
  },
});
</script>

<style scoped>
::v-deep .ant-form-item-control-input-content {
   display: flex;
}
</style> 
 -->

 <template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >

  <a-form-item
                name="task"
                label="Nhiệm vụ"
                :rules="[
                  {
                    required: true,
                    message: 'Chưa điền nhiệm vụ',
                  },
                ]"
              >
                <a-input v-model:value="dynamicValidateForm.task" />
              </a-form-item>

              <a-form-item name="description" label="Mô tả">
                <a-textarea v-model:value="dynamicValidateForm.description" />
              </a-form-item>

               <a-form-item name="complete" label="Hoàn thành" class="flex">
                <a-checkbox v-model:checked="checked"></a-checkbox>
              </a-form-item> 

    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Domains' : ''"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change',
      }"
    >                                                 
      <a-input
        v-model:value="domain.value"
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
        Add field
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit" @click="submitForm">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useStudentStore } from "../../stores/student";
import { useTaskStore } from "../../stores/task.js";

import { RouterLink, RouterView } from "vue-router";
import { getUsername, getId } from "../../utils/getInfoUser";
export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup() {
    const formRef = ref();
    const useStudents = useStudentStore();
    const useTask = useTaskStore(); 
    const students = ref([]);
    const tasks = ref([]);
    const checked = ref(false);
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
      task: "",
      description: "",
      complete: null, 
      domains: [],
    });
       
    const submitForm = () => {
      formRef.value.validate().then(() => {
        console.log('values', dynamicValidateForm.domains);
      }).catch(error => {
        console.log('error', error);
      });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = item => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    };

    const taskId = "6408b78722b12a097ace731a";   
    onMounted(async () => {
      students.value = await useStudents.getData();
      const response = await useTask.getTaskDetails(taskId); 
       
      dynamicValidateForm.task = response.task;
      dynamicValidateForm.description = response.description;
      const studentsAssign = response.assignedStudents.map(({ studentId }) => ({ studentId }));
      dynamicValidateForm.domains = studentsAssign;     
      console.log(dynamicValidateForm.domains)
      // const studentsAssign = response.assignedStudents.map(({ studentId }) => ({ studentId }));
       
      // formState.assignedStudents = studentsAssign;
      // console.log(formState.assignedStudents);
    });
    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
      checked
    };
  },
});
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
