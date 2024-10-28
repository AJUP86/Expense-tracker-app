<!-- src/views/DashboardView.vue -->
<template>
  <div class="min-h-screen bg-white">
    <nav class="flex items-center justify-between p-6 border-b border-gray-300">
      <div class="text-2xl font-extrabold text-gray-900">Expense Tracker</div>
      <button
        @click="logout"
        class="px-4 py-2 text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors duration-300"
      >
        Log Out
      </button>
    </nav>

    <main class="p-8">
      <h1 class="mb-6 text-4xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-lg text-gray-700">Welcome back, {{ userName }}.</p>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreateBudget />
        <MyBudgets />
      </div>

      <!-- Placeholder for future dashboard content -->
      <div
        class="mt-12 border-2 border-dashed border-gray-400 h-64 flex items-center justify-center"
      >
        <span class="text-gray-500">Your dashboard content will appear here.</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userName = computed(() => authStore.user?.username || 'User')

const logout = async () => {
  await authStore.logout()
  router.push('/')
}

// Ensure the user is authenticated
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/')
  }
})
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
