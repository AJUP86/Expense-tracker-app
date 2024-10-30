<template>
  <div class="flex flex-col items-center justify-center min-h-screen pattern-background">
    <header class="mb-8 text-center">
      <h1 class="text-5xl font-extrabold text-gray-900">Expense Tracker</h1>
    </header>
    <p class="mb-12 text-xl text-gray-700">Take control of your finances with simplicity.</p>
    <button
      @click="redirectToAuth"
      class="px-8 py-4 text-lg font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors duration-300"
    >
      Log In
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const redirectToAuth = () => {
  window.location.href = 'http://localhost:3000/auth/google'
}
</script>

<style scoped>
.pattern-background {
  @apply bg-customBlue;
  background-image: radial-gradient(#000000 0.5px, transparent 0.5px);
  background-size: 4px 4px;
}
</style>
