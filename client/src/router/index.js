import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import TheMain from '../components/layout/TheMain.vue'
import StudentDetails from '../views/student/StudentDetails.vue'
import Login from '../views/login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
