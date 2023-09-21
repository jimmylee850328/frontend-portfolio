<template>
    <div
        ref="target"
        class="target"
    />
</template>

<script setup>
    import { onMounted, ref, onBeforeUnmount } from "vue";
    const observer = ref();
    const target = ref();
    const emit = defineEmits(['intersect'])

    onMounted(() => {
        observer.value = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                emit("intersect");
            }
        });
        observer.value.observe(target.value);
    });

    onBeforeUnmount(() => {
        observer.value.disconnect();
    });
</script>