<template>
  <div>
  <RouterView />
  <SideBarContainer :title="titleSideBar" 
    :step="stepSideBar" 
    :visible="visible"
    @sidebar=closeSidebar()>
  </SideBarContainer>
  <ToastBaba></ToastBaba>
  <ConfirmDeleteProduct></ConfirmDeleteProduct>

  
  </div>


</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar/NavBar.vue';
  // import SideBarMail from './components/SideBars/SideBarMail/SideBarMail.vue';
  import ToastBaba from './components/ToastBaba/ToastBaba.vue'
  import ConfirmDeleteProduct from './components/Admin/ConfirmDeleteProduct/ConfirmDeleteProduct.vue';
  import { bus } from '@/main.js';
  import { ref } from 'vue';
  import SideBarContainer from './components/SideBars/SideBarContainer/SideBarContainer.vue';

  const visible = ref(false);
  const titleSideBar = ref();
  const stepSideBar = ref();

  bus.on('open-side-bar', (data)=>{
    console.log(data)
    stepSideBar.value = data.step;
    titleSideBar.value = data.title;
    visible.value = true
  })

  const closeSidebar = () => {
    visible.value = !visible.value
  }
</script>

<style scoped>

</style>

