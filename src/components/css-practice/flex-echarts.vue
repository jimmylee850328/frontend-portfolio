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
                    style="border: 1px solid #000; width: calc(100% / 3);"
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
            </div>
        </div>
    </div>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { ref, computed, onMounted } from "vue";
    import * as echarts from 'echarts';
    import { county_map_data, current_map_data } from '@/assets/js/mapfile.js';
    
    const map_id = "test-map-id";
    const map_name = "test-map-name";

    onMounted(() => {
        for (let n = 1; n <= 3; n++) {
            const current_map = echarts.init(document.getElementById(map_id + n));
            echarts.registerMap(map_name + n, county_map_data);

            const pieces = [{ 'value': -999, 'label': 'no data' }, { 'value': -998, 'label': 'elev≥350m' }, { 'value': 0, 'label': 0 }, { 'value': 1, 'label': 1 }, { 'value': 2, 'label': 2 }, { 'value': 3, 'label': 3 }, { 'value': 4, 'label': 4 }, { 'value': 5, 'label': 5 }, { 'value': 6, 'label': 6 }, { 'value': 7, 'label': 7 }, { 'value': 8, 'label': 8 }, { 'value': 9, 'label': 9 }, { 'value': 10, 'label': 10 }, { 'value': 11, 'label': 11 }, { 'value': 12, 'label': 12 }, { 'value': 13, 'label': 13 }, { 'value': 14, 'label': 14 }, { 'value': 15, 'label': 15 }, { 'value': 16, 'label': 16 }, { 'value': 17, 'label': 17 }, { 'value': 18, 'label': ">17" }];
            const colors = ['#000000', '#a9a9a9', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#e1ffff', '#7fffd3', '#fdff00', '#ffa500', '#ff0200', '#ff0200', '#ff00ff', '#ff00ff', '#4b0182', '#4b0182', '#4b0182', '#4b0182', '#4b0182', '#4b0182', '#4b0182'];
            
            const option = {
                visualMap: {
                    type: 'piecewise',
                    itemGap: 0,
                    itemSymbol: 'rect',
                    align: "left",
                    realtime: false,
                    pieces: pieces,
                    inRange: {
                        color: colors
                    },
                },

                series: [
                    {
                        geoIndex: 0,
                        name: 'current_map', // 不用跟 geo 的 map 一樣
                        type: 'map',
                        data: current_map_data,
                    },
                ],
                    
                geo: [
                    {
                        map: map_name + n, // 要跟 register 的 map 一樣
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
</style>