<!-- src/components/CreateBudget.vue -->

<template>
  <div class="create-budget p-4 border rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Create New Budget</h2>
    <form @submit.prevent="submitBudget">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Budget Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="w-full px-3 py-2 border rounded"
          placeholder="Enter budget name"
        />
      </div>
      <div class="mb-4">
        <label for="start_date" class="block text-gray-700">Start Date</label>
        <input
          v-model="startDate"
          type="date"
          id="start_date"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div class="mb-4">
        <label for="end_date" class="block text-gray-700">End Date</label>
        <input
          v-model="endDate"
          type="date"
          id="end_date"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Creating...' : 'Create Budget' }}
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBudgetStore } from '@/stores/useBudgetStore'

const name = ref('')
const startDate = ref('')
const endDate = ref('')
const budgetStore = useBudgetStore()

const submitBudget = async () => {
  try {
    await budgetStore.createBudget({
      name: name.value,
      start_date: startDate.value,
      end_date: endDate.value,
      userId: budgetStore.currentBudget?.userId || 1 // Replace with actual user ID if needed
    })
    // Reset form fields
    name.value = ''
    startDate.value = ''
    endDate.value = ''
  } catch (err) {
    // Error is already handled in the store
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
