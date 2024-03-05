<template>
    <Sidebar v-model:visible="props.visible" 
    position="right" 
    :pt="{
        mask:{onclick:visibly}, 
        header:{class:'primary-color flex justifiy-center align-items-center height-50px white padding-10px'},
        closeicon:{class:'white'},
        closeButton:{class:' focus-sidebar-close-button'}}"
    class="width-100 width-desktop-50 max-width-desktop-500px"
    >

    <template #header>
     <p class="text-center width-100 primary-color">Nous contacter</p>
    </template>
    <div class="padding-10px">
        <InputText v-model="firstname" placeholder="Prénom" class="padding-10px width-100 mt-2" :invalid="errorfirstname"/> 
        <small v-if="errorfirstname" class="color-red">Le champs prénom ne doit pas être vide.</small>    

        <InputText v-model="lastname" placeholder="Nom" class="padding-10px width-100 mt-1" :invalid="errorlastname"/>
        <small v-if="errorlastname" class="color-red">Le champs nom ne doit pas être vide.</small>    

        <InputGroup class="mt-1"> 
            <Button icon="pi pi-at" severity="info"/>
            <InputText id="email" v-model="email" placeholder="Email" class="padding-10px" :invalid="errorEmail" />  
        </InputGroup>
        <small v-if="errorEmail" class="color-red">Entrez un couriel valide.</small>   

        <InputText v-model="subject" placeholder="Objet" class="padding-10px width-100 mt-1" :invalid="errorsubject"/>
        <small v-if="errorsubject" class="color-red">Le champs objet ne doit pas être vide.</small>  

        <Editor v-model="message" editorStyle="height: 320px" class="mt-1" :invalid="errormessage"/>
        <small v-if="errormessage" class="color-red">Le corps du message ne doit pas être vide.</small>  
    </div>
    
    <div class="flex row-reverse padding-10px mt-1">
        <Button icon="pi pi-check" 
        severity="info"  
        label="Envoyer"  
        class="padding-10px" 
        raised :pt="{icon:{class:'mr-1'}}" 
        @click="sendMail()"/>
    </div>
  
    </Sidebar>

</template>

<script setup>  
    import InputGroup from 'primevue/inputgroup';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import Sidebar from 'primevue/sidebar';
    import {ref, defineProps } from 'vue';
    import { bus } from '@/main.js';
    import Editor from 'primevue/editor';
    import { useToast } from "primevue/usetoast";
    import { host, port, routesApp } from '@/conf/route-app';

    const toast = useToast();
    
    const email = ref('');
    const firstname = ref('');
    const lastname = ref('');
    const subject = ref('');
    const message = ref('');

    const errorEmail = ref(false);
    const errorfirstname = ref(false);
    const errorlastname = ref(false);
    const errorsubject = ref(false);
    const errormessage= ref(false);

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const props = defineProps({
        visible: Boolean,
    });
    
    const visibly = (e) => {
        if(( !e.target.farthestViewportElement && e.target.className === 'p-sidebar-mask p-component-overlay p-component-overlay-enter p-sidebar-visible p-sidebar-right')
        ||(e.target.farthestViewportElement && e.target.farthestViewportElement.classList.value === 'p-icon p-sidebar-close-icon white')
        || (!e.target.farthestViewportElement && e.target.className === 'p-icon p-sidebar-close-icon white')
        || (!e.target.farthestViewportElement && e.target.className === 'p-sidebar-close p-sidebar-icon p-link focus-sidebar-close-button')
        ||(!e.target.farthestViewportElement && e.target.classList.value === 'p-icon p-sidebar-close-icon white') ){
            bus.emit('sidebar');
        }
    }

    const isValidEmail = () =>{
        return regexEmail.test(email.value);
    }
    const formIsValid = () => {
        if(!firstname.value.trim() 
        || !lastname.value.trim() 
        || !email.value.trim() 
        || !isValidEmail()
        || !subject.value.trim() 
        || !message.value.trim() ){
             getError()
            return false;
        }else{
            return true;
        }
    };

    const getError = () => {

        if(!firstname.value.trim()){
            errorfirstname.value = true;
        }

        if(!lastname.value.trim()){
            errorlastname.value = true;
        }
        
        if(!email.value.trim()){
            errorEmail.value = true;
        }

        if(!isValidEmail()){
            errorEmail.value = true;
        }

        if(!subject.value.trim()){
            errorsubject.value = true;
        }

        if(!message.value.trim()){
            errormessage.value = true;
        }

    }

    const resetErrorMessage = () => {
     errorEmail.value = false;
     errorfirstname.value = false;
     errorlastname.value = false;
     errorsubject.value = false;
     errormessage.value= false;
    }

    const resetVariable = () => {
        email.value = '';
        firstname.value = '';
        lastname.value = '';
        subject.value = '';
        message.value = '';
    }
 
    const sendMail = async() => {
        resetErrorMessage();
        const isValid = formIsValid();
        if(isValid){
            const prepareEmail = {
                email:email.value,
                firstname:firstname.value,
                lastname:lastname.value,
                subject:subject.value,
                message:message.value
            }
            const url = `${host}:${port}${routesApp.contact}`;

            const options = {    
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prepareEmail) 
            };

            try{
                await fetch(url, options);
                toast.add({ severity: 'success', summary: 'Email', detail: `Votre message s'est bien envoyé`, life: 3000 });
                bus.emit('sidebar');
                resetVariable();
            }catch(e){
                toast.add({ severity: 'error', summary: 'Email', detail: `Une erreur s'est produite`, life: 3000 });
            }
           
        }else{
            toast.add({ severity: 'error', summary: 'Email', detail: `Les champs ne sont pas valides`, life: 3000 });
        }
       
    }

  </script>