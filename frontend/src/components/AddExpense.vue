<template>
  <div class="p-6 border-4 border-beige bg-beige shadow-lg">
    <h2 class="text-3xl font-display mb-6 text-black">Add Expense</h2>
    <form @submit.prevent="submitExpense">
      <div class="mb-4">
        <label for="budget" class="block text-2xl font-semibold text-darkGray">Budget</label>
        <select
          v-model="selectedBudgetId"
          id="budget"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
        >
          <option v-for="budget in budgets" :key="budget.budget_id" :value="budget.budget_id">
            {{ budget.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="category" class="block text-2xl font-semibold text-darkGray">Category</label>
        <select
          v-model="selectedCategoryId"
          id="category"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
        >
          <option
            v-for="category in categories"
            :key="category.category_id"
            :value="category.category_id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="description" class="block text-2xl font-semibold text-darkGray"
          >Description</label
        >
        <input
          v-model="description"
          type="text"
          id="description"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Enter description"
        />
      </div>

      <div class="mb-4">
        <label for="amount" class="block text-2xl font-semibold text-darkGray">Amount</label>
        <input
          v-model.number="amount"
          type="number"
          id="amount"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Enter amount"
        />
      </div>
      <div class="mb-4">
        <label for="payment-method" class="block text-2xl font-semibold text-darkGray"
          >Payment Method</label
        >
        <select
          v-model="paymentMethod"
          id="payment-method"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
        >
          <option v-for="method in paymentMethods" :key="method" :value="method">
            {{ method }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="date" class="block text-2xl font-semibold text-darkGray">Date</label>
        <input
          v-model="date"
          type="date"
          id="date"
          required
          class="w-full px-4 py-3 border-2 border-black rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Select date"
        />
      </div>
      <button
        type="submit"
        class="w-full px-6 py-3 bg-blue text-2xl font-semibold text-white rounded-lg hover:bg-red focus:outline-none transition-colors duration-300"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Adding...' : 'Add Expense' }}
      </button>
      <p v-if="error" class="text-red text-xl mt-4">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useExpensesStore } from '@/stores/useExpensesStore'
import { useBudgetStore } from '@/stores/useBudgetStore'

const expensesStore = useExpensesStore()
const budgetStore = useBudgetStore()

const paymentMethods = computed(() => expensesStore.paymentMethods)
const budgets = computed(() => budgetStore.budgets)

const selectedBudgetId = ref(null)
const selectedCategoryId = ref(null)
const description = ref('')
const amount = ref(0)
const paymentMethod = ref('')
const date = ref('')
const isLoading = computed(() => expensesStore.isLoading)
const error = computed(() => expensesStore.error)

const categories = computed(() => {
  const selectedBudget = budgets.value.find((b) => b.budget_id === selectedBudgetId.value)
  return selectedBudget?.categories || []
})

const submitExpense = async () => {
  const expenseDate = date.value ? new Date(date.value) : null

  if (expenseDate && isNaN(expenseDate.getTime())) {
    alert('Please select a valid date.')
    return
  }
  await expensesStore.addExpense({
    budgetId: selectedBudgetId.value,
    categoryId: selectedCategoryId.value,
    description: description.value,
    amount: amount.value,
    paymentMethod: paymentMethod.value,
    date: expenseDate
  })

  selectedBudgetId.value = null
  selectedCategoryId.value = null
  description.value = ''
  amount.value = 0
  paymentMethod.value = ''
  date.value = ''
}
onMounted(async () => {
  if (paymentMethods.value.length === 0) {
    await expensesStore.fetchPaymentMethodsList()
  }
})
</script>
