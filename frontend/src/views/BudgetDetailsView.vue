<template>
  <div v-if="budget" class="p-6 bg-beige shadow-lg">
    <h2 class="text-3xl font-display mb-6 text-black">{{ budget.name }} Details</h2>
    <div class="mb-6">
      <h3 class="text-2xl font-semibold text-darkGray">Categories</h3>
      <ul v-if="categories.length" class="mt-4 divide-y divide-lightGray">
        <li
          v-for="category in categories"
          :key="category.category_id || category.temp_id"
          class="py-2"
        >
          <p class="text-xl text-darkGray">
            {{ category.name || 'Unnamed Category' }} - ${{ category.allocated_amount || 0 }}
          </p>
        </li>
      </ul>
      <p v-else class="text-xl text-darkGray">No categories added yet.</p>
    </div>
    <CreateCategory @categoryAdded="handleCategoryAdded" />
  </div>
  <div v-else-if="isLoading" class="p-6 bg-beige shadow-lg">
    <p class="text-2xl text-darkGray">Loading budget details...</p>
  </div>
  <div v-else class="p-6 bg-beige shadow-lg">
    <p class="text-2xl text-darkGray">Failed to load budget details.</p>
    <p v-if="error" class="text-red text-xl">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBudgetStore } from '../stores/useBudgetStore'
import CreateCategory from '../components/CreateCategory.vue'

const route = useRoute()
const budgetStore = useBudgetStore()

const budget = computed(() => budgetStore.currentBudget)
const categories = computed(() => budget.value?.categories || [])
const isLoading = computed(() => budgetStore.isLoading)
const error = computed(() => budgetStore.error)

const handleCategoryAdded = (newCategory) => {
  budgetStore.addCategoryToCurrentBudget(newCategory)
}

onMounted(async () => {
  const budgetId = route.params.budgetId
  try {
    await budgetStore.fetchBudgetById(budgetId)
  } catch (err) {
    console.error('Error fetching budget in component:', err)
  }
})
</script>

<style scoped></style>
