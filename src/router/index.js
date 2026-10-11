import { createRouter, createWebHashHistory } from 'vue-router'
import Orders from '../views/Orders.vue'

const toOrder = (to) => ({
  path: '/order/check',
  query: to.query,
  hash: to.hash,
})
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/order',
      component: Orders,
      redirect: toOrder,
      children: [
        {
          path: 'check',
          component: () => import('../components/Orderlist.vue'),
          meta: { step: 1, title: '確認訂單金額' },
        },
        {
          path: 'orderatm',
          component: () => import('../components/atm.vue'),
          meta: { step: 2, method: 'atm', title: 'ATM付款' },
        },
        {
          path: 'ordercard',
          component: () => import('../components/orderCard.vue'),
          meta: { step: 2, method: 'card', title: '信用卡付款' },
        },
        {
          path: 'orderconvenient',
          component: () => import('../components/orderConvenient.vue'),
          meta: { step: 2, method: 'con', title: '超商代碼付款' },
        },
        {
          path: 'paycomplete',
          component: () => import('../components/PayComplete.vue'),
          meta: { step: 3, title: '示範結果' },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: toOrder },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
router.afterEach((to) => {
  document.title = `${to.meta.title} · Payment`
})
export default router
