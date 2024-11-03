<template>
  <div class="min-h-screen pattern-background">
    <!-- Navigation Bar -->
    <nav class="flex items-center justify-between p-6 border-b border-lightGray bg-beige">
      <div class="text-3xl font-display text-black">Expense Tracker</div>
      <button
        @click="logout"
        class="px-6 py-3 text-lg font-semibold text-black bg-white border-2 border-white rounded hover:bg-red focus:outline-none transition-colors duration-300"
      >
        Log Out
      </button>
    </nav>
    <!-- Main Content -->
    <main class="p-8">
      <h1 class="mb-6 text-5xl font-display text-black">Dashboard</h1>
      <p class="text-2xl text-darkGray">Welcome back, {{ userName }}.</p>

      <!-- Budget Components -->
      <section class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreateBudget />
        <MyBudgets />
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import CreateBudget from '../components/CreateBudget.vue'
import MyBudgets from '../components/MyBudgets.vue'

const authStore = useAuthStore()
const router = useRouter()

const userName = computed(() => authStore.user?.username || 'User')

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (err) {
    console.error('Logout failed:', err)
  }
}

onMounted(() => {
  if (!authStore.isAuthenticated && !authStore.isLoading) {
    router.push('/')
  }
})
</script>

<style scoped>
.pattern-background {
  @apply bg-customBlue;
  background-image: radial-gradient(#000000 0.5px, transparent 0.5px);
  background-size: 4px 4px;
}
</style>
