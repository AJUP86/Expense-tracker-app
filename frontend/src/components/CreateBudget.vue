<template>
  <div class="p-6 border-4 border-beige bg-beige shadow-lg">
    <h2 class="text-3xl font-display mb-6 text-black">Create New Budget</h2>
    <form @submit.prevent="submitBudget">
      <div class="mb-4">
        <label for="name" class="block text-2xl font-semibold text-darkGray">Budget Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Enter budget name"
        />
      </div>
      <div class="mb-4">
        <label for="start_date" class="block text-2xl font-semibold text-darkGray"
          >Start Date</label
        >
        <input
          v-model="startDate"
          type="date"
          id="start_date"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>
      <div class="mb-6">
        <label for="end_date" class="block text-2xl font-semibold text-darkGray">End Date</label>
        <input
          v-model="endDate"
          type="date"
          id="end_date"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>
      <button
        type="submit"
        class="w-full px-6 py-3 bg-blue text-2xl font-semibold text-white rounded-lg hover:bg-red focus:outline-none transition-colors duration-300"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Creating...' : 'Create Budget' }}
      </button>
      <p v-if="error" class="text-red text-xl mt-4">{{ error }}</p>
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
      userId: budgetStore.currentBudget?.userId || 1
    })

    name.value = ''
    startDate.value = ''
    endDate.value = ''
  } catch (err) {}
}
</script>

<style scoped></style>
