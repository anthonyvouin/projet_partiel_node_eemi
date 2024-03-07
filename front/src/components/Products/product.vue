<template>
    <div>
        <div class="flex flex-wrap column row-desktop column-gap-10 container-card row-gap-20 ">
            <Card v-for="(item, index) in searchProduct" :key="index" class="width-300px flex column justify-space-between card" >
                <template #title>
                    <div class="text-center padding-5px" style="min-height: 128px;">
                        {{ item.title }}
                    </div>
                </template>

                <template #content>
                    <img :src="item.image" 
                    class="img-description">
                </template>

                <template #footer>
                    <div class="flex justify-space-between align-items-center mb-10px mt-2">
                        <p class="ml-10px">{{item.price}} €</p>
                        <Button class="padding-5px mr-10px" 
                        label="Détail" 
                        severity="info" 
                        outlined 
                        @click="getDetails(item)"/>
                    </div>
                </template>
            </Card>
        </div>  
        <DynamicDialog />
        <Button type="button"
        class="padding-10px shopCard" 
        severity="info"
        rounded 
        icon="pi pi-shopping-cart"
        iconClass="mr-1"
        :label="numberSavedProduct"
        @click="sideBarShop()"  
        />

        <SideBarShop :visible="visibilitySideBarShop" :products="savedProduct" @delete-product="deleteProducts($event)"></SideBarShop>
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
import SideBarShop from '../SideBarShop/SideBarShop.vue'
import { host, port, routesApp } from '@/conf/route-app';

const toast = useToast();
const DetailsProducts =  defineAsyncComponent(() => import('../DetailsProducts/DetailsProducts.vue'));
const dialog = useDialog();
const products = ref([]);
const searchProduct = ref([]);
const visibilitySideBarShop = ref(false)
const savedProduct = ref([]);

const numberSavedProduct = ref('')

const props = defineProps({
  category: String,
  orderBy: String
});

const selectedCategory = ref(props.category);

onMounted(async() => {
    getProductsList();
    getQuickShop();
})

const  sideBarShop = () => {
    visibilitySideBarShop.value = !visibilitySideBarShop.value
}

const getProductsList = async () => {
    let response;
    products.value = [];
    if(selectedCategory.value === 'tous les produits'){
        response = await fetch(`${host}${port}${routesApp.product.allProductsApi}`);
    }else{
        response =  await fetch(`http://localhost:3000/api/product/get-product-by-category/${selectedCategory.value}`);
    }

    products.value  = await response.json();
    searchProduct.value = products.value.slice();
    orderBy();
};

watch(() => props.category, (newValue, oldValue) => { 
    selectedCategory.value = newValue;
    getProductsList();
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

const getDetails = (products) => {
    dialog.open(DetailsProducts, {
        data: {
            products:products
        },
        props: {
            header: products.title,
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
        onClose: (options) => {
            const data = options.data;
            if (data && data.toastMessage) {
                toast.add({ severity:data.severity, summary: data.title, detail: data.toastMessage, life: 3000 });
            }
        }
    });
}


const getQuickShop = () => {
    numberSavedProduct.value = 0
    const saveProduct = localStorage.getItem('babawishList');
    if(saveProduct){
        savedProduct.value = JSON.parse(saveProduct);
        savedProduct.value.forEach(element => {
            numberSavedProduct.value += element.quantity
        });
    }
    numberSavedProduct.value =  numberSavedProduct.value.toString()
}

const deleteProducts = (e) => {
    savedProduct.value = savedProduct.value.filter(item => item.id !== e);
    localStorage.setItem('babawishList', JSON.stringify(savedProduct.value));
    getQuickShop();
}

bus.on('search', (data)=>{
    searchProduct.value = products.value.slice();
    searchProduct.value = searchProduct.value.filter(objet => objet.title.toLowerCase().includes(data.toLowerCase()));
})

bus.on('updateProduct', (data)=>{
    getQuickShop();
})

bus.on('sidebar-shop', (data)=>{
    visibilitySideBarShop.value = !visibilitySideBarShop.value
    localStorage.setItem('babawishList', JSON.stringify(savedProduct.value));
})

</script>

<style scoped src="./style.css"></style>