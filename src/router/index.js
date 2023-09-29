import { createRouter, createWebHashHistory } from "vue-router";
import Main from "@/components/main.vue";
import InfiniteScroll from "@/components/infinite-scroll/main.vue";
import DraggableChipsWithSelect from "@/components/vue3-plugin-components/draggable-chips-with-select.vue";
import ImagesDownloader from "@/components/vue3-plugin-components/image-downloader.vue";
import GridLayout from "@/components/vue3-plugin-components/grid-layout.vue";
import FlexVerticalTable from "@/components/css-practice/flex-vertical-table.vue";
import FlexEcharts from "@/components/css-practice/flex-echarts.vue";

const router = createRouter({
    history: createWebHashHistory("/frontend-portfolio/"),
    routes: [
        {
            path: "/",
            name: "Main",
            component: Main,
        },
        {
            path: "/infinite-scroll",
            name: "infinite-scroll",
            component: InfiniteScroll,
        },
        {
            path: "/draggable-chips-with-select",
            name: "draggable-chips-with-select",
            component: DraggableChipsWithSelect,
        },
        {
            path: "/images-downloader",
            name: "images-downloader",
            component: ImagesDownloader,
        },
        {
            path: "/grid-layout",
            name: "grid-layout",
            component: GridLayout,
        },
        {
            path: "/flex-vertical-table",
            name: "flex-vertical-table",
            component: FlexVerticalTable,
        },
        {
            path: "/flex-echarts",
            name: "flex-echarts",
            component: FlexEcharts,
        },
    ],
});

export default router;
