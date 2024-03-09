<template>
    <div class="width-100">
        <AddProduct :visible="visibleSideBarProduct" 
            @update-visibility-product-sidebar="handleVisibilityProductSidebar()">
        </AddProduct>
        <ProductListAdmin></ProductListAdmin>
        <SideBarProduct :visible="visibleSideBarProduct"></SideBarProduct>       
    </div>
</template>

<script setup>
    import Button from 'primevue/button';
    import SideBarProduct from '../SideBarProduct/SideBarProduct.vue'
    import ProductListAdmin from '../ProductListAdmin/ProductListAdmin.vue';

    const visibleSideBarProduct = ref(false);
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