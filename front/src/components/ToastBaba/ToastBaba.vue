<template>
    <Toast  class="max-width-90" :pt="{container:{class:'padding-10px'}}" >
        <template #message="slotProps">
            <div class="flex column align-items-start" style="flex: 1">
                <div class="flex align-items-center ">
                    <p class="pi pi-info-circle pr-10px"></p>
                    <span>{{ slotProps.message.summary }}</span>
                </div>
                <div>{{ slotProps.message.detail }}</div>
            </div>
        </template>
        <template #closeicon>
            <div>
                <span class="pi pi-times"></span>
            </div>
        </template>
        </Toast>
</template>

<script setup>
    import Toast from 'primevue/toast';
</script>

