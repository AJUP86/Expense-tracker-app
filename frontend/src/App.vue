<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
onMounted(async () => {
  await authStore.fetchUser()
})
</script>

<style scoped></style>
