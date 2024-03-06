<template>
    <nav class="flex justify-space-between width-100 background-primary height-70px align-items-center">
        <RouterLink to="/">
            <img alt="logo" class="ml-1 logo" src="../../assets/logo.png" />
        </RouterLink>
        <Search></Search>
        <span class="material-symbols-outlined white mr-1 cursor-pointer"
        @click="sideBar()" >mail</span>
    </nav>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Search from '../Search/Search.vue'
    import { bus } from '@/main.js';
    const sideBar = () => {
        bus.emit('sidebar')
    }
</script>

<style scoped src="./style.css"></style>