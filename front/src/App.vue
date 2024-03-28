<template>
  <div class="height-100vh">
    <div class="min-height-100vh">
      <RouterView />
    </div>
    
    <SideBarContainer :title="titleSideBar" 
      :step="stepSideBar" 
      :visible="visible"
      :product="product"
      @sidebar=closeSidebar()>
    </SideBarContainer>
    <ToastBaba></ToastBaba>
    <ConfirmDeleteProduct></ConfirmDeleteProduct>

    <div class="footer background-dark white padding-20px">
      <p class="text-center">©2024 by Anthony Vouin and Charline Royer</p>
    </div>
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import ToastBaba from './components/ToastBaba/ToastBaba.vue'
  import ConfirmDeleteProduct from './components/Admin/ConfirmDeleteProduct/ConfirmDeleteProduct.vue';
  import { bus } from '@/main.js';
  import { ref } from 'vue';
  import SideBarContainer from './components/SideBars/SideBarContainer/SideBarContainer.vue';

  const visible = ref(false);
  const titleSideBar = ref();
  const stepSideBar = ref();
  const product = ref(null);

  bus.on('open-side-bar', (data)=>{
    stepSideBar.value = data.step;
    titleSideBar.value = data.title;
    
    if(data.selectedProduct){
      product.value = data.selectedProduct;
    }else{
      product.value = null;
    }
    visible.value = true;
  })

  const closeSidebar = () => {
    product.value = null;
    visible.value = !visible.value;
  }
</script>

<style scoped>

</style>

