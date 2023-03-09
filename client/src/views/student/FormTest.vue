<template>
  <div>
    <div class="header-forum">
      <div class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded">
        <div class="flex justify-end">
          <a-button
            class="bg-[#324f90] rounded"
            type="primary"
            @click="visible = true"
            >Thêm task</a-button
          >

          <a-modal
            v-model:visible="visible"
            title="Thêm task"
            ok-text="Create"
            cancel-text="Cancel"
            @ok="onOk"
          >
            <a-form
              ref="formRef"
              :model="formState"
              layout="vertical"
              name="form_in_modal"
            >
              <a-form-item
                name="title"
                label="Title"
                :rules="[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]"
              >
                <a-input v-model:value="formState.title" />
              </a-form-item>

              <a-form-item
                name="task"
                label="Task"
                :rules="[
                  {
                    required: true,
                    message: 'Please input the task of collection!',
                  },
                ]"
              >
                <a-textarea v-model:value="formState.task" />
              </a-form-item>

              <a-form-item
                name="complete"
                label="isComplete"
                class="flex"
              >
              <a-checkbox v-model:checked="checked"></a-checkbox>
              </a-form-item>
               

               
              <a-form-item
                name="assignedStudents"
                label="Select"
                :rules="[
                  {
                    required: true,
                    message: 'Please select Activity zone',
                    trigger: 'change',
                  },
                ]"
              >
                <a-select
                  v-model:value="formState.assignedStudents"
                  mode="tags"
                  style="width: 100%"
                  placeholder="Tags Mode"
                  :options="options"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRaw, computed  } from "vue";
import { useStudentStore } from "../../stores/student";

import { RouterLink, RouterView } from "vue-router";
import { getUsername, getClass } from "../../utils/getInfoUser";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);

    const formState = reactive({
      title: "",
      task: "",
      complete: null,
      assignedStudents: [],   
      username: getUsername(),   
      _class: getClass(),
    });

    const useStudent = useStudentStore(); 

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          formState.complete = checked.value;
          console.log("formState: ", toRaw(formState));
          const task = toRaw(formState);
          console.log(formState);
          checked.value = false;
          visible.value = false;
          formRef.value.resetFields();
           
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    const handleChange = (value) => {
      formState.assignedStudents = value
      console.log(formState.assignedStudents);  
      
    };

     const checked = ref(false);

    

    const students = ref([]);
    onMounted(async () => {
      students.value = await useStudent.getData();
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
      visible,
      onOk,
      students,
      value: ref([]),
      handleChange,
      options,
      checked
      //   value: (i + 10).toString(36) + (i + 1),
      // })),
      // options: [...Array(25)].map((_, i) => ({
      //   value: (i + 10).toString(36) + (i + 1),
      // })),
    };
  },
});
</script>

<style scoped>
::v-deep .ant-switch-checked ant-switch {
   background-color: #1890ff;
}
</style>
