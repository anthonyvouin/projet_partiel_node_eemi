<template>
    <div class="min-height-100 width-100" v-if="orderList && orderList.orders">
        <Card v-for="(order, index) in orderList.orders" 
            :key="index" 
            class="container-order">
            <template #title> <p class="text-center background-action padding-10px white border-top-10px">Commande {{ index + 1 }}</p> </template>
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
                    <p class="text-center width-30"> <span class="bold">Total</span> <br> {{ order.total }} €</p>
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
        const reponse = await fetch(`${host}${port}${routesApp.orders.allOrders}`);
        const result = await reponse.json();

        for (const order of result.orders) {
            let total = 0
            for (const item of order.products) {
                let url;
                if(!Number(item.productId) && item.image){
                    item.image = `${host}${port}/${item.image}`;
                    url = `${host}${port}${routesApp.product.productById}${item.productId}`
                }else{
                    url = `${host}${port}${routesApp.product.productByIdApi}${item.productId}`
                }
                console.log(item)
                const response = await fetch(url)
                const responseJson = await response.json();
                item.price = responseJson.price;
                item.title = responseJson.title;
                total += item.price * item.quantity
            }

            order.total = total
        }
        return result;
    }

    onMounted(async() => {
        orderList.value = await getOrders()
        console.log(orderList.value)
    })
</script>

<style scoped src="./style.css"></style>