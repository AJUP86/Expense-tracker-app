import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/useAuthStore'
import DashboardView from '../views/DashboardView.vue'
import { pinia } from '../main'
import BudgetDetailsView from '@/views/BudgetDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    { path: '/dashboard/budgets/:budgetId', name: 'BudgetDetails', component: BudgetDetailsView }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(pinia)
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      await authStore.fetchProfile()
      if (!authStore.isAuthenticated) {
        return next({ name: 'Login' })
      }
    }
  }
  next()
})

export default router
