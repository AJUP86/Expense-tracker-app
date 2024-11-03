<template>
  <div class="main-container p-6">
    <h2 class="text-3xl font-display mb-6 text-black">My Budgets</h2>
    <div v-if="isLoading" class="text-2xl text-darkGray">Loading budgets...</div>
    <div v-else>
      <div v-if="budgets.length === 0" class="text-2xl font-semibold text-darkGray">
        No budget has been created yet
      </div>
      <div v-else class="shadow-wrapper">
        <div class="shadow-background"></div>
        <div class="content-box p-4 bg-beige border-black">
          <ul class="divide-y divide-lightGray">
            <li
              v-for="budget in budgets"
              :key="budget.budget_id"
              class="flex justify-between items-center py-4"
            >
              <div>
                <h3 class="text-2xl font-semibold text-darkGray">{{ budget.name }}</h3>
                <p class="text-xl text-darkGray">
                  Duration: {{ formatDate(budget.start_date) }} - {{ formatDate(budget.end_date) }}
                </p>
              </div>
              <div class="flex space-x-4">
                <button
                  @click="selectBudget(budget.budget_id)"
                  class="px-4 py-2 bg-blue text-2xl font-semibold text-white rounded-lg hover:bg-red focus:outline-none transition-colors duration-300"
                >
                  View
                </button>
                <button
                  @click="deleteBudget(budget.budget_id)"
                  class="px-4 py-2 bg-red text-2xl font-semibold text-white rounded-lg hover:bg-black focus:outline-none transition-colors duration-300"
                  :disabled="isLoading"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
.main-container {
  background-color: #f7f1eb;
  padding: 24px;
}

.shadow-wrapper {
  position: relative;
  display: inline-block;
}

.shadow-background {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100%;
  height: 100%;
  background-color: #f7f1eb;
  background-image: repeating-linear-gradient(
    120deg,
    #000000 0,
    #000000 0.5px,
    #00000005 1px,
    #00000005 4px
  );
  z-index: 1;
}

.content-box {
  position: relative;
  background-color: #f7f1eb;
  border: 1px solid #000000;
  z-index: 2;
}
</style>
