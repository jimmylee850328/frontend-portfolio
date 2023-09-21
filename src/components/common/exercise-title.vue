<template>
    <v-row 
        no-gutters 
        justify="center"
    >
        <div>
            <h2> {{ title }} </h2>
            <v-alert
                v-if="subtitle"
                type="info"
                variant="tonal"
                density="compact"
                border="start"
                border-color="info accent-4"
                elevation="2"
            >
                {{ subtitle }}
            </v-alert>
        </div>
    </v-row>
</template>
    
<script setup>
    import { defineProps } from "vue";
    const props = defineProps({
        title: {
            type: String,
            default: ""
        },

        subtitle: {
            type: String,
            default: ""
        }
    });
</script>

<style>

</style>