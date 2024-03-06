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
const toast = useToast();

const DetailsProducts =  defineAsyncComponent(() => import('../DetailsProducts/DetailsProducts.vue'));
const dialog = useDialog();

const products = ref([]);
const searchProduct = ref([]);

const props = defineProps({
  category: String,
  orderBy: String
});

const selectedCategory = ref(props.category);

onMounted(async() => {
    getProductsList();
})

const getProductsList = async () => {
    let response;
    products.value = [];
    if(selectedCategory.value === 'tous les produits'){
        response = await fetch("http://localhost:3000/api/product/get-all-products");
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

bus.on('search', (data)=>{
    searchProduct.value = products.value.slice();
    searchProduct.value = searchProduct.value.filter(objet => objet.title.toLowerCase().includes(data.toLowerCase()));
})

</script>

<style scoped src="./style.css"></style>