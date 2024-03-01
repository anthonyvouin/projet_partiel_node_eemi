<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue';

</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
