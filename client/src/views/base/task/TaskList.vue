<template>
  <div>
    <NavTitle :title="pageTitle" />

    <div class="header-forum">
      <div
        class="forum-list bg-[#fff] p-[1.5rem] mx-6 rounded h-[450px] overflow-y-scroll"
      >
        <div class="flex justify-end">
          <a-button
            class="bg-[#324f90] rounded"
            type="primary"
            @click="visible = true"
            >Thêm Task</a-button
          >

          <a-modal
            v-model:visible="visible"
            title="Thêm Task"
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
            </a-form>
          </a-modal>
        </div>

        <div v-for="(task, index) in useTask.tasks" :key="index" class="my-6">
          <a-card :title="task.task" style="width: 400px">
            <template #extra>
            <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      More
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <router-link :to="{ path: '/consultant/task/edit/' + task._id }" >Edit</router-link> 
        </a-menu-item>
        <a-menu-item key="1">
          <div @click="deleteTask(task._id)">Delete</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
             </template>
            <!-- <p> Description: " {{ task.description }} "</p> -->
            <div
              class="flex justify-between"
              v-for="(item, index) in task.assignedStudents"
              :key="index"
            >
              <p>{{ item.studentId }}</p>
              <input
                type="radio"
                disabled
                v-bind:value="item.isCompleted"
                v-bind:checked="item.isCompleted"
              />
            </div>
          </a-card>
        </div>
      </div>

      <!-- <div>
        <section class="tasks-container">
          <p class="loading-text">njdnm</p>
          <div class="tasks"></div>
        </section>
      </div> -->
    </div>
  </div>
</template>

<script>
import NavTitle from"../NavBar/NavTitle.vue"
import { DownOutlined } from '@ant-design/icons-vue';

import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  computed,
} from "vue";
import { useStudentStore } from "../../../stores/student.js";
import { useTaskStore } from "../../../stores/task.js";

import { RouterLink, RouterView } from "vue-router";
import { getUsername, getId } from "../../../utils/getInfoUser.js";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);
    const pageTitle = 'Danh sách việc giao cho sinh viên'; 
    const formState = reactive({
      task: "",
      description: "",
      complete: null,
      assignedStudents: [],
      createdBy: getId(),
      // _class: getClass(),
    });

    const useStudent = useStudentStore();
    const useTask = useTaskStore();
    const isComplete = ref();

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          formState.complete = checked.value;
           
          formState.assignedStudents = assignedStudents.value;
          console.log("formState: ", toRaw(formState));
          const task = toRaw(formState);
          useTask.assignTasks(task);
           
          checked.value = false;
          visible.value = false;
          formRef.value.resetFields();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    const assignedStudents = ref([]);
    const handleChange = (value) => {
      formState.assignedStudents = value
      
      assignedStudents.value = formState.assignedStudents.map(studentId => ({ student: studentId }));

      console.log(assignedStudents.value);
      
    };

    const checked = ref(false);

    const students = ref([]);
    const tasks = ref([]);
    const studentsId = ref([]);

    onMounted(async () => {
      students.value = await useStudent.getData();
      studentsId.value = students.value.map(({ studentId, _id }) => ({
        studentId,
        _id,
      }));
      console.log(studentsId.value);

      tasks.value = await useTask.getTasks();
      console.log(tasks.value);
    });

    async function deleteTask(id) {
      await useTask.deleteTask(id);
    }

    const options = computed(() => {
      if (students.value.length > 0) {
        console.log(
          students.value.map((student) => ({
            value: student._id,
            label: student.studentId,
          }))
        );
        return students.value.map((student) => ({
          value: student._id,
          label: student.studentId,
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
      checked,
      tasks,
      useTask,
      pageTitle,
      deleteTask
    };
  },
  components: {
    NavTitle, DownOutlined
  }
});
</script>

<style scoped>
::v-deep .ant-switch-checked ant-switch {
  background-color: #1890ff;
}
</style>
