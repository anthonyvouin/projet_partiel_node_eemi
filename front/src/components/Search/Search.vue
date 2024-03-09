<template>
        <InputGroup style="width: 50%;">
            <InputText placeholder="Rechercher..." style="padding: 10px" @input="emitValue" v-model="valueToSend"/>
            <Button icon="pi pi-search" class="background-action" />
        </InputGroup>

</template>

<script setup>
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import { bus } from '@/main';
const valueToSend = ref('');
const emitValue = () => {
      bus.emit('search', valueToSend.value);
};
</script>

<style scoped src="./style.css"></style>