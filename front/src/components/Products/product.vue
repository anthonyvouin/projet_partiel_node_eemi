<template>
    <div class="flex flex-wrap column row-desktop column-gap-10 container-card row-gap-20 ">
        <Card v-for="(item, index) in products" :key="index" class="width-300px flex column justify-space-between" >
            <template #title>
                <div class="text-center padding-5px" style="min-height: 128px;">
                    {{ item.title }}
                </div>
            </template>

            <template #content>
                <img :src="item.image" 
                class="img-description">
            </template>

            <template #footer>
                <div class="flex justify-space-between align-items-center mb-10px mt-2">
                    <p class="ml-10px">{{item.price}} €</p>
                    <Button class="padding-5px mr-10px" label="Détail" severity="info" outlined />
                </div>
            </template>
        </Card>
    </div>    
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

const products = ref();

const props = defineProps({
  category: String,
});

const selectedCategory = ref(props.category)

onMounted(async() => {
    getProductsList();
})

const getProductsList = async () => {
    let response;
    if(selectedCategory.value === 'tous les produits'){
        response = await fetch("http://localhost:3000/api/product/get-all-products");
        products.value  = await response.json();
      }else{
        response =  await fetch(`http://localhost:3000/api/product/get-product-by-category/${selectedCategory.value}`)
        products.value  = await response.json();
      }
};

watch(() => props.category, (newValue, oldValue) => { 
      selectedCategory.value = newValue;
      getProductsList();
   
});
</script>

<style scoped src="./style.css"></style>