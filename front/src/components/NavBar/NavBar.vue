<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="flex justify-space-between width-100 background-primary height-30px align-items-center">
        <RouterLink to="/" class="link">SHOP</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
</template>

<style scoped src="./style.css"></style>
