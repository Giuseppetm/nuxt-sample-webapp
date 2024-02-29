<template>
    <header>
        <div class="container mx-auto d-flex items-center mt-10 justify-space-between">
            <span>Iliad Webapp</span>

            <div class="d-flex flex-row gap-3">
                <div class="locale-select">
                    <v-select
                        v-model="locale"
                        :items="languages" 
                        density="compact"
                        variant="outlined"
                        :label="$t('language')"
                        item-value="value"
                        item-title="label"
                        style="margin-top: 6px;"
                    />
                </div>
                <Avatar v-if="store.isAuthenticated" />
            </div>
        </div>
    </header>
    <slot />

    <footer>
        <div :class="{'container mx-auto my-10': true, 'text-end': store.isAuthenticated }">
            <span>Developed by <b>Giuseppe Del Campo</b></span>
        </div>
    </footer>
</template>

<script setup lang="ts">
const store = useStore();

const { locale, t } = useI18n();

const languages = computed(() => [
    { value: 'it', label: t('italian') },
    { value: 'en', label: t('english') }
]);
</script>