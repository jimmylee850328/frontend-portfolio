<template>
    <exercise-title 
        title="vue3-grid-layout test" 
        subtitle="Drag the element onto the grid layout to create a new grid item"
    />
    
    <v-row no-gutters>
        <div
            v-for="(item, index) in draggable_items"
            :key="index"
            class="droppable-element ma-5"
            draggable="true"
            unselectable="on"
            :style="{width: `${item.width}px`, height: `${item.height}px`, background: item.background}"
            @drag="handle_drag($event, item)"
            @dragend="handle_drag_end($event, item)"
        >
            drag me
        </div>
    </v-row>

    <grid-layout
        v-model:layout="layout"
        :col-num="col_num"
        :row-height="row_height"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :margin="margin"
        :use-css-transforms="true"
        :vertical-compact="false"
        :max-rows="row_num"
        class="box"
        :style="{height: `${row_height * row_num + (row_num + 1) * margin[1]}px`}"
    >
        <grid-item
            v-for="item in bg_layout"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :is-draggable="false"
            :is-resizable="false"
            class="back-grid-item"
        />

        <grid-item
            v-for="item in temp_layout"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :style="{background: item.background}"
            @dragover="allow_drop($event)"
        />
             
        <grid-item
            v-for="item in layout"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            class="grid-item d-flex align-center justify-center"
            :style="{background: item.background}"
        >
            {{ item.i }}
        </grid-item>
    </grid-layout>
</template>

<script setup> 
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { GridLayout, GridItem } from 'vue3-grid-layout-next';
    import { reactive, ref } from 'vue';

    const col_num = ref(5);
    const row_num = ref(4);
    const row_height = ref(150);
    const margin = ref([10, 20]);
    const layout = ref([]);
    const temp_layout = ref([]);
    const bg_layout = ref([
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 1, y: 0, w: 1, h: 1, i: "1" },
        { x: 2, y: 0, w: 1, h: 1, i: "2" },
        { x: 3, y: 0, w: 1, h: 1, i: "3" },
        { x: 4, y: 0, w: 1, h: 1, i: "4" },
 
        { x: 0, y: 1, w: 1, h: 1, i: "10" },
        { x: 1, y: 1, w: 1, h: 1, i: "11" },
        { x: 2, y: 1, w: 1, h: 1, i: "12" },
        { x: 3, y: 1, w: 1, h: 1, i: "13" },
        { x: 4, y: 1, w: 1, h: 1, i: "14" },
 
        { x: 0, y: 2, w: 1, h: 1, i: "20" },
        { x: 1, y: 2, w: 1, h: 1, i: "21" },
        { x: 2, y: 2, w: 1, h: 1, i: "22" },
        { x: 3, y: 2, w: 1, h: 1, i: "23" },
        { x: 4, y: 2, w: 1, h: 1, i: "24" },
 
        { x: 0, y: 3, w: 1, h: 1, i: "30" },
        { x: 1, y: 3, w: 1, h: 1, i: "31" },
        { x: 2, y: 3, w: 1, h: 1, i: "32" },
        { x: 3, y: 3, w: 1, h: 1, i: "33" },
        { x: 4, y: 3, w: 1, h: 1, i: "34" },
    ]);
    const first = ref(true);
    const draggable_items = ref([
        {
            w: 1,
            h: 1,
            width: 50,
            height: 50,
            background: '#62fd4d'
        }, {
            w: 2,
            h: 1,
            width: 100,
            height: 50,
            background: '#f7b631'
        }, {
            w: 1,
            h: 2,
            width: 50,
            height: 100,
            background: '#5efaff'
        }, {
            w: 2,
            h: 2,
            width: 100,
            height: 100,
            background: '#ffe020'
        }
    ]);

    const hex_to_rgba = (hex_color, alpha) => {
        hex_color = hex_color.replace(/^#/, '');

        if (hex_color.length === 3) {
            hex_color = hex_color.replace(/./g, '$&$&');
        }

        const red = parseInt(hex_color.slice(0, 2), 16);
        const green = parseInt(hex_color.slice(2, 4), 16);
        const blue = parseInt(hex_color.slice(4, 6), 16);

        return `rgb(${red}, ${green}, ${blue}, ${alpha})`;
    };


    const allow_drop = (e) => {
        e.preventDefault();
    };

    const get_new_position = (e, new_w, new_h) => {
        const width = (window.innerWidth - margin.value[0] * (col_num.value + 1)) / col_num.value;
        const height = row_height.value + margin.value[1];
        const rect = e.target.getBoundingClientRect();
        const m = 20; // ma-5

        let new_x = Math.ceil((e.offsetX + rect.x - m + margin.value[0]) / width) - 1;
        if (new_x < 0) new_x = 0;
        else if (new_x > col_num.value - new_w) new_x = col_num.value - new_w;

        let new_y = Math.ceil((e.offsetY - rect.height - m) / height) - 1;
        if (new_y < 0) new_y = 0;
        else if (new_y > row_num.value - new_h) new_y = row_num.value - new_h;

        return [new_x, new_y];
    };

    const handle_drag = (e, item) => {
        const [new_x, new_y] = get_new_position(e, item.w, item.h);

        if (first.value) {
            first.value = false;
            temp_layout.value.push({
                x: new_x,
                y: new_y,
                w: item.w,
                h: item.h,
                i: `new item(${e.x}, ${e.y})`,
                background: hex_to_rgba(item.background, 0.5)
            });
        } else {
            temp_layout.value.at(-1).x = new_x;
            temp_layout.value.at(-1).y = new_y;
        }
    };

    const handle_drag_end = (e, item) => {
        const [new_x, new_y] = get_new_position(e, item.w, item.h);

        layout.value.push({
            x: new_x,
            y: new_y,
            w: item.w,
            h: item.h,
            i: `new item(${e.x}, ${e.y})`,
            background: hex_to_rgba(item.background, 1)
        });
        temp_layout.value.pop();
        first.value = true;
    };

</script>

<style lang="scss" scoped>
    .box {
        background-color: #031e2c;
    }

    .back-grid-item {
        color: #fff;
        border: dashed #ccc 1px;
    }
    
    .droppable-element {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
</style>
