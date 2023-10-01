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
        >
            <v-card-title>
                <v-row no-gutters>
                    <span
                        class="text-truncate"
                        style="flex: 1"
                    > 
                        {{ product.title }} 
                    </span>
                    <span class="pl-2 flex-0-0"> {{ index }} </span>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-img
                    :src="product.url"
                    :lazy-src="product.url"
                    cover
                >
                    <template #placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                            />
                        </v-row>
                    </template>
                </v-img>
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
    const total_objects = ref(5000);
    const nums_per_round = ref(10);
    const products = ref([]);
    const count = ref(1);

    const search = async () => {
        if ((total_objects.value && products.value.length >= total_objects.value) || show_loading.value) return;
        show_loading.value = true;
        for (let i = 0; i < nums_per_round.value; i++) {
            const return_data = await get_products_ajax(count.value++);
            products.value = products.value.concat(return_data);
        }
        show_loading.value = false;
    };
</script>

<style scoped>
    .reference-link {
        position: fixed;
        right: 10px;
        bottom: 10px;
        z-index: 2;
    }
</style>