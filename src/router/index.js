import { createRouter, createWebHistory } from '@ionic/vue-router';
import Login from "@/components/Login";
import InitialPage from "@/components/InitialPage";
import Dashboard from "@/components/Dashboard";

const routes = [
  {
    path: '/',
    component: InitialPage
  },
  {
    path: '/login/',
    component: Login
  }
,
  {
    path: '/dashboard/',
    component: Dashboard
  }




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
