<template>
    <div class="padding-10px">
       <img :src="product.image" alt="" class="img-product mt-1">
       <div class="width-80 margin-0-auto">
            <p class="mt-1 justify">{{ product.description }}</p>
            <p class="mt-2">Prix : 
                <span class="bold">{{ getPrice() }} €</span>
            </p>
            
            <div class="flex width-100 align-items-center mt-2  justify-space-between">
                <InputNumber v-model="quantity" 
                inputId="horizontal-buttons" 
                inputClass="text-center width-60px"
                showButtons 
                buttonLayout="horizontal"
                :min="1" 
                :step="1">
                    <template #incrementbuttonicon>
                    <span class="pi pi-plus padding-10px" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>

                <Button class="padding-10px"
                        icon="pi pi-shopping-cart"
                        iconClass="mr-1"
                        label="Ajouter au panier" 
                        severity="info" 
                        outlined 
                        v-if="quantity > 0 "
                        @click="addProduct()"/>
            </div>
            
        </div>
      
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { formatPrice } from "@/pipe/formatNumber";
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

const dialogRef = inject('dialogRef');
const product = ref('');
const quantity = ref(1);

onMounted(() => {
   const data = dialogRef.value.data;
   product.value = data.products;
})

const getPrice = () => {
    return formatPrice(product.value.price * quantity.value);
}

const addProduct = () => {

}

</script>

<style scoped src="./style.css"></style>