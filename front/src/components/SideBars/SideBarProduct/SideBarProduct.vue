<template>
    <div class="padding-10px">
        <InputText 
            type="text" 
            v-model="title" 
            placeholder="Titre" 
            class="padding-10px width-100 mt-2" 
            :invalid="errorTitle"/>
        <small v-if="errorTitle" 
            class="color-red">
            Le champs titre ne doit pas être vide.
        </small>   
            
        <Dropdown v-model="selectedCategory" 
            :options="categories" 
            optionLabel="name" 
            placeholder="Selectionnez une catégorie" 
            class="width-100 padding-10px mt-2" 
            panelClass="padding-10px"/>

        <small v-if="errorCategory" 
        class="color-red">
            Le champs catégorie ne doit pas être vide.
        </small>

        <Editor v-model="description" 
            editorStyle="height: 150px" 
            placeholder="Description"
            class="mt-2" 
            :invalid="errorDescription"/>
        <small v-if="errorDescription" 
            class="color-red">
            Le champs description ne doit pas être vide.
        </small>

        <InputNumber v-model="price" 
            placeholder="Prix"
            mode="currency" 
            currency="EUR" 
            locale="fr-FR" 
            class="width-100 mt-2"  
            inputClass="padding-10px"/>
        <small v-if="errorPrice" 
            class="color-red">
            Le champs prix ne doit pas être vide.
        </small>


        <InputText id="uploadFile" 
            hidden 
            type="file" 
            @change="onFileSelect($event)">
        </InputText>

        <InputGroup class="width-100 mt-2">
            <InputText placeholder="Selectionner une image" class="padding-10px" readonly v-model="fileName"/>
            <Button icon="pi pi-upload" class="background-dark"  @click="activeInput($event)" />
        </InputGroup>
        <small v-if="errorFile" class="color-red">Le champs image ne doit pas être vide.</small> <br>
            
        <div v-if="thumbnail" class="mt-2 flex width-100 justify-space-between align-items-center">
            <img :src="thumbnail"
            class="preview mb-4"
            alt="image du produit">
        </div>

        <div class="sidebar-footer">
            <Button icon="pi pi-save" 
            severity="info" 
            :label="btnMessage" 
            class="padding-10px background-dark-outlined" 
            iconClass="mr-1"
            outlined
            @click="save()" />
        </div>
    </div>
</template>

<script setup>
    import { bus } from '@/main.js';
    import {ref, defineProps, onMounted, defineEmits } from 'vue';
    import InputText from 'primevue/inputtext';
    import Editor from 'primevue/editor';
    import InputNumber from 'primevue/inputnumber';
    import InputGroup from 'primevue/inputgroup';
    import Dropdown from 'primevue/dropdown';
    import Button from 'primevue/button';
    import { host, port, routesApp } from '@/conf/route-app';
    import { useToast } from "primevue/usetoast";

    const emit = defineEmits();
    const toast = useToast();
    const btnMessage = ref('Enregistrer')
    const title = ref('');
    const description = ref('');
    const price = ref(undefined);
    const fileName = ref();
    const file = ref();
    const thumbnail = ref();
    const selectedCategory= ref();

    const categories = ref([
    { name: 'electronics'},
    { name: 'jewelery' },
    { name: `men's clothing`},
    { name: `women's clothing`},
]);

    const errorTitle = ref(false);
    const errorDescription = ref(false);
    const errorPrice = ref(false);
    const errorFile = ref(false);
    const errorCategory = ref(false);


    const props = defineProps({
        product: Object | null,
    });

    const activeInput = (event) => {
        const buttonUpload = document.getElementById('uploadFile');
        buttonUpload.click();
    }

    const onFileSelect = async(event) => {
        fileName.value = event.target.files[0].name;
        file.value = event.target.files[0];
        createThumbnail();
    }

   const createThumbnail = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            thumbnail.value = e.target.result;
        }
        reader.readAsDataURL(file.value);
    }

    const formIsValid = () => {
        if(!title.value.trim() 
        || !description.value
        || !selectedCategory.value
        || !price.value
        || (!props.product && !file)
        || !fileName.value 
       ){
            getError()
            return false;
        }else{
            return true;
        }
    };

    const getError = () => {
        if(!title.value.trim()){
            errorTitle.value = true;
        }

        if(!description.value){
            errorDescription.value = true;
        }
        if(!selectedCategory.value){
            errorCategory.value = true;
        }

        if(!price.value){
            errorPrice.value = true;
        }

        if((!props.product && !file) || !fileName.value){
            errorFile.value = true;
        }

    }

    const resetErrorMessage = () => {
        errorTitle.value = false;
        errorDescription.value = false;
        errorCategory.value = false;
        errorPrice.value = false;
        errorFile.value = false;
    }

    const save = async() => {
        resetErrorMessage();
        const isValid = formIsValid();
        if(isValid){
            let url;
            let options;
            const data = new FormData();
            data.append('title', title.value);
            data.append('price', price.value );
            data.append('description', description.value );
            data.append('category', selectedCategory.value.name );
            if(file.value){
                data.append('image', file.value );
            }
            
            if(!props.product){
                url = `${host}${port}${routesApp.product.createProduct}`;
                options = {    
                    method: 'POST', 
                    body: data
                };
            }else{
                url = `${host}${port}${routesApp.product.updateProduct}${props.product._id}`;
                options = {    
                    method: 'PUT', 
                    body: data
                };
            }
          

            try{
                await fetch(url, options);
                toast.add({ severity: 'success', summary: 'Ajout Produit', detail: `Votre a été créer`, life: 3000 });
                bus.emit('add-product');
                emit('close-sidebar', 'close');
            }catch(e){
                toast.add({ severity: 'error', summary: 'Erreur ajout produit', detail: `Une erreur s'est produite`, life: 3000 });
            }
        }
    }

    onMounted(async() => {
        if(props.product){
            title.value = props.product.title;
            description.value = props.product.description;
            thumbnail.value = props.product.image;
            price.value = props.product.price;
            selectedCategory.value = {name: props.product.category}
            fileName.value = props.product.image.split('/').pop().split('\\').pop();
            btnMessage.value = "Modifier"
        }
    })

</script>
<style scoped src="./style.css"></style>