<template>
    <section class="homepage container mx-auto my-20">
        <h1 class="mb-12">
            This is a simple web application with a few features.
        </h1>

        <DataTable />
    </section>

    <DeliveryAddress/>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default',
    middleware: 'auth'
});
</script>

<style lang="scss">
</style>