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

            <v-data-table :items="items" :loading="loading">
                <template v-slot:no-data>
                    <span v-if="!loading">No data available</span>
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
                    <v-rating :model-value="item.rating" color="orange-darken-2" density="compact" size="small"
                        readonly />
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiPlus } from '@mdi/js';
import type { Model } from '~/utils/models';
import axios from 'axios';

const runtimeConfig = useRuntimeConfig();

const items = ref<Array<Model>>([]);
const search = ref<string>('');
const loading = ref<boolean>(false);

const handleCreateElement = () => {
};

const handleEditElement = (productId: number) => {
};

const handleDeleteElement = (productId: number) => {
};

const handleSearch = () => {
    // TODO: Search with debouncing
};

onMounted(async() => {
    loading.value = true;

    try {
        const response = await axios.get(`${runtimeConfig.public.apiBase}/products`);

        items.value = response.data.products.map((p: any) => { return {
            id: p.id,
            title: p.title,
            description: p.description,
            discountPercentage: p.discountPercentage,
            price: p.price,
            rating: p.rating
        }});
    } catch (error) {
        // TODO: Snackbar
        console.error(error);
    } finally {
        loading.value = false;
    }
});
</script>

<style lang="scss">
.data-table {
    .description {
        font-size: 24px;
    }
}
</style>