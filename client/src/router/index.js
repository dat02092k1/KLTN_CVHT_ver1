import { createRouter, createWebHistory } from "vue-router";
import { getRole } from "../utils/getInfoUser.js";

import TheMain from "../components/layout/TheMain.vue";
import Homepage from "../views/homepage/Homepage.vue";
import ErrorPage from "../views/base/error/ErrorPage.vue";
import StudentDetails from "../views/student/StudentDetails.vue";
import StudentAdd from "../views/student/StudentAdd.vue";
import StudentEdit from "../views/student/StudentEdit.vue";
import StudentStatus from "../views/student/StudentStatus.vue";
import ImportExcel from "../views/student/ImportExcel.vue";
import ChangePassword from "../views/student/ChangePassword.vue";
import ForgetPassword from "../views/login/ForgetPassword.vue";
import ResetPassword from "../views/login/ResetPassword.vue";
import ChartGpa from "../views/chart/ChartGpa.vue";
import ChartCredits from "../views/chart/ChartCredits.vue";
import PostList from "../views/base/forum/PostList.vue";
import PostDetails from "../views/base/forum/PostDetails.vue";
import Loading from "../views/base/Spinner/Loading.vue";
import Test from "../views/base/Test.vue";
import AddPost from "../views/base/forum/AddPost.vue";
import UpdatePost from "../views/base/forum/UpdatePost.vue";
import EditComment from "../views/base/forum/EditComment.vue";
import Chat from "../views/base/chat/Chat.vue";
import Conversation from "../views/base/chat/Conversation.vue";
import Login from "../views/login/Login.vue";
import Course from "../views/base/Score/Course.vue";
import CourseDetails from "../views/base/Score/CourseDetails.vue";
import CourseAdd from "../views/base/Score/CourseAdd.vue";
import CourseEdit from "../views/base/Score/CourseEdit.vue";
import TaskList from "../views/base/task/TaskList.vue";
import TaskStudent from "../views/base/task/TaskStudent.vue";
import TaskEdit from "../views/base/task/TaskEdit.vue";
import UpdateStatus from "../views/base/task/UpdateStatus.vue";
import Notification from "../views/base/Notification/Notification.vue";
import AnnouncementList from "../views/base/Announcement/AnnouncementList.vue";
import AnnouncementEdit from "../views/base/Announcement/AnnouncementEdit.vue";
import FormFill from "../views/base/one gate/FormFill.vue";
import FormTraining from "../views/base/one gate/FormTraining.vue";
import FormStudy from "../views/base/one gate/FormStudy.vue";
import FormMeeting from "../views/base/one gate/FormMeeting.vue";
import FormList from "../views/base/one gate/FormList.vue";
import Update from "../views/base/one gate/Update.vue";
import FormSubmited from "../views/base/one gate/FormSubmited.vue";
import ReportList from "../views/base/report/ReportList.vue";
import ReportAdd from "../views/base/report/ReportAdd.vue";
import ReportEdit from "../views/base/report/ReportEdit.vue";
import Report from "../views/base/report/Report.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/list",
      name: "student",
      component: TheMain,
      meta: { requiresAuth: true, requiresManager: true },
    },
    {
      path: "/student/details/:id",
      name: "student details",
      component: StudentDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/import-excel",
      name: "students import",
      component: ImportExcel,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/status",
      name: "students status list",
      component: StudentStatus,
      meta: { requiresAuth: true, requiresManager: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { hideSidebar: true, hideHeader: true },
    },
    {
      path: "/student/chart",
      name: "chart gpa",
      component: ChartGpa,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/chart-credits",
      name: "chart credits",
      component: ChartCredits,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/forum/posts",
      name: "list posts",
      component: PostList,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/forum/post/:id",
      name: "post details",
      component: PostDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/account/password/:id",
      name: "password",
      component: ChangePassword,
      meta: { requiresAuth: true },
    },
    {
      path: "/forget-password",
      name: "password forget",
      component: ForgetPassword,
      meta: { hideSidebar: true, hideHeader: true },
    },
    {
      path: "/reset-password/:id",
      name: "password reset",
      component: ResetPassword,
      meta: { hideSidebar: true, hideHeader: true },
    },
    {
      path: "/loading",
      name: "loading",
      component: Loading,
      meta: { requiresAuth: true },
    },
    {
      path: "/test",
      name: "test",
      component: Test,
    },
    {
      path: "/student/forum/create",
      name: "add post",
      component: AddPost,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/forum/edit/:id",
      name: "edit post",
      component: UpdatePost,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/comment/edit/:postid/:id",
      name: "edit comment",
      component: EditComment,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/chat",
      name: "chat",
      component: Chat,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/conversation",
      name: "Conversation",
      component: Conversation,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/course",
      name: "course",
      component: Course,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/course/:id",
      name: "course details",
      component: CourseDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/course/add/:id",
      name: "course add",
      component: CourseAdd,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/course/edit/:id",
      name: "course edit",
      component: CourseEdit,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/add",
      name: "student add",
      component: StudentAdd,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/edit/:id",
      name: "student edit",
      component: StudentEdit,
      meta: { requiresAuth: true },
    },
    {
      path: "/consultant/task",
      name: "assign task",
      component: TaskList,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/task/",
      name: "list tasks",
      component: TaskStudent,
      meta: { requiresAuth: true },
    },
    {
      path: "/consultant/task/edit/:id",
      name: "edit task",
      component: TaskEdit,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/task/update/:taskId/:id",
      name: "update task status",
      component: UpdateStatus,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/notification",
      name: "student notification",
      component: Notification,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/announcement",
      name: "student announcements",
      component: AnnouncementList,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/announcement/edit/:id",
      name: "edit announcement",
      component: AnnouncementEdit,
      meta: { requiresAuth: true,
              requiresManager: true },
    },
    {
      path: "/student/onegate",
      name: "student onegate",
      component: FormFill,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/onegate/training",
      name: "student onegate training",
      component: FormTraining,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/onegate/study",
      name: "student onegate study",
      component: FormStudy,
      meta: { requiresAuth: true },
    },
    {
      path: "/student/onegate/meeting",
      name: "student onegate meeting",
      component: FormMeeting,
      meta: { requiresAuth: true },
    },
    {
      path: "/consultant/onegate",
      name: "consultant onegate",
      component: FormList,
      meta: { requiresAuth: true,
              requiresManager: true },
    },
    {
      path: "/consultant/onegate/status/:id",
      name: "consultant onegate update",
      component: Update,
      meta: { requiresAuth: true,
              requiresManager: true },
    },
    {
      path: "/student/onegate/forms/:id",
      name: "student onegate forms",
      component: FormSubmited,
      meta: { requiresAuth: true },
    },
    {
      path: "/consultant/reports-list",
      name: "consultant list reports",
      component: ReportList,
      meta: { requiresAuth: true },
    },
    {
      path: "/consultant/progress",
      name: "consultant progress report",
      component: ReportAdd,
      meta: { requiresAuth: true },
    },
    {
      path: "/consultant/report/edit/:id",
      name: "edit report",
      component: ReportEdit,
      meta: { requiresAuth: true },
    },
    { 
      path: "/:pathMatch(.*)*", 
      component: ErrorPage,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = (getRole() !== null);
  const isConsultant = (getRole() === "manager");

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "login" });
    } else if (
      to.matched.some((route) => route.meta.requiresManager && !isConsultant)
    ) {
      if (from.path) {
        next(from.path);
      } else {
        next("student/form");
      }
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
