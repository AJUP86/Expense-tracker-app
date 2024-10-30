import { defineStore } from 'pinia'
import apiClient from '@/services/apiService'
import { ref, computed } from 'vue'

export const useBudgetStore = defineStore('budget', () => {
  const budgets = ref([])
  const currentBudget = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const totalBudgets = computed(() => budgets.value.length)
  const selectedBudget = computed(() => currentBudget.value)

  const fetchBudgets = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/budgets')
      budgets.value = response.data
    } catch (err) {
      console.error('Failed to fetch budgets:', err)
      error.value = response.data
    } finally {
      isLoading.value = false
    }
  }

  const createBudget = async (budgetData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/budgets', budgetData)
      budgets.value.push(response.data)
    } catch (err) {
      console.error('Failed to create budget:', err)
      error.value = 'Unable to create budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchBudgetById = async (budgetId) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/budgets/${budgetId}`)
      currentBudget.value = response.data
    } catch (err) {
      console.error('Failed to fetch budget:', err)
      error.Value = 'Unable to fetch budget.'
    } finally {
      isLoading = false
    }
  }

  const updateBudget = async (budgetId, updatedData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.put(`/budgets/${budgetId}`, updatedData)
      const index = budgets.value.findIndex((budget) => budget.budget_id === budgetId)
      if (index !== -1) {
        budgets.value[index] = response.data
      }
    } catch (err) {
      console.error('Failed to update budget:', err)
      error.value = 'Unable to update budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteBudget = async (budgetId) => {
    isLoading.value = true
    error.value = null
    try {
      await apiClient.delete(`/budgets/${budgetId}`)
      budgets.value = budgets.value.filter((budget) => budget.budget_id !== budgetId)
    } catch (err) {
      console.error('Failed to delete budget:', err)
      error.value = 'Unable to delete budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    budgets,
    currentBudget,
    isLoading,
    error,
    totalBudgets,
    selectedBudget,
    fetchBudgets,
    createBudget,
    fetchBudgetById,
    updateBudget,
    deleteBudget
  }
})
