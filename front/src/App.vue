<template>
  <div>
    <header>
    <NavBar></NavBar>
  </header>

  <RouterView />
  <SideBarMail :visible="visible"></SideBarMail>
  </div>


</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar/NavBar.vue';
  import SideBarMail from './components/SideBarMail/SideBarMail.vue';
  import { bus } from '@/main.js';
  import { ref } from 'vue';

  const visible = ref(false)
  bus.on('sidebar', (data)=>{
   visible.value = !visible.value
    })
</script>

<style scoped>

</style>

