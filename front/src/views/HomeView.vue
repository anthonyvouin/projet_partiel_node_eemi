

<template>
  <main>
    <TheWelcome/>

    <Filter @changeCategory="handleChangeCategory"></Filter>

    <Products :category="selectedCategory"></Products>
    </main>
</template>

<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Products from '../components/Products/product.vue'
import Filter from '../components/Filter/Filter.vue'
import { ref } from 'vue';

const selectedCategory = ref('tous les produits')


const handleChangeCategory = (e)=> {
  console.log('bien recu', e.name)
  selectedCategory.value = e.name
}
</script>