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

              <a-form-item name="duration" label="Hạn nộp">
      <a-date-picker
        v-model:value="formState.duration"
        show-time
        type="date"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
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
                      <router-link
                        :to="{ path: '/consultant/task/edit/' + task._id }"
                        >Edit</router-link
                      >
                    </a-menu-item>
                    <a-menu-item key="1">
                      <div @click="deleteTask(task._id)">Delete</div>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
            <div class="text-xs flex justify-end">
              {{ formatDate(task.createdAt) }}
            </div>
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
            <div v-if="task.duration" class="text-xs flex justify-end">
              Hạn nộp: {{ format(task.duration) }}
            </div>
          </a-card>
        </div>

        <div class="flex flex-col">
          <div class="flex gap-1">
            <button @click="prevPage" :disabled="currentPage === 1">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <span> Trang: {{ currentPage }} / {{ totalPages }} </span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <ul class="flex gap-1">
            <li
              v-for="page in pages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Loading v-show="isShowSpinner" />
</template>

<script>
import NavTitle from "../NavBar/NavTitle.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import Loading from "../Spinner/Loading.vue";

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
    const pageTitle = "Danh sách nhiệm vụ";
    const formState = reactive({
      task: "",
      description: "",
      duration: undefined,
      complete: null,
      assignedStudents: [],
      createdBy: getId()    
      // _class: getClass(),
    });

    const useStudent = useStudentStore();
    const useTask = useTaskStore();
    const isComplete = ref();

    const isShowSpinner = ref(true);

    const currentPage = ref(1);
    const totalTasks = ref(0);

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          formState.complete = checked.value;

          formState.assignedStudents = assignedStudents.value;
          console.log("formState: ", toRaw(formState));
          const task = toRaw(formState);
          console.log(task);
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
      formState.assignedStudents = value;

      assignedStudents.value = formState.assignedStudents.map((studentId) => ({
        student: studentId,
      }));
    };

    const checked = ref(false);

    const students = ref([]);
    const tasks = ref([]);
    const totalPages = ref([]);
    const studentsId = ref([]);

    onMounted(async () => {
      students.value = await useStudent.getData();
      studentsId.value = students.value.map(({ studentId, _id }) => ({
        studentId,
        _id,
      }));
      console.log(studentsId.value);

      tasks.value = await useTask.getTasksPerPage(currentPage.value);
      totalPages.value = tasks.value.total;
      isShowSpinner.value = false;
      console.log(tasks.value);
    });

    async function deleteTask(id) {
      await useTask.deleteTask(id);
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }

    function format(dateString) {
      const date = new Date(dateString);
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const year = date.getFullYear();
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");

return `${day}/${month}/${year} ${hours}:${minutes}`;
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

    const prevPage = () => {
      currentPage.value -= 1;
      useTask.getTasksPerPage(currentPage.value);
    };

    const nextPage = () => {
      currentPage.value += 1;
      useTask.getTasksPerPage(currentPage.value);
    };

    const goToPage = (page) => {
      currentPage.value = page;
      useTask.getTasksPerPage(currentPage.value);
    };

    const pages = computed(() => {
      const pages = [];
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
      return pages;
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
      deleteTask,
      isShowSpinner,
      formatDate,
      format,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      goToPage,
      pages,
    };
  },
  components: {
    NavTitle,
    DownOutlined,
    Loading,
  },
});
</script>

<style scoped>
:deep(.ant-switch-checked ant-switch) {
  background-color: #1890ff;
}

.active {
  font-weight: bold;
}
</style>
