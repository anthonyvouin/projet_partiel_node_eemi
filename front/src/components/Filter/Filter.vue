<template>
<div>
    <Dropdown 
    v-model="selectedCategory" 
    :options="options" 
    optionLabel="name" 
    placeholder="Selectionnez une catégorie"
    :change="changeCategory()" 
    style="width: 200px;" />
</div>

</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import Dropdown from 'primevue/dropdown';

const emit = defineEmits();
const selectedCategory = ref({name: 'tous les produits'});
const options = ref([]);

onMounted(async() => {
    const reponse = await fetch("http://localhost:3000/api/category/get-all-category");
    const responseJson = await reponse.json();
    options.value.push({name: 'tous les produits'})
    responseJson.forEach(element => {
        const result = {name: element}
        options.value.push(result)
    });
})


const changeCategory = () =>{
    console.log(selectedCategory.value)
    emit('changeCategory', selectedCategory.value)
}


</script>

<style scoped src="./style.css"></style>