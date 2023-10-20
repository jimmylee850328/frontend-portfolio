<script setup>
</script>

<template>
    <v-app>
        <div>
            <router-view />
        </div>
        <v-btn
            class="text-none github-button"
            size="small"
            @click="view_on_github"
        > 
            <v-icon class="pr-2">
                mdi-github
            </v-icon>
            View on Github
        </v-btn>
    </v-app>
</template>

<script setup>
    const view_on_github = () => {
        open("https://github.com/jimmylee850328/frontend-portfolio/", "_blank");
    };
</script>

<style scoped>
    .github-button {
        position: fixed;
        bottom: 5px;
        right: 5px;
    }
</style>
