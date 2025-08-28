import { createRouter, createWebHashHistory } from 'vue-router'
import { useSiteStore } from '@/stores/website'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: () => import('../views/SubscribeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    /*
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentView.vue'),
    },

    
    {
      path: '/',
      name: '',
      component: () => import('../views/'),
    },
    */

    /*
    {
      path: '/administrativo',
      name: 'administrativo',
      component: () => import('../views/AdministrativoView.vue'),
      meta: {
        requiresAuth: true
      },
    },
    */
  ],
  scrollBehavior(to, from, savedPosition){
    if(to.hash){
      return{
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return {
      top: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  const chronoStore = useSiteStore()
  if (to.meta.requiresAuth && !chronoStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router