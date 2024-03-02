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
                    <v-chip color="secondary" size="small" variant="outlined">
                        {{ item.discountPercentage }} %
                    </v-chip>

                </template>

                <template v-slot:item.price="{ item }">
                    <v-chip color="green" size="small">
                        {{ item.price }} $
                    </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <div class="d-flex flex-row flex-wrap gap-1">
                        <v-btn :icon="mdiPencil" variant="text" class="text-secondary" size="small" rounded="0"
                            @click="openDialog('edit', item.id)" />
                        <v-btn :icon="mdiDelete" variant="text" class="text-secondary" size="small" rounded="0"
                            @click="openDialog('delete', item.id)" />
                    </div>
                </template>
            </v-data-table>

            <template v-else-if="error">
                An error has occurred, please reload the page.
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
                                label="Product description" class="mb-2"
                                placeholder="Insert the description of the product" variant="outlined"
                                @input="v$.description.$touch" @blur="v$.description.$touch" required />
                            <v-text-field v-model="state.discountPercentage" type="number" suffix="%"
                                :error-messages="v$.discountPercentage.$errors.map((e: any) => e.$message)"
                                label="Discount percentage" class="mb-2"
                                placeholder="Insert the discount percentage of the product" variant="outlined"
                                @input="v$.discountPercentage.$touch" @blur="v$.discountPercentage.$touch" required />
                            <v-text-field v-model="state.price" type="number" prefix="$"
                                :error-messages="v$.price.$errors.map((e: any) => e.$message)" label="Product price"
                                class="mb-2" placeholder="Insert the price of the product" variant="outlined"
                                @input="v$.price.$touch" @blur="v$.price.$touch" required />
                            <div class="d-flex flex-row justify-end gap-3 flex-wrap">
                                <v-btn text="Reset fields" @click="resetFormState" :prepend-icon="mdiRestore"
                                    :disabled="loading" />
                                <v-btn color="success"
                                    :text="operationType === 'edit' ? 'Salva le modifiche' : 'Insert product'"
                                    @click="() => { operationType === 'edit' ? handleEditElement() : handleCreateElement() }"
                                    :prepend-icon="operationType === 'edit' ? mdiPencil : mdiPlus" :loading="loading" />
                            </div>
                        </form>
                    </template>

                    <template v-else-if="operationType === 'delete'">
                        <div class="product-title text-center mb-12">
                            <span>{{ product!.title }}</span>
                        </div>

                        <div class="d-flex flex-row gap-4 justify-center items-center flex-wrap">
                            <v-btn variant="outlined" text="Cancel" :prepend-icon="mdiClose" @click="dialog = false;" />
                            <v-btn color="error" text="Delete" :prepend-icon="mdiTrashCan"
                                @click="handleDeleteElement()" :loading="loading" />
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
import { mdiDelete, mdiMagnify, mdiPencil, mdiPlus, mdiClose, mdiTrashCan, mdiRestore } from '@mdi/js';
import { useDebounceFn } from '@vueuse/core';
import { Snackbar, type Product } from '~/utils/types';
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
        const searchQuery = (search.value !== '' && search.value !== null) ? `/search?q=${search.value}` : '?limit=100';

        const response = await axios.get(`${runtimeConfig.public.apiBase}/products${searchQuery}`);
        return response.data.products;
    } catch (err) {
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'An error has occurred while retrieving the products.', type: Snackbar.ERROR });
        console.error('Error retrieving data:', err);
    }
}, { watch: [debouncedSearch] });

const products = computed<Array<Product>>(() => data.value ?? []);
const headers = ref([
    { title: 'ID', key: 'id' },
    { title: 'Title', key: 'title' },
    { title: 'Description', key: 'description' },
    { title: 'Discount percentage', key: 'discountPercentage' },
    { title: 'Price', key: 'price' },
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

const product = ref<Product | null>(null);
const loading = ref<boolean>(false);

const rules = {
    title: { required: helpers.withMessage("Title is required.", required) },
    description: { required: helpers.withMessage("Description is required.", required) },
    discountPercentage: {
        required: helpers.withMessage("Discount percentage is required.", required),
        minValue: helpers.withMessage("Discount percentage must be between 0 and 100.", minValue(0)),
        maxValue: helpers.withMessage("Discount percentage must be between 0 and 100.", maxValue(100))
    },
    price: {
        required: helpers.withMessage("Price is required.", required),
        minValue: helpers.withMessage("Price must be greater than 0.", minValue(0)),
    }
};

interface ProductFormState {
    title: string,
    description: string,
    discountPercentage?: number,
    price?: number
};

const initialState = ref<ProductFormState>({
    title: '',
    description: '',
    discountPercentage: undefined,
    price: undefined
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
            discountPercentage: newValue?.discountPercentage,
            price: newValue?.price
        }
    }
);

const v$ = useVuelidate<ProductFormState>(rules, state);

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

            try {
                const response = await axios.post(`${runtimeConfig.public.apiBase}/products/add`, state.value);
                data.value.unshift({ ...state.value, id: response.data.id });
                dialog.value = false;
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'Product created successfully.', type: Snackbar.SUCCESS });
            } catch (error) {
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'An error has occurred during the creation of the product.', type: Snackbar.ERROR });
                console.error('Error creating a new product:', error);
            } finally {
                loading.value = false;
            }
        }
    });
};

const handleEditElement = () => {
    v$.value.$validate().then(async (res) => {
        if (res) {
            loading.value = true;

            try {
                await axios.put(`${runtimeConfig.public.apiBase}/products/${product.value!.id}`, state.value);

                const index = data.value.findIndex((p: Product) => p.id === product.value!.id);
                data.value[index] = { ...state.value, id: product.value!.id };
                dialog.value = false;
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'Product edited successfully.', type: Snackbar.SUCCESS });
            } catch (error) {
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'An error has occurred while editing the product.', type: Snackbar.ERROR });
                console.error('Error modifying product:', error);
            } finally {
                loading.value = false;
            }
        }
    });
};

const handleDeleteElement = async () => {
    loading.value = true;

    try {
        await axios.delete(`${runtimeConfig.public.apiBase}/products/${product.value!.id}`);

        const index = data.value.findIndex((p: Product) => p.id === product.value!.id);
        data.value.splice(index, 1);
        dialog.value = false;
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'Product deleted successfully.', type: Snackbar.SUCCESS });
    } catch (error) {
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'An error has occurred while deleting the product.', type: Snackbar.ERROR });
        console.error('Error deleting product:', error);
    } finally {
        loading.value = false;
    }
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