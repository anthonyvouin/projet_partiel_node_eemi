<template>
    <div class="width-100">
        <AddProduct></AddProduct>
        <ProductListAdmin 
            :products="products" 
            @delete-product="handleRefreshProductList">
        </ProductListAdmin>    
    </div>
</template>

<script setup>
    import ProductListAdmin from '../ProductListAdmin/ProductListAdmin.vue';
    import {ref, onMounted } from 'vue';
    import { bus } from '@/main.js';
    import AddProduct from '../AddProduct/AddProduct.vue';
    import { getProductsBabaWish } from '@/functions/functions';
    const products = ref();

    const handleRefreshProductList = async() => {
        products.value = await getProductsBabaWish('tous les produits');
    }

    bus.on('add-product', async(data)=>{
        await handleRefreshProductList();
    })

    onMounted(async() => {
        handleRefreshProductList();
    })


</script>

<style scoped src="./style.css"></style>