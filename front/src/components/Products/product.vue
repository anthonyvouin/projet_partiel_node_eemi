<template>
    <div class="container-component-product">
        <div class="flex flex-wrap column row-desktop column-gap-10 container-card row-gap-20 ">
            <Card v-for="(item, index) in searchProduct" :key="index" class="width-300px flex column justify-space-between card" >
                <template #title>
                    <div class="flex padding-5px" style="min-height: 128px;">
                        <div class="width-50px padding-10px">
                            <span class="material-symbols-outlined">{{ getIconsByCategory(item.category) }}</span>
                        </div>
                        <div class="padding-10px">
                            {{ item.title }}
                        </div>
                        
                    </div>
                </template>

                <template #content>
                    <div class="flex justify-center">
                        <img :src="item.image" 
                    class="img-description">
                    </div>

                </template>

                <template #footer>
                    <div class="flex justify-space-between align-items-center mb-10px mt-2">
                        <p class="ml-10px">{{formatPrice(item.price) }} €</p>
                        <Button class="padding-5px mr-10px background-dark-outlined" 
                        label="Détail" 
                        @click="getDetails(item)"/>
                    </div>
                </template>
            </Card>
        </div>  
        <DynamicDialog />
        <div class="shopCard">
            <Button type="button"
            class="padding-10px background-dark" 
            rounded 
            icon="pi pi-shopping-cart"
            iconClass="mr-1"
            :label="numberSavedProduct"
            @click="sideBarShop()"  
        />
        </div>
   
    </div>  
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineAsyncComponent  } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { bus } from '@/main';
import { useDialog } from 'primevue/usedialog';
import DynamicDialog from 'primevue/dynamicdialog';
import { useToast } from 'primevue/usetoast';
import { host, port, routesApp } from '@/conf/route-app';
import { getIconsByCategory, getProductsBabaWish } from '@/functions/functions';
import { formatPrice } from "@/pipe/formatNumber";

const toast = useToast();
const DetailsProducts =  defineAsyncComponent(() => import('../DetailsProducts/DetailsProducts.vue'));
const dialog = useDialog();
const products = ref([]);
const searchProduct = ref([]);
const savedProduct = ref([]);

const numberSavedProduct = ref('')

const props = defineProps({
  category: String,
  orderBy: String
});

const selectedCategory = ref(props.category);

onMounted(async() => {
    getProductsList('tous les produits');
    getQuickShop();
})

const  sideBarShop = () => {
    bus.emit('open-side-bar', {title:'Panier', step:'shop'})
}

const getProductsList = async (category) => {
   
    await getApiProductList();
    products.value = products.value.concat(await getProductsBabaWish(category));
    searchProduct.value = products.value.slice();
    orderBy();
};


const getApiProductList = async () => {
    let response;
    products.value = [];
    if(selectedCategory.value === 'tous les produits'){
        response = await fetch(`${host}${port}${routesApp.product.allProductsApi}`);
    }else{
        response =  await fetch(`${host}${port}${routesApp.product.byCategoryApi}${selectedCategory.value}`);
    }

    products.value =  await response.json();
}


watch(() => props.category, (newValue, oldValue) => { 
    selectedCategory.value = newValue;
    getProductsList(selectedCategory.value);
});

watch(() => props.orderBy, (newValue, oldValue) => { 
    orderBy();
});

const orderBy = () => {
    if(props.orderBy === 'asc'){
        searchProduct.value.sort((a, b) => b.price - a.price);
    }else if( props.orderBy  === 'desc'){
        searchProduct.value.sort((a, b) => a.price - b.price);
    }else{
        searchProduct.value = products.value.slice();
    }
}

const getDetails = (product) => {
    dialog.open(DetailsProducts, {
        data: {
            products:product
        },
        props: {
            header: product.title,
            style: {
                width: '50vw',
                height: '90vh',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '100vw'
            },
            pt:{
                header:{ class: 'background-dark padding-10px white' },
                closeButton:{class: 'white hover-dark'}
            },
            modal: true
        },
        onClose: (options) => {
            const data = options.data;
            if (data && data.toastMessage) {
                toast.add({ severity:data.severity, summary: data.title, detail: data.toastMessage, life: 3000 });
            }
        }
    });
}


const getQuickShop = () => {
    numberSavedProduct.value = 0;
    const saveProduct = localStorage.getItem('babawishList');
    if(saveProduct){
        savedProduct.value = JSON.parse(saveProduct);
        savedProduct.value.forEach(element => {
            numberSavedProduct.value += element.quantity
        });
    }
    numberSavedProduct.value =  numberSavedProduct.value.toString()
}


bus.on('search', (data)=>{
    searchProduct.value = products.value.slice();
    searchProduct.value = searchProduct.value.filter(objet => objet.title.toLowerCase().includes(data.toLowerCase()));
})

bus.on('updateProductList', (data)=>{
    getQuickShop();
})

</script>

<style scoped src="./style.css"></style>