<template>
    <div class="width-100 flex row-reverse">
            <Button icon="pi pi-plus" 
            rounded
            label="Ajouter un produit" 
            iconClass="mr-1"
            class="background-dark mr-1 padding-13px mt-2" 
            @click="openSideBarProduct()" />
        </div>
    
</template>

<script setup>
    import Button from 'primevue/button';
    import { bus } from '@/main.js';

    const openSideBarProduct = () => {
        bus.emit('open-side-bar', {title:'Ajouter un produit', step:'addModifyProducts'})
    }
</script>

<style scoped src="./style.css"></style>