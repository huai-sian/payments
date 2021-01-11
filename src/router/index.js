import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/order/check'
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Orders.vue'),
    redirect: '/order/check',
    children: [
      {
        path: 'check',
        name: 'Orderlist',
        component: () => import('../components/Orderlist.vue')
      },
      {
        path: 'orderconvenient',
        name: 'Orderconvenient',
        component: () => import('../components/orderConvenient.vue')
      },
      {
        path: 'orderatm',
        name: 'Orderatm',
        component: () => import('../components/atm.vue')
      },
      {
        path: 'paycomplete',
        name: 'PayComplete',
        component: () => import('../components/PayComplete.vue')
      },
      {
        path: 'ordercard',
        name: 'Ordercard',
        component: () => import('../components/orderCard.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
