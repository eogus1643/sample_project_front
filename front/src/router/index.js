import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'emptyLayout',
    component: () => import('@/layouts/EmptyLayout.vue'),
    children: [
      {
        path: "/",
        name: "login",
        component: () => import('@/views/Login.vue')
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import('@/views/Signup.vue'), meta: {authRequired: true}
      }
    ]
  },
  {
    path: '/',
    name: 'defaultLayout',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: "/user/userList",
        name: "UserList",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      /* 
      {
        path: "/user/userInfoDetail",
        name: "userInfoDetail",
        component: () => import( '@/views/user/UserList.vue'),
        props: true, meta: {authRequired: true}
      },

      {
        path: "/user/UserInfoModify/:userId/:serialNumber",
        name: "UserInfoModify",
        component: () => import( '@/views/user/UserList.vue'),
        props: true, meta: {authRequired: true}
      },

      {
        path: "/equipment/equipmentList",
        name: "EquipmentList",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      {
        path: "/log/logList",
        name: "LogList",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      {
        path: "/log/logDetail/:logSeq",
        name: "LogDetail",
        component: () => import( '@/views/user/UserList.vue'),
        props: true, meta: {authRequired: true}
      },
      {
        path: "/push/pushList",
        name: "PushList",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      {
        path: "/push/PushAllSend",
        name: "PushAllSend",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      {
        path: "/push/PushIndividualSend",
        name: "PushIndividualSend",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      {
        path: "/statistics/statisticsList",
        name: "StatisticsList",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },
      {
        path: "/model/modelList",
        name: "ModelList",
        component: () => import( '@/views/user/UserList.vue'), meta: {authRequired: true}
      },

      {
        path: "/model/ModelWrite",
        name: "ModelWrite",
        component: () => import( '@/views/user/UserList.vue'),
        props: true, meta: {authRequired: true}
      },

      {
        path: "/model/ModelDetail/:productId",
        name: "ModelDetail",
        component: () => import( '@/views/user/UserList.vue'),
        props: true, meta: {authRequired: true}
      },
       */
     
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
