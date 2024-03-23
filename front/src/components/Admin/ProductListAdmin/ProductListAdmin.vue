<template>
    <div class="min-height-90">
        <div
            class="width-100 width-desktop-80 margin-0-auto mt-2 flex justify-space-between padding-10px bold">
            <p class="width-20">Image</p>
            <p class="width-20">Titre</p>
            <p class="width-20">Catégorie</p>
            <p>Prix</p>
            <p>Actions</p>
        </div>
        <div class="width-100 width-desktop-80 margin-0-auto">
            <Card v-for="(item, index) in props.products" 
                :key="index" 
                class="padding-10px mb-1" >
                <template #content>
                    <div class="flex align-items-center justify-space-between">
                        <div class="width-20">
                            <img :src="item.image" 
                            class="img-dashboard">
                        </div>
                        <p class="width-20">{{ item.title }}</p>
                        <p class="width-20">{{ item.category }}</p>
                        <p>{{ item.price }} €</p>
                        <div>
                            <Button icon="pi pi-ellipsis-v" 
                            text
                            @click="toggle($event, index), show()"
                            iconClass="color-light" 
                            rounded />
                            <Menu ref="menu" 
                                :model="items" 
                                :popup="true" 
                                :pt="{
                                    icon:{class:'mr-1'}, 
                                    content:{class:'padding-10px'}
                                }" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
    
</template>
<script setup>
    import { ref, defineEmits, defineProps, onMounted } from "vue";
    import { host, port, routesApp } from '@/conf/route-app';
    import Card from 'primevue/card';
    import Menu from 'primevue/menu';
    import Button from 'primevue/button';
    import { useToast } from "primevue/usetoast";
    import { useConfirm } from "primevue/useconfirm";
    import { bus } from '@/main.js';

    const menu = ref();
    const confirm = useConfirm();
    const selectItem = ref();
    const toast = useToast();
    const emit = defineEmits();

    const props = defineProps({
        products: Array | undefined
    })

    const items = ref([
        {
            items: [
                {
                    label: 'Modifier',
                    icon: 'pi pi-file-edit',
                    class: 'padding-10px',
                    command: (()=>edit()),
                },
                {
                    label: 'Supprimer',
                    icon: 'pi pi-trash',
                    class: 'padding-10px',
                    command: (()=>confirmDelete()),
                    disabled: false,
                }
            ]
        }
    ]);

    const toggle = (event, index) => {
       menu.value[index].toggle(event);
        selectItem.value = props.products[index];
    };

    const show = async()=>{
        const response = await fetch(`${host}${port}${routesApp.product.canDeleteProduct}${selectItem.value._id}`);
        const responseJson =  await response.json();
        if(responseJson.response === false){
          items.value[0].items[1].disabled = true
        }else{
            items.value[0].items[1].disabled = false
        }
    }

    const edit = () => {
        bus.emit('open-side-bar', {title:'Modifier le produit', step:'addModifyProducts', selectedProduct:selectItem.value});
    } 

    const confirmDelete = () => {
        confirm.require({
            group:"confirmDelete",
            message: `${selectItem.value.title}`,
            header: 'Confirmation de la suppression',
            icon: 'pi pi-exclamation-triangle color-red text-center fs-50px mb-10px',
            acceptClass:'padding-10px background-dark',
            rejectClass: 'p-button-secondary p-button-outlined padding-10px',
            rejectLabel: 'Non',
            acceptLabel: 'Oui',
            accept: () => {
                deleteProduct();
            },
            reject: () => {
            }
        });
    };
    
    const deleteProduct = async () => {
        const url = `${host}${port}${routesApp.product.deleteProduct}${selectItem.value._id}`;
        const options = {    
            method: 'DELETE'
        };

        try{
            await fetch(url, options);
            emit('delete-product');
            toast.add({ severity: 'success', summary: 'Supression Produit', detail: `Le produit ${selectItem.value.title} a été supprimé`, life: 3000 });
        }catch(e){
            toast.add({ severity: 'error', summary: 'Erreur supression produit', detail: `Une erreur s'est produite`, life: 3000 });
        }

        selectItem.value = undefined;
    }

</script>

<style scoped src="./style.css"></style>