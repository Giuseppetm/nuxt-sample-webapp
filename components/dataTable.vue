<template>
    <div class="data-table">
        <div class="mb-12">
            <span class="description">
                Down below there is a table of products that allows you to perform CRUD operations.
            </span>
        </div>

        <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
                <v-spacer />

                <div class="d-flex w-full md:max-w-screen-md flex-row gap-4">
                    <v-text-field v-model="search" :prepend-inner-icon="mdiMagnify" density="compact" label="Search" single-line
                        flat hide-details variant="solo-filled" />
                    <v-btn text="Add product" variant="outlined" :prepend-icon="mdiPlus" />
                </div>
            </v-card-title>

            <v-divider />

            <v-data-table :items="items" :loading="pending">
                <template v-slot:no-data>
                    <span>No data available</span>
                </template>

                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@3"></v-skeleton-loader>
                </template>

                <template v-slot:item.id="{ item }">
                    <v-chip
                        class="ma-2"
                        label
                    >
                        {{ item.id }}
                    </v-chip>
                </template>


                <template v-slot:item.description="{ item }">
                    <div class="max-w-80 py-2">
                        {{ item.description }}
                    </div>
                </template>

                <template v-slot:item.discountPercentage="{ item }">
                    <v-chip size="small">
                        {{ item.discountPercentage }} %
                    </v-chip>
                    
                </template>

                <template v-slot:item.price="{ item }">
                    <v-chip color="green">
                        {{ item.price }} $
                    </v-chip>
                </template>

                <template v-slot:item.rating="{ item }">
                    <v-rating :model-value="item.rating" color="orange-darken-2" density="compact" size="small" readonly />
                </template>

                <template v-slot:item.actions="{ item }">
                    Dennis {{ item.id }}
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiPlus } from '@mdi/js';
import { useDebounceFn } from '@vueuse/core';
import type { Model } from '~/utils/types';
import axios from 'axios';

const runtimeConfig = useRuntimeConfig();

const search = ref<string>('');
const debouncedSearch = ref<string>('');
const debounceTime = 500;

const debouncedSearchHandler = useDebounceFn((value: string) => {
    debouncedSearch.value = value;
}, debounceTime);

watch(search, (newValue) => {
    debouncedSearchHandler(newValue);
});

const { data, pending, error } = useAsyncData('products', async () => {
    try {
        const response = await axios.get(`${runtimeConfig.public.apiBase}/products${search.value && `/search?q=${search.value}`}`);
        return response.data.products.map((p: any) => {
            return {
                id: p.id,
                title: p.title,
                description: p.description,
                discountPercentage: p.discountPercentage,
                price: p.price,
                rating: p.rating
            }
        });
    } catch (err) {
        // TODO: Error snackbar
        console.error('Errore durante il recupero dei dati:', err);
    }
}, { watch: [debouncedSearch] });

const items = computed<Array<Model>>(() => data.value);

const operationType = ref<'create' | 'edit' | 'delete'>();

const handleCreateElement = () => {
    operationType.value = 'create';
};

const handleEditElement = (productId: number) => {
    operationType.value = 'edit';
};

const handleDeleteElement = (productId: number) => {
    operationType.value = 'delete';
};
</script>

<style lang="scss">
.data-table {
    .description {
        font-size: 24px;
    }
}
</style>