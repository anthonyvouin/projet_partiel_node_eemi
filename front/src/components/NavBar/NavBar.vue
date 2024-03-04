<template>
    <nav class="flex justify-space-between width-100 background-primary height-70px align-items-center">
        <RouterLink to="/" class="link">SHOP</RouterLink>
        <Search></Search>
        <RouterLink to="/about">About</RouterLink>
    </nav>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Search from '../Search/Search.vue'
</script>
