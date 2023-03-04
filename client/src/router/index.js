import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import TheMain from '../components/layout/TheMain.vue'
import StudentDetails from '../views/student/StudentDetails.vue'
import StudentForm from '../views/student/StudentForm.vue'
import StudentAdd from '../views/student/StudentAdd.vue'
import StudentEdit from '../views/student/StudentEdit.vue'
import FormTest from '../views/student/FormTest.vue'
import ChartGpa from '../views/chart/ChartGpa.vue'
import ChartCredits from '../views/chart/ChartCredits.vue'
import Forum from '../views/base/Forum.vue'
import PostList from '../views/base/forum/PostList.vue'
import PostDetails from '../views/base/PostDetails.vue'
import Loading from '../views/base/Loading.vue'
import Test from '../views/base/Test.vue'
import AddPost from '../views/base/forum/AddPost.vue'
import UpdatePost from '../views/base/forum/UpdatePost.vue'
import EditComment from '../views/base/forum/EditComment.vue'
import Chat from '../views/base/chat/Chat.vue'
import Conversation from '../views/base/chat/Conversation.vue'
import Login from '../views/login/Login.vue'
import Course from '../views/base/Score/Course.vue'
import CourseDetails from '../views/base/Score/CourseDetails.vue'
import CourseAdd from '../views/base/Score/CourseAdd.vue'
import CourseEdit from '../views/base/Score/CourseEdit.vue'

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
      path: '/student/chart-credits',
      name: 'chart credits',
      component: ChartCredits
    }, 
    {
      path: '/student/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/student/forum/posts',
      name: 'list posts',
      component: PostList
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
    },
    {
      path: '/student/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/student/conversation',
      name: 'Conversation',
      component: Conversation
    },
    {
      path: '/student/course',
      name: 'course',
      component: Course
    },
    {
      path: '/student/course/:id',
      name: 'course details',  
      component: CourseDetails
    },
    {
      path: '/student/course/add/:id',
      name: 'course add',  
      component: CourseAdd
    },
    {
      path: '/student/course/edit/:id',
      name: 'course edit',  
      component: CourseEdit
    },
    {
      path: '/student/add',
      name: 'student add',  
      component: StudentAdd
    },
    {
      path: '/student/edit/:id',
      name: 'student edit',  
      component: StudentEdit
    }
  ]
})

export default router
