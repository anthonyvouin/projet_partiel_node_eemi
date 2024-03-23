<template>
    <div class="background-page">

        <!--Menu Mobile-->
        <div v-if="isMobile">
                <Button type="button" 
                icon="pi pi-bars" 
                label="Menu"
                iconClass="mr-1"
                @click="toggle"
                class="background-transparent color-dark padding-10px" 
                aria-haspopup="true"  />
                <Menu ref="menu" 
                id="overlay_menu" 
                :model="items" 
                :popup="true"
                :pt="{
                    icon:{class:'mr-1'}, 
                    content:{class:'padding-10px'},
                }" />
        </div>
        <!--Fin Menu Mobile-->
        
        <div class="flex" style="position: relative;">
            <!--Menu Desktop-->
            <Menu v-if="!isMobile" :model="items" class="menu-dashboard" :pt="{
                icon:{class:'mr-1'}, 
                content:{class:'padding-10px',},
                menu:{style: 'position: fixed'}
                }"/>
            <!--Fin Menu Desktop-->

            <!--Pages en fonction du step-->
            <ProductsAdmin v-if="step === 'products'"
                class=" pt-1" 
                :class="{'ml-2': !isMobile, 'padding-10px': isMobile}">
            </ProductsAdmin>
            <Orders v-if="step === 'orders'"></Orders>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import Menu from 'primevue/menu';
    import ProductsAdmin from "@/components/Admin/ProductsAdmin/ProductsAdmin.vue";
    import Orders from '@/components/Admin/Orders/Orders.vue'
    import Button from "primevue/button";

    const items = ref([
        { label: 'Home', icon: 'pi pi-home', class:'padding-10px', url:'/'  },
        { label: 'Produits', icon: 'pi pi-plus', class:'padding-10px', command: (()=>changeStep('products'))},
        { label: 'Commandes', icon: 'pi pi-box', class:'padding-10px',command: (()=>changeStep('orders'))  }
        
    ]);
    const isMobile = ref(false);
    const menu = ref();
    const step = ref('products');

    onMounted(() => {
        //pour mettre le bon menu au resize de la fenetre
        window.addEventListener('resize', handleResize);
    });

    const handleResize = () => {
        if (window.innerWidth < 900) {
            isMobile.value = true;
        } else {
            isMobile.value = false;
        }
    }

    const toggle = (event) => {
    menu.value.toggle(event);
    };

    const changeStep = (navigateTo) => {
        step.value = navigateTo;
    }
</script>
<style scoped src="./style.css"></style>