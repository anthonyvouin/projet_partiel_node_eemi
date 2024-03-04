

<template>
  <main>
    <Filter @changeCategory="handleChangeCategory" @changeOrderBy="handleChangeOrderBy"></Filter>
    <Products :category="selectedCategory" :orderBy="selectOrderBy" ></Products>
    </main>
</template>

<script setup>
import Products from '../components/Products/product.vue';
import Filter from '../components/Filter/Filter.vue';
import { ref } from 'vue';

const selectedCategory = ref('tous les produits')
const selectOrderBy = ref('');


const handleChangeCategory = (e)=> {
  selectedCategory.value = e.name;
}

const handleChangeOrderBy = (e) => {
  selectOrderBy.value = e;
}
</script>