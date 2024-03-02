<template>
    <header>
        <div class="container mx-auto d-flex items-start mt-10 justify-space-between">
            <div class="mt-3"><span>{{ t('seo.brandName') }}</span></div>

            <div class="d-flex flex-row gap-3">
                <div class="locale-select">
                    <v-select v-model="locale" :items="languages" density="compact" variant="outlined"
                        :label="$t('localization.language')" item-value="value" item-title="label"
                        style="margin-top: 6px;" />
                </div>
                <Avatar v-if="store.isAuthenticated" />
            </div>
        </div>
    </header>
    <slot />

    <footer>
        <div :class="{'container mx-auto my-10': true, 'text-end': store.isAuthenticated }">
            <span class="text-secondary">Developed by <b>Giuseppe Del Campo</b></span>
        </div>
    </footer>
</template>

<script setup lang="ts">
const store = useStore();

const { locale, t } = useI18n();

const languages = computed(() => [
    { value: 'it', label: t('localization.italian') },
    { value: 'en', label: t('localization.english') }
]);
</script>