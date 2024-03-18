<template>
    <Sidebar v-model:visible="props.visible" 
    position="right" 
    :pt="{
        mask:{onclick:closeSideBar}, 
        header:{class:'primary-color flex justifiy-center align-items-center height-50px white padding-10px'},
        closeicon:{class:'white'},
        closeButton:{class:' focus-sidebar-close-button'}}"
    class="width-100 width-desktop-50 max-width-desktop-500px"
    >

    <template #header>
     <p class="text-center width-100 primary-color">{{title}}</p>
    </template>

    <SideBarMail v-if="step === 'mail'" @close-sidebar="closeSideBar($event)"></SideBarMail>
    <SideBarShop v-if="step === 'shop'"  @close-sidebar="closeSideBar($event)"></SideBarShop>

    </Sidebar>  
    
</template>

<script setup>
    import Sidebar from 'primevue/sidebar';
    import {defineProps, defineEmits } from 'vue';
    import SideBarMail from '../SideBarMail/SideBarMail.vue';
    // import SideBarProduct from '../SideBarProduct/SideBarProduct.vue';
    import { bus } from '@/main';
    import SideBarShop from '../SideBarShop/SideBarShop.vue';
    import { clickOnCloseButton } from '@/functions/functions';
   
   const props = defineProps({
        visible: Boolean,
        title: String,
        step: String,
    });

    const emit = defineEmits();

    const closeSideBar = (e) => {
        if(props.step==='shop'){
            bus.emit('updateProductList')
        }
        if( (e.target && clickOnCloseButton(e)) || e === 'close'){
            emit('sidebar');
        }

    }  

</script>