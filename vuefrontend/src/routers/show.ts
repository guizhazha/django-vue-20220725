import { RouteRecordRaw } from "vue-router";

export const showRouter: Array<RouteRecordRaw> = [
  {
    path: '/show/JV',
    name: 'showJV',
    component: () => import('@/views/show/JV.vue'),
    meta: {
      title: 'components.dataJV'
    }
  },
  {
    path: '/show/XRD',
    name: 'showXRD',
    component: () => import('@/views/show/XRD.vue'),
    meta: {
      title: 'components.dataXRD'
    }
  },
  {
    path: '/show/IPCE',
    name: 'showIPCE',
    component: () => import('@/views/show/IPCE.vue'),
    meta: {
      title: 'components.dataIPCE'
    }
  },
  {
    path: '/show/PL',
    name: 'showPL',
    component: () => import('@/views/show/PL.vue'),
    meta: {
      title: 'components.dataPL'
    }
  },
  {
    path: '/show/ABS',
    name: 'showABS',
    component: () => import('@/views/show/ABS.vue'),
    meta: {
      title: 'components.dataABS'
    }
  }
]

export default showRouter