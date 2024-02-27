<template>
    <header>
        <div class="container mx-auto d-flex items-center mt-10 justify-space-between">
            <span>Iliad Webapp</span>
            
            <Avatar v-if="store.isAuthenticated" />

            <!-- 
                TODO: Change locale
            -->
        </div>
    </header>
    <slot />

    <footer v-if="store.isAuthenticated">
        <div class="container mx-auto my-10 text-end">
            <span>Created by Giuseppe Del Campo</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
const store = useStore();
</script>