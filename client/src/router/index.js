import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from "@/components/WelcomePage.vue";
import OrderPage from "@/components/OrderPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/WelcomePage.vue')
    },
    {
      path: '/order',
      name: 'order-page',
      component: OrderPage
    }
  ]
})

export default router
