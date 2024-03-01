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
                        single-line flat hide-details variant="solo-filled" clearable />
                    <v-btn text="Add product" variant="outlined" :prepend-icon="mdiPlus" @click="openDialog('create')"
                        :disabled="pending" />
                </div>
            </v-card-title>

            <v-divider />

            <v-data-table v-if="!error" :items="products" :loading="pending" :headers="headers">
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
            <template v-else-if="error">
                An error has occurred, reload the page.
            </template>
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

                    <template v-if="operationType === 'create' || operationType === 'edit'">
                        <form>
                            <v-text-field v-model="state.title"
                                :error-messages="v$.title.$errors.map((e: any) => e.$message)" label="Product title"
                                class="mb-2" placeholder="Insert the title of the product" variant="outlined"
                                @input="v$.title.$touch" @blur="v$.title.$touch" required />
                            <v-text-field v-model="state.description"
                                :error-messages="v$.description.$errors.map((e: any) => e.$message)"
                                label="Product description" class="mb-2" placeholder="Insert the description of the product"
                                variant="outlined" @input="v$.description.$touch" @blur="v$.description.$touch" required />
                            <v-text-field v-model="state.discountPercentage" type="number"
                                :error-messages="v$.discountPercentage.$errors.map((e: any) => e.$message)"
                                label="Discount percentage" class="mb-2"
                                placeholder="Insert the discount percentage of the product" variant="outlined"
                                @input="v$.discountPercentage.$touch" @blur="v$.discountPercentage.$touch" required />
                            <v-text-field v-model="state.price" type="number"
                                :error-messages="v$.price.$errors.map((e: any) => e.$message)" label="Product price"
                                class="mb-2" placeholder="Insert the price of the product" variant="outlined"
                                @input="v$.price.$touch" @blur="v$.price.$touch" required />
                            <div class="d-flex flex-col justify-center align-center gap-3 mb-8">
                                <v-label text="Product rating" class="d-block" />
                                <v-rating v-model="state.rating" :item-labels="['1', '', '', '', '5']" hover size="large"
                                    :error-messages="v$.rating.$errors.map((e: any) => e.$message)" color="orange"
                                    label="Product rating" placeholder="Insert the rating of the product"
                                    @input="v$.rating.$touch" @blur="v$.rating.$touch" required />
                                <span class="text-red-darken-4">
                                    {{ v$.rating.$errors.length > 0 ? v$.rating.$errors.map((e: any) => e.$message).toString() : '' }}
                                </span>
                            </div>
                            <div class="d-flex flex-row justify-end">
                                <v-btn type="primary" color="success"
                                    :text="operationType === 'edit' ? 'Salva le modifiche' : 'Create the product'"
                                    @click="() => { operationType === 'edit' ? handleEditElement() : handleCreateElement() }"
                                    :prepend-icon="operationType === 'edit' ? mdiPencil : mdiPlus" :loading="loading" />
                            </div>
                        </form>
                    </template>

                    <template v-else-if="operationType === 'delete'">
                        <div class="product-title text-center mb-12">
                            <span>{{ product!.title }}</span>
                        </div>

                        <div class="d-flex flex-row gap-4 justify-center items-center">
                            <v-btn variant="outlined" text="Cancel" :prepend-icon="mdiClose" @click="dialog = false;" />
                            <v-btn color="error" text="Delete" :prepend-icon="mdiTrashCan" @click="handleDeleteElement()" :loading="loading" />
                        </div>
                    </template>
                </v-card-text>
            </v-card>

        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { helpers, minValue, maxValue, required } from '@vuelidate/validators';
import { mdiDelete, mdiMagnify, mdiPencil, mdiPlus, mdiClose, mdiTrashCan } from '@mdi/js';
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
        const searchQuery = (search.value !== '' && search.value !== null) ? `/search?q=${search.value}` : '';

        const response = await axios.get(`${runtimeConfig.public.apiBase}/products${searchQuery}`);
        return response.data.products;
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

const product = ref<Model | null>(null);
const loading = ref<boolean>(false);

const rules = {
    title: { required: helpers.withMessage("Title is required.", required) },
    description: { required: helpers.withMessage("Description is required.", required) },
    discountPercentage: {
        required: helpers.withMessage("Discount percentage is required.", required),
        minValue: helpers.withMessage("Discount percentage must be between 0 and 100.", minValue(0)),
        maxValue: helpers.withMessage("Discount percentage must be between 0 and 100.", maxValue(100))
    },
    price: { required: helpers.withMessage("Price is required.", required) },
    rating: {
        required: helpers.withMessage("Rating is required.", required),
        minValue: helpers.withMessage("Rating must be between 1 and 5.", minValue(1)),
        maxValue: helpers.withMessage("Rating must be between 1 and 5.", maxValue(5))
    }
};

const initialState = ref({
    title: '',
    description: '',
    discountPercentage: '',
    price: '',
    rating: 0
});

const state = ref({
    ...initialState.value,
});

watch(
    () => product.value,
    (newValue) => {
        state.value = {
            title: newValue?.title ?? '',
            description: newValue?.description ?? '',
            discountPercentage: (String(newValue?.discountPercentage)) ?? '',
            price: (String(newValue?.price)) ?? '',
            rating: newValue?.rating ?? 0
        }
    }
);

const v$ = useVuelidate(rules, state);

const resetFormState = () => {
    state.value = { ...initialState.value };
    v$.value.$reset();
};

const openDialog = (operation: Operation, productId: number | null = null) => {
    resetFormState();

    operationType.value = operation;
    dialog.value = true;

    if (productId) {
        product.value = products.value.find(p => p.id === productId) ?? null;
    } else {
        product.value = null;
    }
};

const handleCreateElement = () => {
    v$.value.$validate().then(async (res) => {
        if (res) {
            loading.value = true;
            loading.value = false;

            // TODO: Push new local item
            // TODO: API post
            // TODO: Snackbar succesfull

            dialog.value = false;
        }
    });
};

const handleEditElement = () => {
    v$.value.$validate().then(async (res) => {
        if (res) {
            loading.value = true;
            loading.value = false;

            // TODO: Edit local element
            // TODO: Api put
            // TODO: Snackbar succesfull

            dialog.value = false;
        }
    });
};

const handleDeleteElement = () => {
    // TODO: Api delete
    // TODO: Delete local element
    // TODO: Snackbar succesfull
    loading.value = true;
    loading.value = false;

    dialog.value = false;
};
</script>

<style lang="scss">
.data-table {
    .description {
        font-size: 24px;
    }
}

.product-title {
    font-size: 24px;
}
</style>