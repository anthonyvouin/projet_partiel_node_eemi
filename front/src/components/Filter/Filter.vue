<template>
    <div class="flex justify-center mt-2">
        <Dropdown
        v-model="selectedCategory" 
        :options="options" 
        optionLabel="name" 
        placeholder="Selectionnez une catégorie"
        :change="changeCategory()" 
        class="padding-10px width-270px mr-1">
            <template #option="slotProps">
                    <div class="flex align-items-center padding-5px">
                        <span class="material-symbols-outlined">{{ slotProps.option.icon }}</span>
                        <div class="ml-10px">{{ slotProps.option.name }}</div>
                    </div>
                </template>
        </Dropdown>
        <Button @click="changeOrderBy()"
        severity="secondary"
        class="text-center"
        v-tooltip.bottom="{value: 'Changer le trie', pt: {
            text: 'padding-10px'
        }}"
        :icon="getButtonIcon()"></Button>
    </div>
</template>

<script setup>
    import { ref, onMounted, defineEmits } from 'vue';
    import Dropdown from 'primevue/dropdown';
    import Button from 'primevue/button';
    import { useToast } from 'primevue/usetoast';
    import { getIconsByCategory } from '@/functions/functions';
    
    const toast = useToast();
    const emit = defineEmits();
    const selectedCategory = ref({name: 'tous les produits'});
    const options = ref([]);
    const step = ref('');

    onMounted(async() => {
        const reponse = await fetch("http://localhost:3000/api/category/get-all-category");
        const responseJson = await reponse.json();
        options.value.push({name: 'tous les produits', icon: 'package_2'})
        responseJson.forEach(element => {
            const icon = getIconsByCategory(element)
            const result = {name: element, icon}
            options.value.push(result)
        });
    })

    const changeCategory = () =>{
        emit('changeCategory', selectedCategory.value);
    }

    const changeOrderBy = () => {
        switch (step.value){
            case '':
                toast.remove()
                toast.add({ severity: 'info', summary: 'Trie ', detail: 'Du plus grand au plus petit', life: 3000 });
                step.value = 'asc'
                return emit('changeOrderBy', 'asc');
            case 'asc':
            toast.remove()
            toast.add({ severity: 'info', summary: 'Trie ', detail: 'Du plus petit au plus grand', life: 3000 });
                step.value = 'desc'
                return emit('changeOrderBy', 'desc');
            case 'desc': 
            toast.remove()
            toast.add({ severity: 'info', summary: 'Trie', detail: 'Réglage par défault', life: 3000 });
                step.value = ''
                return emit('changeOrderBy', '');
        }
    }

    const getButtonIcon = () => {
        switch (step.value){
            case '':
                return 'pi pi-sort-alt';
            case 'asc':
                return 'pi pi-sort-numeric-down-alt';
            case 'desc': 
                return 'pi pi-sort-numeric-down';
        }
    }


</script>

<style scoped src="./style.css"></style>