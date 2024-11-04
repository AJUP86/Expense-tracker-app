<template>
  <div class="p-6 border-4 border-beige bg-beige shadow-lg">
    <h2 class="text-3xl font-display mb-6 text-black">Add Category</h2>
    <form @submit.prevent="submitCategory">
      <div class="mb-4">
        <label for="name" class="block text-2xl font-semibold text-darkGray">Category Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Enter category name"
        />
      </div>
      <div class="mb-6">
        <label for="allocated_amount" class="block text-2xl font-semibold text-darkGray">
          Allocated Amount
        </label>
        <input
          v-model.number="allocatedAmount"
          type="number"
          id="allocated_amount"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Enter allocated amount"
        />
      </div>
      <button
        type="submit"
        class="w-full px-6 py-3 bg-blue text-2xl font-semibold text-white rounded-lg hover:bg-red focus:outline-none transition-colors duration-300"
        :disabled="categoryStore.isLoading"
      >
        {{ categoryStore.isLoading ? 'Adding...' : 'Add Category' }}
      </button>
      <p v-if="categoryStore.error" class="text-red text-xl mt-4">{{ categoryStore.error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBudgetStore } from '@/stores/useBudgetStore'
import { useCategoryStore } from '@/stores/useCategoryStore'

const emit = defineEmits(['categoryAdded'])

const name = ref('')
const allocatedAmount = ref(0)

const categoryStore = useCategoryStore()
const budgetStore = useBudgetStore()
const submitCategory = async () => {
  try {
    const newCategory = await categoryStore.createCategory({
      name: name.value,
      allocated_amount: allocatedAmount.value,
      budgetId: budgetStore.currentBudget?.budget_id
    })
    emit('categoryAdded', newCategory)

    name.value = ''
    allocatedAmount.value = 0
  } catch (err) {
    console.error('Error in submitCategory:', err)
  }
}
</script>

<style scoped></style>
