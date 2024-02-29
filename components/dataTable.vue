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
                    <v-text-field v-model="search" :prepend-inner-icon="mdiMagnify" density="compact" label="Search"
                        single-line flat hide-details variant="solo-filled" />
                    <v-btn text="Add product" variant="outlined" :prepend-icon="mdiPlus" @click="openDialog('create')" />
                </div>
            </v-card-title>

            <v-divider />

            <v-data-table :items="products" :loading="pending" :headers="headers">
                <template v-slot:no-data>
                    <span>No data available</span>
                </template>

                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@3"></v-skeleton-loader>
                </template>

                <template v-slot:item.id="{ item }">
                    <v-chip class="ma-2" label>
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
                    <v-spacer />
                    <v-btn :icon="mdiPencil" variant="text" class="text-secondary" size="small" rounded="0"
                        @click="openDialog('edit', item.id)" />
                    <v-btn :icon="mdiDelete" variant="text" class="text-secondary" size="small" rounded="0"
                        @click="openDialog('delete', item.id)" />
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title class="d-flex justify-end">
                    <v-btn :icon="mdiClose" variant="text" @click="dialog = false" />
                </v-card-title>

                <v-card-text class="pb-10 pt-5">
                    <div class="mb-10 text-center">
                        <h2 class="mb-2">
                            {{ formTitle }}
                        </h2>
                    </div>

                    <template v-if="operationType === 'create'">
                    </template>

                    <template v-else-if="operationType === 'edit'">
                        {{ product!.id }}
                    </template>

                    <template v-else-if="operationType === 'delete'">
                        {{ product!.id }}
                    </template>
                </v-card-text>
            </v-card>

        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { mdiDelete, mdiMagnify, mdiPencil, mdiPlus, mdiClose } from '@mdi/js';
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
        // TODO: Show snackbar error
        console.error('Errore durante il recupero dei dati:', err);
    }
}, { watch: [debouncedSearch] });

const products = computed<Array<Model>>(() => data.value ?? []);
const headers = ref([
    { title: 'ID', key: 'id' },
    { title: 'Title', key: 'title' },
    { title: 'Description', key: 'description' },
    { title: 'Discount percentage', key: 'discountPercentage' },
    { title: 'Price', key: 'price' },
    { title: 'Rating', key: 'rating' },
    { title: 'Actions', key: 'actions', sortable: false },
]);

type Operation = 'create' | 'edit' | 'delete';

const dialog = ref<boolean>(false);
const operationType = ref<Operation>();
const formTitle = computed<string>(
    () => operationType.value === 'create' 
        ? 'Insert a new product' 
        : operationType.value === 'edit' 
            ? 'Edit this product' 
            : 'Are you sure you want to delete this product?'
);

// Stored model to handle edit/delete
const product = ref<Model | null>(null);

const openDialog = (operation: Operation, productId: number | null = null) => {
    operationType.value = operation;
    dialog.value = true;

    if (productId) product.value = products.value.find(p => p.id === productId) ?? null;
};

const handleCreateElement = () => {
};

const handleEditElement = () => {
};

const handleDeleteElement = () => {
};
</script>

<style lang="scss">
.data-table {
    .description {
        font-size: 24px;
    }
}
</style>