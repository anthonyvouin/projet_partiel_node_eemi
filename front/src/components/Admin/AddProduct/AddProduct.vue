<template>
    <div class="width-100 flex row-reverse">
            <Button icon="pi pi-plus" 
            rounded
            label="Ajouter un produit" 
            iconClass="mr-1"
            class="background-action mr-1 padding-13px mt-2" 
            @click="openSideBarProduct()" />
        </div>
    
</template>

<script setup>
    import Button from 'primevue/button';
    import {ref, defineEmits } from 'vue';
    import { bus } from '@/main.js';
    const emit = defineEmits();

    const openSideBarProduct = () => {
        emit('update-visibility-product-sidebar');
    }
</script>

<style scoped src="./style.css"></style>