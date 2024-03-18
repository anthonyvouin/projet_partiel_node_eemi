<template>
    <div class="width-100">
        <AddProduct :visible="visibleSideBarProduct" 
            @update-visibility-product-sidebar="handleVisibilityProductSidebar()">
        </AddProduct>
        <ProductListAdmin :products="products" @delete-product="handleRefreshProductList"></ProductListAdmin>
        <SideBarProduct :visible="visibleSideBarProduct" :product="selectedProduct"></SideBarProduct>       
    </div>
</template>

<script setup>
    import SideBarProduct from '../../SideBars/SideBarProduct/SideBarProduct.vue';
    import ProductListAdmin from '../ProductListAdmin/ProductListAdmin.vue';
    import {ref, onMounted } from 'vue';
    import { bus } from '@/main.js';
    import AddProduct from '../AddProduct/AddProduct.vue';
    import { getProductsBabaWish } from '@/functions/functions';

    const visibleSideBarProduct = ref(false);
    const products = ref()
    const selectedProduct = ref()


    const handleVisibilityProductSidebar = () => {
        visibleSideBarProduct.value = !visibleSideBarProduct.value;

    }

    const handleRefreshProductList = async() => {
        products.value = await getProductsBabaWish()
    }

    bus.on('sidebarProduct', (data) =>{
        visibleSideBarProduct.value = !visibleSideBarProduct.value;
        if(data){
            selectedProduct.value = data;
        }else{
            selectedProduct.value = {}
        }
    })

    bus.on('add-product', async(data)=>{
        await handleRefreshProductList()
    })

    onMounted(async() => {
        products.value = await getProductsBabaWish()
    })


</script>

<style scoped src="./style.css"></style>