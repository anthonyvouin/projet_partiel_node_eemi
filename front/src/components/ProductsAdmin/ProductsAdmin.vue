<template>
    <div class="width-100">
        <AddProduct :visible="visibleSideBarProduct" 
            @update-visibility-product-sidebar="handleVisibilityProductSidebar()">
        </AddProduct>
        <SideBarProduct :visible="visibleSideBarProduct"></SideBarProduct>
        <Toast  class="max-width-90" :pt="{container:{class:'padding-10px'}}" >
            <template #message="slotProps">
                <div class="flex column align-items-start" style="flex: 1">
                    <div class="flex align-items-center ">
                        <p class="pi pi-info-circle pr-10px"></p>
                        <span>{{ slotProps.message.summary }}</span>
                    </div>
                    <div>{{ slotProps.message.detail }}</div>
                </div>
            </template>
            <template #closeicon>
                <div>
                    <span class="pi pi-times"></span>
                </div>
            </template>
        </Toast>
    </div>
</template>

<script setup>
    import Button from 'primevue/button';
    import SideBarProduct from '../SideBarProduct/SideBarProduct.vue'
    import Toast from 'primevue/toast';

    const visibleSideBarProduct = ref(true);
    import {ref } from 'vue';
    import { bus } from '@/main.js';
    import AddProduct from '../AddProduct/AddProduct.vue';

    const handleVisibilityProductSidebar = () => {
        visibleSideBarProduct.value = !visibleSideBarProduct.value;
    }

    bus.on('sidebarProduct', (data) =>{
        visibleSideBarProduct.value = !visibleSideBarProduct.value;
    })

    bus.on('close-sidebar-product', (data) =>{
        visibleSideBarProduct.value = !visibleSideBarProduct.value;
    })
</script>

<style scoped src="./style.css"></style>