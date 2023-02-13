import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import TheMain from '../components/layout/TheMain.vue'
import StudentDetails from '../views/student/StudentDetails.vue'
import StudentForm from '../views/student/StudentForm.vue'
import FormTest from '../views/student/FormTest.vue'
import ChartGpa from '../views/chart/ChartGpa.vue'

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
    }
  ]
})

export default router
