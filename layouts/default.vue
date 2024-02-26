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
</template>

<script setup lang="ts">
const store = useStore();
</script>