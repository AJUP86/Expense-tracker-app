import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient, { fetchPaymentMethods } from '@/services/apiService'
import { useBudgetStore } from './useBudgetStore'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses = ref([])
  const paymentMethods = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const budgetStore = useBudgetStore()

  const fetchExpenses = async (budgetId) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/budgets/${budgetId}/expenses`)
      expenses.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Unable to fetch expenses'
    } finally {
      isLoading.value = false
    }
  }

  const fetchPaymentMethodsList = async () => {
    try {
      const response = await fetchPaymentMethods()
      paymentMethods.value = response.data
    } catch (err) {
      console.error('Failed to fetch payment methods:', err)
      error.value = 'Failed to load payment methods'
    }
  }

  const addExpense = async (expenseData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/expenses', expenseData)
      const newExpense = response.data
      expenses.value.push(newExpense)

      await budgetStore.fetchBudgetById(expenseData.budgetId)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add expense.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    expenses,
    paymentMethods,
    isLoading,
    error,
    fetchExpenses,
    fetchPaymentMethodsList,
    addExpense
  }
})
