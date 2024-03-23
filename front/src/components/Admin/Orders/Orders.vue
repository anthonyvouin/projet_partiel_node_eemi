<template>
    <div class="min-height-100 width-100">
        <Card v-for="(order, index) in orderList" 
            :key="index" 
            class="container-order">
            <template #title> 
                <p class="text-center background-dark padding-10px white border-top-10px">
                    Commande {{ index + 1 }}
                </p> 
            </template>
            <template #content>
                <div class="padding-20px flex align-items-center ">
                    <div class="all-products width-70" >
                        <div  v-for="(item, index2) in order.products" 
                        :key="index2" 
                        class="align-items-center mb-2 product-container">
                            <img :src="item.image" alt=""  class="product-image"/>
                            <div class="ml-1 width-100%">
                                <p class="max-width-200px min-width-200px bold"> {{ item.title }}</p>
                                <p>Prix unitaire: {{ item.price }} €</p>
                                <p>Quantité: {{ item.quantity }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="text-center width-30"> 
                        <span class="bold">Total</span> 
                        <br> 
                        {{ order.total }} €
                    </p>
                </div>
            </template>
        </Card>  

    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import { host, port, routesApp } from '@/conf/route-app';
    import Card from 'primevue/card';
    const orderList = ref();

    const getOrders = async() => {
        const response = await fetch(`${host}${port}${routesApp.orders.allOrders}`);
        const data = await response.json();
        for (const order of data) {
            for (const item of order.products) {
                if(!Number(item.productId)){
                    item.image = `${host}${port}/${item.image}`;
                }
            }
        }
        return data;
    }

    onMounted(async() => {
       orderList.value  = await getOrders();
    })
</script>

<style scoped src="./style.css"></style>