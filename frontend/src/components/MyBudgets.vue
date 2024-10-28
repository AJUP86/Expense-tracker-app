<!-- src/components/MyBudgets.vue -->

<template>
  <div class="my-budgets p-4 border rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">My Budgets</h2>
    <div v-if="isLoading" class="text-gray-600">Loading budgets...</div>
    <div v-else>
      <ul class="space-y-2">
        <li
          v-for="budget in budgets"
          :key="budget.budget_id"
          class="flex justify-between items-center p-2 border rounded hover:bg-gray-100"
        >
          <div>
            <h3 class="text-lg font-medium">{{ budget.name }}</h3>
            <p class="text-sm text-gray-600">
              Duration: {{ formatDate(budget.start_date) }} - {{ formatDate(budget.end_date) }}
            </p>
          </div>
          <div>
            <button
              @click="selectBudget(budget.budget_id)"
              class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              View
            </button>
            <button
              @click="deleteBudget(budget.budget_id)"
              class="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              :disabled="isLoading"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
      <p v-if="budgets.length === 0" class="text-gray-600">No budgets found. Create one!</p>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBudgetStore } from '@/stores/useBudgetStore'
import { useRouter } from 'vue-router'

const budgetStore = useBudgetStore()
const router = useRouter()

const budgets = computed(() => budgetStore.budgets)
const isLoading = computed(() => budgetStore.isLoading)
const error = computed(() => budgetStore.error)

onMounted(() => {
  budgetStore.fetchBudgets()
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const selectBudget = async (budgetId) => {
  await budgetStore.fetchBudgetById(budgetId)
  router.push(`/dashboard/budgets/${budgetId}`)
}

const deleteBudget = async (budgetId) => {
  if (confirm('Are you sure you want to delete this budget?')) {
    try {
      await budgetStore.deleteBudget(budgetId)
      // Optionally, reset currentBudget if it's the one being deleted
      if (budgetStore.currentBudget?.budget_id === budgetId) {
        budgetStore.currentBudget = null
      }
    } catch (err) {
      // Error is already handled in the store
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
