<template>
    <exercise-title title="CSS practice - Flex vertical alignment table" />
    <div
        class="flex-container mx-5"
        :style="{'height': custom_height + 'px'}"
    >
        <div
            v-for="(item, index) in items"
            :key="index"
            class="td flex-item"
        >
            {{ item }}
        </div>
    </div>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { ref, onMounted } from 'vue';
    
    const custom_height = ref(0);
    const items = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']);

    const get_custom_height = () => {
        const td = document.getElementsByClassName("td")[0];

        // 4 items in one column
        return td.offsetHeight * 4;
    };
    
    onMounted(() => {
        custom_height.value = get_custom_height();
    });
</script>

<style scoped>
    .flex-container {
        display: flex;
        background-color: #f1f1f1;
        flex-direction: column;
        flex-wrap: wrap;
        height: 100%;
        min-height: 0;
        text-align: center;
    }

    .flex-container > div {
        background-color: DodgerBlue;
        color: white;
        text-align: center;
        line-height: 75px;
        font-size: 30px;
    }

    .flex-item {
        border: 1px solid #000;
        flex: 0 0 25%;
    }
</style>