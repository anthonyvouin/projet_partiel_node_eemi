<template>
    <div>
        <div class="padding-10px background-action min-height-90">
            <p class='mb-1'>Total : {{ totalPanier }} € </p>
            <div class="mb-4">
                <div class="flex justify-space-between padding-10px">
                    <p class="width-25">Produits</p>
                    <p class="width-25 ml-1">Prix</p>
                    <p class="width-25">Quantité</p>
                    <p>Actions</p>
                </div>
                <Card  v-for="(item, index) in products" 
                    :key="index" 
                    class="padding-10px mb-10px">
                    <template #content>
                        <div class="flex align-items-center justify-space-between">
                            <img :src="item.image" 
                            @click="getDetails(item)"
                            class="sidebar-img width-25 cursor-pointer" 
                            alt="">

                            <p class="width-25 ml-1"> {{ getPrice(item.price, item.quantity) }} €</p>
                            
                            <InputNumber v-model="item.quantity"
                                inputId="horizontal-buttons" 
                                inputClass="text-center width-60px"
                                showButtons 
                                buttonLayout="horizontal"
                                @click="getTotalPrice()"
                                class="mr-1"
                                :min="1" 
                                :step="1">
                                <template #incrementbuttonicon>
                                    <span class="pi pi-plus padding-10px"  />
                                </template>
                                <template #decrementbuttonicon>
                                    <span class="pi pi-minus" />
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
                <Button icon="pi pi-box"
                    iconClass="mr-1"
                    severity="info" 
                    class="padding-5px background-action-outlined" 
                    label="Commander"
                    @click="order()"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { bus } from '@/main';
    import Card from 'primevue/card';
    import { ref, defineEmits, defineAsyncComponent, onMounted } from 'vue';
    import Button from 'primevue/button';
    import InputNumber from 'primevue/inputnumber';
    import { formatPrice } from "@/pipe/formatNumber";
    import { useDialog } from 'primevue/usedialog';
    import { host, port, routesApp } from '@/conf/route-app';


    const totalPanier = ref(0);
    const products = ref();
    const emit = defineEmits();
    const dialog = useDialog();
    const DetailsProducts =  defineAsyncComponent(() => import('../../DetailsProducts/DetailsProducts.vue'));

    const getPrice = (price, quantity) => {
        return formatPrice(price * quantity);
    }

    const getTotalPrice = () => {
        let total = 0;
        products.value.forEach(item => {
            total += item.quantity * item.price;
        })
        totalPanier.value = formatPrice(total);
        localStorage.setItem('babawishList', JSON.stringify(products.value));
    }

    const deleteProduct = (deleteProduct) => {
        products.value = products.value.filter(item => item.id !== deleteProduct.id);
        bus.emit('updateProductList');
        getTotalPrice();

    }

    const getDetails = async(product) => {

        let getProduct;

        if(Number(product.id)){
            getProduct = await fetch(`${host}${port}${routesApp.product.productByIdApi}${product.id}`);
        }else{
            getProduct = await fetch("http://localhost:3000/api/product/bidule/"+product.id);
        }
       
       const responseJson = await getProduct.json();
        dialog.open(DetailsProducts, {
            data: {
                products:responseJson
            },
            props: {
                header: responseJson.title,
                style: {
                    width: '50vw',
                    height: '90vh',
                },
                breakpoints:{
                    '960px': '75vw',
                    '640px': '100vw'
                },
                pt:{
                    header:{ class: 'primary-color padding-10px white' },
                    closeicon:{ class: 'white' },
                },
                modal: true
            },
        });
    }

    onMounted(() => {
        const savedProducts = localStorage.getItem('babawishList');
        if(savedProducts){
            products.value = JSON.parse(savedProducts);
            getTotalPrice()
        }
    })

    const order = () => {
        emit('close-sidebar', 'close');
    }


</script>

<style scoped src="./style.css"></style>