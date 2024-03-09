<template>
    <div class="background-page">

        <!--Menu Mobile-->
        <div v-if="isMobile">
                <Button type="button" 
                icon="pi pi-bars" 
                label="Menu"
                iconClass="mr-1"
                @click="toggle"
                class="background-transparent color-action padding-10px" 
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

        <div class="flex" style="position: relative;">
              <!--Menu Desktop-->
            <Menu v-if="!isMobile" :model="items" class="menu-dashboard" :pt="{
                icon:{class:'mr-1'}, 
                content:{class:'padding-10px'},
                menu:{style: 'position: fixed'}
                }"/>
            <ProductsAdmin class=" pt-1" :class="{'ml-2': !isMobile, 'padding-10px': isMobile}"></ProductsAdmin>
        </div>
       
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import Menu from 'primevue/menu';
    import ProductsAdmin from "@/components/Admin/ProductsAdmin/ProductsAdmin.vue";
    import Button from "primevue/button";

    const items = ref([
        { label: 'Produits', icon: 'pi pi-plus', class:'padding-10px' },
        { label: 'Commandes', icon: 'pi pi-search', class:'padding-10px'  },
        { label: 'Utilisateurs', icon: 'pi pi-search', class:'padding-10px'  }
    ]);
    const isMobile = ref(false);
    const menu = ref()

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Appel initial de la fonction pour définir isMobile en fonction de la taille de l'écran actuelle
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
</script>
<style scoped src="./style.css"></style>