<template>
    <section class="homepage container mx-auto mt-20 mb-5">
        <h1 class="mb-12">
            This is a simple web application with a few features.
        </h1>

        <DataTable />
    </section>

    <DeliveryAddress/>
</template>

<script setup lang="ts">
const { t } = useI18n();

const seoMeta = computed(() => {
    return {
        title: `${t('seo.homepage.title')} - ${t('seo.brandName')}`,
        description: `${t('seo.homepage.description')} - ${t('seo.brandName')}`
    }
});

definePageMeta({
    layout: 'default',
    middleware: 'auth'
});

useSeoMeta({
    title: () => seoMeta.value.title,
    ogTitle: () => seoMeta.value.title,
    description: () => seoMeta.value.description,
    ogDescription: () => seoMeta.value.description,
    ogImage: '/preview.png',
    twitterCard: 'summary_large_image',
});
</script>