<template>
    <div>
        <ConfirmDialog group="confirmDelete"
            :pt="{
            header:{class:'background-dark padding-10px white'}, 
            content:{class:'padding-20px'},
            closeButton:{class:'white hover-dark'},
            footer:{class:'padding-10px'},
            }">
            <template #message="slotProps">
                <div class="flex column">
                    <p :class="slotProps.message.icon"></p>
                    <p>Êtes vous sûre de vouloir supprimer le produit : <br> <br>
                        <li>{{ slotProps.message.message }}</li>
                    </p>
                </div>
            </template>
        </ConfirmDialog>
    </div>

</template>

<script setup>
    import ConfirmDialog from 'primevue/confirmdialog';
</script>