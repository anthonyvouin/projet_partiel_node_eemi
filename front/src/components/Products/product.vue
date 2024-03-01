<template>
    <div class="flex">
        <Card v-for="(item, index) in products" :key="index" class="width-30" >
            <template #title>{{ item.title }}</template>
            <template #content>
                <img :src="item.image">
                <Button label="Détail" severity="info" outlined />

            </template>

        </Card>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

const products = ref();

onMounted(async() => {
    const reponse = await fetch("http://localhost:3000/api/product/get-all-products");
     products.value  = await reponse.json();
    console.log(products.value[0]);
})



</script>