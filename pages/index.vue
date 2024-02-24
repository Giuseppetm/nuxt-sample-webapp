<template>
    <section class="homepage container mx-auto my-20">
        <h1>
            This is a simple web application with a few behaviours.
        </h1>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default',
    middleware: 'auth'
});
</script>

<style lang="scss">
</style>