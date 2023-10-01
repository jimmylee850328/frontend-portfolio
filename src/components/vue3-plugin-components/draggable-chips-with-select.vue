<template>
    <exercise-title 
        title="Draggable chips with v-select" 
        subtitle="v-select counts all chips in the all zones."
    />

    <v-card class="mt-5">
        <v-card-title>
            People Filter
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <v-card flat>
                        <v-card-text>
                            <div>
                                <v-autocomplete
                                    :model-value="[...selected_people, ...include_list, ...exclude_list]"
                                    :items="people_list"
                                    prepend-icon="mdi-account-multiple-outline"
                                    multiple
                                    outlined
                                    return-object
                                    item-title="name"
                                    @update:modelValue="handle_selected_people"
                                >
                                    <template #selection="{ item, index }">
                                        <h4 v-if="index == 0">
                                            已新增 {{ [...selected_people, ...include_list, ...exclude_list].length }} 個
                                        </h4>
                                    </template>
                                </v-autocomplete>

                                <draggable 
                                    v-model="selected_people"
                                    item-key="id"
                                    class="pa-1"
                                    style="border: 1px solid #000; min-height: 150px;"
                                    group="people"
                                >
                                    <template #item="{ element, index }">
                                        <v-chip 
                                            class="mr-1 mb-1"
                                            color="primary"
                                        >
                                            {{ element.name }}
                                        </v-chip>
                                    </template>
                                </draggable>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card flat>
                        <v-card-title class="py-0">
                            Include Zone
                        </v-card-title>

                        <v-card-text>
                            <draggable 
                                v-model="include_list"
                                item-key="id"
                                class="pa-1"
                                style="border: 1px solid #000; min-height: 150px;"
                                group="people"
                                :draggable="false"
                            >
                                <template #item="{ element, index }">
                                    <v-chip 
                                        color="primary"
                                        class="mr-1 mb-1"
                                        closable
                                        @click:close="remove_selected_people(include_list, element, index)"
                                    >
                                        {{ element.name }}
                                    </v-chip>
                                </template>
                            </draggable>
                        </v-card-text>
                    </v-card>

                    <v-card flat>
                        <v-card-title class="py-0">
                            Exclude Zone
                        </v-card-title>

                        <v-card-text>
                            <draggable 
                                v-model="exclude_list"
                                item-key="id"
                                class="pa-1"
                                style="border: 1px solid #000; min-height: 150px;"
                                group="people"
                                :draggable="false"
                            >
                                <template #item="{ element, index }">
                                    <v-chip 
                                        color="primary"
                                        class="mr-1 mb-1"
                                        closable
                                        @click:close="remove_selected_people(exclude_list, element, index)"
                                    >
                                        {{ element.name }}
                                    </v-chip>
                                </template>
                            </draggable>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import draggable from "vuedraggable";
    import { reactive, ref } from 'vue';

    const people_list = ref([
        { id: 0, name: "jimmy", age: 27 },
        { id: 1, name: "tien", age: 27 },
        { id: 2, name: "roy", age: 27 },
        { id: 3, name: "duke", age: 27 },
        { id: 4, name: "maureen", age: 29 },
        { id: 5, name: "traingo", age: 27 },
        { id: 6, name: "qmole", age: 39 },
        { id: 7, name: "shu", age: 29 },
        { id: 8, name: "76", age: 29 },
    ]);
    const selected_people = ref([]);
    const last_selected_people = ref([]);
    const include_list = ref([]);
    const exclude_list = ref([]);

    const handle_selected_people = (people_list) => {
        let temp_people_list = [...last_selected_people.value, ...people_list].filter((item, index, self) => self.findIndex(obj => obj.id === item.id) === self.findLastIndex(obj => obj.id === item.id))[0];
        last_selected_people.value = people_list;

        let selected_people_index = selected_people.value.findIndex(x => x.id == temp_people_list.id);
        let include_zone_index = include_list.value.findIndex(x => x.id == temp_people_list.id);
        let exclude_zone_index = exclude_list.value.findIndex(x => x.id == temp_people_list.id);

        if (selected_people_index >= 0) {
            selected_people.value.splice(selected_people_index, 1);
        } else if (include_zone_index >= 0) {
            include_list.value.splice(include_zone_index, 1);
        } else if (exclude_zone_index >= 0) {
            exclude_list.value.splice(exclude_zone_index, 1);
        } else {
            selected_people.value.push(temp_people_list);
        }
    };

    const remove_selected_people = (list, item, index) => {
        selected_people.value.push(item);
        list.splice(index, 1);
    };
</script>