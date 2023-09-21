<template>
    <div class="pa-2">
        <exercise-title title="Implement responsive width for Echarts with flex display" />
        <div class="d-flex justify-center">
            <div
                class="d-flex"
                style="width: 50vw"
            >
                <div
                    v-for="n in 3"
                    :key="n"
                    class="d-flex"
                    style="border: 1px solid #000; width: 30%;"
                >
                    <div
                        class="d-flex"
                        style="position: relative; width: 100%;"
                    >
                        <h4 style="position: absolute; left: 50%; top: 0%;">
                            {{ n }}
                        </h4>

                        <div 
                            :id="map_id + n" 
                            class="map-area"
                        />
                    </div>
                </div>

                <div
                    class="d-flex"
                    style="border: 1px solid #000; width: 10%;"
                >
                    <img
                        src="@/assets/images/colorbar.png"
                        class="img-style"
                        referrerpolicy="no-referrer"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { ref, computed, onMounted } from "vue";
    import * as echarts from 'echarts';
    import { county_map_data } from '@/assets/js/mapfile.js';
    
    const map_id = "test-map-id";
    const map_name = "test-map-name";

    onMounted(() => {
        for (let n = 1; n <= 3; n++) {
            const current_map = echarts.init(document.getElementById(map_id + n));
            echarts.registerMap(map_name + n, county_map_data);

            const option = {
                geo: [
                    {
                        map: map_name + n,
                        roam: true,
                        boundingCoords: [[118, 26.5], [122.4, 21.5]],
                        center: [120.33606601731603, 23.74987148268397],
                        layoutCenter: ['50%', '50%'],
                        aspectScale: 1,
                        scaleLimit: { min: 1, max: 12.0 },
                        left: '0%', 
                        zoom: 1.6,
                    }
                ]
            };

            current_map.setOption(option);
            
            window.addEventListener('resize', function() {
                current_map.resize();
            });
        }
    });
</script>


<style scoped>
    .map-area {
        width: 100%;
        min-height: 300px;
    }

    .img-style {
        width: 100%;
        object-fit: contain;
    }
</style>