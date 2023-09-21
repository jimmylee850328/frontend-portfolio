<template>
    <exercise-title title="Use observer to implement Vue infinite scroll" />

    <a 
        href="https://blog.errorbaker.tw/posts/ruofan/vue-infinite-scroll/" 
        target="_blank"
        class="reference-link"
    >
        Reference
    </a>

    <v-row
        v-for="(product, index) in products"
        :key="index"
        no-gutters
        justify="center"
    >
        <v-card
            width="650"
            class="my-5"
            :color="product.color"
        >
            <v-card-title>
                <v-row no-gutters>
                    {{ product.title }}
                    <v-spacer />
                    {{ index }}
                </v-row>
            </v-card-title>

            <v-card-text>
                {{ product.text }}
            </v-card-text>
        </v-card>
    </v-row>

    <v-row
        no-gutters
        justify="center"
    >
        <v-progress-circular
            v-if="show_loading"
            indeterminate
        />
    </v-row>
    
    <observer
        class="mt-3"
        @intersect="search"
    />
</template>

<script setup>
    import { ref } from 'vue';
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import observer from '@/components/infinite-scroll/observer.vue';
    import { get_products_ajax } from "@/utils/products.js";
    
    const show_loading = ref(false);
    const total_objects = ref(null);
    const products = ref([]);
    const products_index = ref(10);
    const count = ref(0);

    const search = async () => {
        if ((total_objects.value && products.value.length >= total_objects.value) || show_loading.value) return;
        show_loading.value = true;
        const return_data = await get_products_ajax(count.value++);
        total_objects.value = return_data.paging_info.total_objects;
        products.value = products.value.concat(return_data.mock_data);
        show_loading.value = false;
    };
</script>

<style scoped>
    .reference-link {
        position: fixed;
        right: 10px;
        bottom: 10px;
    }
</style>