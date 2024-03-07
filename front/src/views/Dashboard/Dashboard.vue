<template>
    <div>
        <div class="flex">
            <Menu :model="items" class="flex column height-100vh width-20" :pt="{icon:{class:'mr-1'}, content:{class:'padding-10px'}}"/>
            <ProductsAdmin class="ml-2 pt-1"></ProductsAdmin>
        </div>
       
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from 'primevue/menu';
import ProductsAdmin from "@/components/ProductsAdmin/ProductsAdmin.vue";

const items = ref([
    { label: 'Produits', icon: 'pi pi-plus', class:'padding-10px' },
    { label: 'Commandes', icon: 'pi pi-search', class:'padding-10px'  },
    { label: 'Utilisateurs', icon: 'pi pi-search', class:'padding-10px'  }
]);


</script>
<style scoped src="./style.css"></style>