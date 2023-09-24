<template>
    <v-container>
        <exercise-title title="Use JSZip to download selected images as zip" />

        <v-row>
            <v-col
                v-for="(n, index) in 9"
                :key="n"
                class="d-flex"
                cols="4"
            >
                <div style="position: relative;">
                    <v-checkbox
                        v-model="all_images[index].selected"
                        true-icon="mdi-check-circle"
                        false-icon="mdi-check-circle-outline"
                        class="custom-checkbox"
                        @click="toggle_selection(index)"
                    />
                </div>

                <v-img
                    :src="all_images[index].src"
                    :lazy-src="all_images[index].lasy_src"
                    aspect-ratio="1"
                    cover
                    class="bg-grey-lighten-2"
                    :class="{'selected-image': all_images[index].selected}"
                    @click="toggle_selection(index)"
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
            </v-col>
        </v-row>
            
        <v-icon
            class="download-btn"
            size="x-large"
            @click="download_selected_images"
        >
            mdi-file-download
        </v-icon>
    </v-container>

    <v-dialog
        v-model="loading_dialog"
        :scrim="false"
        persistent
        width="auto"
    >
        <v-card theme="dark">
            <v-card-text>
                Please wait. Your file is preparing for download.
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="my-2"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { ref } from 'vue';
    import JSZip from 'jszip';

    // variables
    const loading_dialog = ref(false);
    const all_images = ref([...Array(10).keys()].map((x, i) => ({
        src: `https://picsum.photos/500/300?image=${(i + 1) * 8 + 10}`,
        lasy_src: `https://picsum.photos/10/6?image=${(i + 1) * 8 + 10}`,
        name: `${i}.png`,
        selected: false
    })));

    // functions
    const toggle_selection = (index) => {
        all_images.value[index].selected = !all_images.value[index].selected;
    };

    const download_selected_images = async () => {
        loading_dialog.value = true;
        
        const zip = new JSZip();
        // put image into zip file
        for (const image of all_images.value) {
            if (image.selected) {
                const response = await fetch(image.src);
                const blob = await response.blob();
  
                zip.file(image.name, blob);
            }
        }

        // download images.zip
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const blob_url = URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = blob_url;
            link.download = 'images.zip';
            link.click();
            loading_dialog.value = false;
        });
    };
</script>

<style lang="scss" scoped>
    :deep(.custom-checkbox) {
        z-index: 2;
        position: absolute;

        .v-icon {
            font-size: 30px;
        }
    }

    .download-btn {
        position: fixed;
        right: 20px;
        top: 20px;
    }

    .selected-image::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
