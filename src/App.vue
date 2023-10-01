<script setup>
</script>

<template>
    <v-app>
        <div>
            <router-view />
        </div>
        <v-footer
            app
            class="bg-transparent d-flex justify-end mb-2"
        >
            <v-btn
                class="text-none"
                size="small"
                @click="view_on_github"
            > 
                <v-icon class="pr-2">
                    mdi-github
                </v-icon>
                View on Github
            </v-btn>
        </v-footer>
    </v-app>
</template>

<script setup>
    const view_on_github = () => {
        open("https://github.com/jimmylee850328/frontend-portfolio/", "_blank");
    };
</script>

<style scoped>
</style>
