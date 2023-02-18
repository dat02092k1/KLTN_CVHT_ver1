import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import TheMain from '../components/layout/TheMain.vue'
import StudentDetails from '../views/student/StudentDetails.vue'
import StudentForm from '../views/student/StudentForm.vue'
import FormTest from '../views/student/FormTest.vue'
import ChartGpa from '../views/chart/ChartGpa.vue'
import Forum from '../views/base/Forum.vue'
import PostDetails from '../views/base/PostDetails.vue'
import Loading from '../views/base/Loading.vue'
import Test from '../views/base/Test.vue'
import AddPost from '../views/base/forum/AddPost.vue'
import UpdatePost from '../views/base/forum/UpdatePost.vue'
import EditComment from '../views/base/forum/EditComment.vue'

import Login from '../views/login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student/list',
      name: 'student',
      component: TheMain
    },
    {
      path: '/student/form',
      name: 'student form',
      component: StudentDetails
    },
    {
      path: '/student/details/:id',
      name: 'student details',
      component: StudentForm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/test/form',
      name: 'test form',
      component: FormTest
    },
    {
      path: '/student/chart',
      name: 'chart gpa',
      component: ChartGpa
    },
    {
      path: '/student/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/student/forum/post/:id',
      name: 'post details',
      component: PostDetails
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/student/forum/create',
      name: 'add post',
      component: AddPost
    },
    {
      path: '/student/forum/edit/:id',
      name: 'edit post',
      component: UpdatePost
    },
    {
      path: '/student/comment/edit/:postid/:id',
      name: 'edit comment',
      component: EditComment
    }
  ]
})

export default router
