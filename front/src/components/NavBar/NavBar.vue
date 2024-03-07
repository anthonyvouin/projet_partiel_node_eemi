<template>
    <nav class="flex justify-space-between width-100 background-primary-dark height-70px align-items-center">
        <RouterLink to="/">
            <img alt="logo" class="ml-1 logo" src="../../assets/logo.png" />
        </RouterLink>
        <Search></Search>
        <Button icon="pi pi-ellipsis-v" rounded class="background-primary-dark mr-1" @click="toggle" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" :pt="{icon:{class:'mr-1'}, content:{class:'padding-10px'}}" />
    </nav>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Button from 'primevue/button';
    import Search from '../Search/Search.vue';
    import { ref } from 'vue';
    import Menu from 'primevue/menu';
    import { bus } from '@/main.js';
    const sideBar = () => {
        bus.emit('sidebar')
    }

    const menu = ref();

    const items = ref([
    {
        items: [
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                command: (()=>sideBar()),
                class: 'padding-10px'
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-cog',
                class: 'padding-10px',
                url:'/dashboard'
            }
        ]
    }
]);
const toggle = (event) => {
    menu.value.toggle(event);
};
    //material-symbols-outlineds
</script>

<style scoped src="./style.css"></style>

