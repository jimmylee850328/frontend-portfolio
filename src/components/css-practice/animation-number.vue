<template>
    <exercise-title title="Change number with CSS animation" />
    <v-row
        class="ma-2"
        align="center"
    >
        <v-icon
            size="30"
            @click="like"
        >
            mdi-thumb-up-outline
        </v-icon>

        <div
            v-for="(item, index) in number_list"
            :key="index"
            class="number-container"
        >
            <div
                :class="{'infinite-loop': item.active}"
                :style="{ top: (-1 * item.value * 50) + 'px' }"
                class="number-box"
            >
                <div
                    v-for="number in 10"
                    :key="number"
                    class="number text-blue"
                >
                    {{ number - 1 }}
                </div>
            </div>
        </div>
    </v-row>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { ref } from 'vue';

    const number_list = ref([
        { active: true, value: 1 },
        { active: true, value: 2 },
        { active: true, value: 3 },
        { active: true, value: 4 },
        { active: true, value: 5 },
    ]);

    const index = ref(0);
    const timer = ref(null);
    const stop_loop = () => {
        if (index.value < number_list.value.length) {
            number_list.value[index.value].active = false;
            index.value += 1;
        } else {
            clearInterval(timer.value);
            timer.value = null;
        }
    };
    timer.value = setInterval(stop_loop, 1000);

    const like = () => {
        number_list.value = String(Number(number_list.value.map(x => x.value).join("")) + 1).split("").map((x, index) => ({ active: number_list.value[index].active, value: x }));
    };
</script>

<style scoped lang="scss">
    @keyframes moveTop {
        0% {
            top: 0px;
        }

        50% {
            top: -450px;
        }

        100% {
            top: 0px;
        }
    }

    .infinite-loop {
        animation: moveTop 1s linear infinite alternate;
    }

    .number-container {
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;

        .number-box {
            position: absolute;
            width: 100%;
            left: 0;
            transition: 0.8s;

            .number {
                font-size: 30px;
                font-weight: bold;
                line-height: 50px;
                text-align: center;
            }
        }
    }
</style>
