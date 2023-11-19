<template>
    <v-data-table
        v-model:items-per-page="items_per_page"
        :headers="exercise_headers"
        :items="exercise_list"
        item-value="name"
        class="elevation-1"
    >
        <template #item.operation="{ item }">
            <router-link
                :to="{ name: item.value}"
                target="_blank"
            >
                <v-icon color="primary">
                    mdi-open-in-new
                </v-icon>
            </router-link>
        </template>
    </v-data-table>
</template>

<script setup>
    import { ref, computed, onMounted, reactive } from "vue";

    const items_per_page = ref(10);
    const exercise_headers = [
        { title: 'Name', align: 'center', key: 'name', width: "30%" },
        { title: 'Desc', align: 'center', key: 'desc', width: "60%" },
        { title: 'Operation', align: 'center', key: 'operation', width: "10%" },
    ];

    const exercise_list = [
        { 
            name: "infinite-scroll",
            desc: "Use observer to implement Vue infinite scroll"
        },
        { 
            name: "draggable-chips-with-select",
            desc: "Use draggable chips with v-select to make custom features"
        },
        { 
            name: "images-downloader",
            desc: "Use JSZip to download selected images as zip"
        },
        { 
            name: "grid-layout",
            desc: "Drag the element onto the grid layout to create a new grid item"
        },
        {
            name: "simple-maze-game",
            desc: "Use canvas to create a simple maze game, use mouse to play it!"
        },
        { 
            name: "flex-vertical-table",
            desc: "CSS practice - Use flexbox to make the table alignment from horizontal to vertical"
        },
        { 
            name: "flex-echarts",
            desc: "CSS practice - Implement responsive width for Echarts with flex display"
        },
        { 
            name: "animation-number",
            desc: "CSS practice - Change number with CSS animation"
        },
    ];
</script>


<style scoped>
</style>