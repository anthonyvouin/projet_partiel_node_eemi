<template>
    <div class="padding-10px">
       <img :src="product.image" 
            class="img-product mt-1">
       <div class="width-80 margin-0-auto">
            <p class="mt-1 justify" 
                v-html="product.description"></p>
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

                <Button class="padding-10px min-width-button background-dark-outlined"
                        icon="pi pi-shopping-cart"
                        iconClass="mr-1"
                        :label="messageButton" 
                        outlined 
                        v-if="quantity > 0 "
                        @click="addProduct()"/>
          
            </div>

            <div class="flex row-reverse">
                <Button class="padding-10px min-width-button mt-1"
                    icon="pi pi-trash"
                    iconClass="mr-1"
                    label="Supprimer" 
                    severity="danger" 
                    outlined 
                    v-if="messageButton === 'Modifier' "
                    @click="deleteProduct()"/>
            </div>
            
        </div>
      
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { formatPrice } from "@/pipe/formatNumber";
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { bus } from "@/main";

const dialogRef = inject('dialogRef');
const product = ref('');
const quantity = ref(1);
const messageButton = ref('Ajouter au panier');

onMounted(() => {
   const data = dialogRef.value.data;
   product.value = data.products;
   const listProductSaved = localStorage.getItem('babawishList');

   if(listProductSaved){
    const listSaved = JSON.parse(listProductSaved);
    const productFind = listSaved.findIndex(item => item.id === product.value.id || item.id === product.value._id);
    if(listSaved && productFind !== -1){
        quantity.value = listSaved[productFind].quantity;
        messageButton.value = 'Modifier';
    }
   }
   
})

const getPrice = () => {
    return formatPrice(product.value.price * quantity.value);
}

const saveProduct = (data) =>{
    const savedData = localStorage.getItem('babawishList');

    if(!savedData){
        const result = [data];
        localStorage.setItem('babawishList', JSON.stringify(result));
        data.severity = 'success';
        data.status = 'Add';
        data.toastMessage = `a été rajouté à votre panier. `;
       
    }else{
       const listSaved = JSON.parse(savedData);
       const productFind = listSaved.findIndex(item => item.id === data.id);
       
       if(productFind !== -1 && listSaved[productFind].quantity !== data.quantity){
        listSaved[productFind].quantity = data.quantity;
        localStorage.setItem('babawishList', JSON.stringify(listSaved));
        data.severity = 'success';
        data.status = 'Update';
        data.toastMessage = `a été modifié. `;

       }else if(productFind == -1){
        listSaved.push(data);
        localStorage.setItem('babawishList', JSON.stringify(listSaved));
        data.severity = 'success';
        data.status = 'Add';
        data.toastMessage = `a été rajouté à votre panier.`;

       }
      
    }

    dialogRef.value.close(data);
}

const addProduct = () => {
    const data = {
        id: product.value.id ? product.value.id : product.value._id,
        title: product.value.title,
        price: product.value.price,
        quantity: quantity.value,
        image: product.value.image
    }
   
    saveProduct(data);
    bus.emit('updateProductList');
}

const deleteProduct = () => {
    const savedData = localStorage.getItem('babawishList');
    const listSaved = JSON.parse(savedData);
    const productFind = listSaved.findIndex(item => item.id === product.value.id);
    const toast = {};

    if(productFind !== -1){
        listSaved.splice(productFind, 1);
        if (listSaved.length === 0){
            localStorage.removeItem('babawishList');
        }else{
            localStorage.setItem('babawishList', JSON.stringify(listSaved));
        }

        toast.severity = 'error';
        toast.title = product.value.title;
        toast.status = 'Remove';
        toast.toastMessage = `a été supprimé du panier.`;
        bus.emit('updateProductList');
    }
    dialogRef.value.close(toast);

}

</script>

<style scoped src="./style.css"></style>