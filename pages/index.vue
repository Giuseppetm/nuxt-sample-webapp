<template>
    <section class="homepage container mx-auto mt-10 md:mt-20 mb-5">
        <div class="mb-12">
            <h1>
                {{ t('homepage.title') }}
            </h1>
        </div>

        <div class="mb-12">
            <span class="description">
                {{ t('homepage.description') }}
            </span>
        </div>

        <DataTable />
    </section>

    <DeliveryAddress />
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

<style lang="scss" scoped>
.description {
    font-size: 24px;
}
</style>