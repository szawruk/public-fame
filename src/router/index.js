import { createRouter, createWebHistory } from '@ionic/vue-router';
import Login from "@/components/Login";
import InitialPage from "@/components/InitialPage";
import Dashboard from "@/components/Dashboard";
import Signup from "@/components/Signup";
import Comments from "@/components/Comments";

const routes = [
  {
    path: '/login/',
    component: Login,
    name: 'login'
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard'
  },
  {
    path: '/signup/',
    component: Signup,
    name: 'signup'
  },
  {
    path: '/post/:id',
    component: Comments,
    name: 'comments'
  },
  {
    path: '/',
    component: InitialPage,
    name: 'init'
  },




  // {
  //   path: '/tabs/',
  //   component: Tabs,
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/tabs/tab1'
  //     },
  //     {
  //       path: 'tab1',
  //       component: () => import('@/views/Tab1.vue')
  //     },
  //     {
  //       path: 'tab2',
  //       component: () => import('@/views/Tab2.vue')
  //     },
  //     {
  //       path: 'tab3',
  //       component: () => import('@/views/Tab3.vue')
  //     }
  //   ]
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
