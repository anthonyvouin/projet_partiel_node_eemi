<template>
  <div>
  <RouterView />
  <SideBarMail :visible="visible"></SideBarMail>
  <ToastBaba></ToastBaba>
  <ConfirmDeleteProduct></ConfirmDeleteProduct>

  
  </div>


</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar/NavBar.vue';
  import SideBarMail from './components/SideBars/SideBarMail/SideBarMail.vue';
  import ToastBaba from './components/ToastBaba/ToastBaba.vue'
  import ConfirmDeleteProduct from './components/Admin/ConfirmDeleteProduct/ConfirmDeleteProduct.vue';
  import { bus } from '@/main.js';
  import { ref } from 'vue';

  const visible = ref(false)
  bus.on('sidebar', (data)=>{
   visible.value = !visible.value
  })
</script>

<style scoped>

</style>

