<template>
    <Sidebar v-model:visible="props.visible" 
        position="right" 
        :pt="{
            mask:{onclick:visibly}, 
            header:{class:'primary-color flex justifiy-center align-items-center height-50px white padding-10px'},
            closeicon:{class:'white'},
            closeButton:{class:' focus-sidebar-close-button'}}"
        class="width-100 width-desktop-50 max-width-desktop-500px">

        <template #header>
            <p class="text-center width-100 primary-color">Mon panier</p>
        </template>
        <div class="padding-10px">
            <p class='mb-1'>Total : {{ totalPanier }} € </p>
            <div class="mb-4">
                <Card  v-for="(item, index) in allProducts" 
                    :key="index" 
                    class="padding-10px mb-10px">
                    <template #content>
                        <div class="flex align-items-center justify-space-between">
                            <img :src="item.image" 
                            class="sidebar-img width-25" 
                            alt="">

                            <p class="width-25 ml-1"> {{ getPrice(item.price, item.quantity) }} €</p>
                            
                            <InputNumber v-model="item.quantity"
                                inputId="horizontal-buttons" 
                                inputClass="text-center width-60px"
                                showButtons 
                                buttonLayout="horizontal"
                                class="mr-1"
                                :min="1" 
                                :step="1">
                                <template #incrementbuttonicon>
                                    <span class="pi pi-plus padding-10px" @click="getTotalPrice()" />
                                </template>
                                <template #decrementbuttonicon>
                                    <span class="pi pi-minus" @click="getTotalPrice()" />
                                </template>
                            </InputNumber>
                            <div>
                                <Button icon="pi pi-trash" 
                                outlined 
                                severity="danger" 
                                class="padding-5px width-100" 
                                @click="deleteProduct(item)"
                                ></Button>
                            </div>
                        </div>

                    </template>
                </Card>
            </div>

            <div class="sidebar-footer">
                <p>Lala</p>
            </div>

        </div>
    </Sidebar>
</template>

<script setup>
    import { bus } from '@/main';
    import Sidebar from 'primevue/sidebar';
    import Card from 'primevue/card';
    import {defineProps, onMounted, ref } from 'vue';
    import Button from 'primevue/button';
    import InputNumber from 'primevue/inputnumber';
    import { formatPrice } from "@/pipe/formatNumber";

    const props = defineProps({
        visible: Boolean,
        products: Array
    });

    const totalPanier = ref(0);
    const allProducts = ref();

    const visibly = (e) => {
        if(( !e.target.farthestViewportElement && e.target.className === 'p-sidebar-mask p-component-overlay p-component-overlay-enter p-sidebar-visible p-sidebar-right')
        ||(e.target.farthestViewportElement && e.target.farthestViewportElement.classList.value === 'p-icon p-sidebar-close-icon white')
        || (!e.target.farthestViewportElement && e.target.className === 'p-icon p-sidebar-close-icon white')
        || (!e.target.farthestViewportElement && e.target.className === 'p-sidebar-close p-sidebar-icon p-link focus-sidebar-close-button')
        ||(!e.target.farthestViewportElement && e.target.classList.value === 'p-icon p-sidebar-close-icon white') ){
            bus.emit('sidebar-shop');
        }
    }

    const getPrice = (price, quantity) => {
        return formatPrice(price * quantity);
    }

    const getTotalPrice = () => {
        let total = 0;
        allProducts.value.forEach(item => {
            total += item.quantity * item.price;
        })
        totalPanier.value = formatPrice(total);
    }

    const deleteProduct = (product) => {
       allProducts.value =  allProducts.value.filter(item => item.id !== product.id);
       localStorage.setItem('babawishList', JSON.stringify(allProducts.value));
       getTotalPrice();
       bus.emit('updateProduct');
    }

    onMounted(() => {
        allProducts.value = JSON.parse( localStorage.getItem('babawishList'));
        getTotalPrice();
    })
</script>

<style scoped src="./style.css"></style>