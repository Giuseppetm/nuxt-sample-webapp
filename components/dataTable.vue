<template>
    <div class="data-table">
        <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
                <v-spacer />

                <div class="d-flex flex-row flex-wrap justify-end gap-3 md:gap-4 w-full md:max-w-screen-md">
                    <v-text-field v-model="search" :prepend-inner-icon="mdiMagnify" density="compact"
                        :label="t('homepage.dataTable.search')" single-line flat hide-details variant="solo-filled"
                        style="min-width:200px;" clearable />
                    <v-btn :text="t('homepage.dataTable.addProduct')" variant="outlined" :prepend-icon="mdiPlus"
                        @click="openDialog('create')" :disabled="pending" />
                </div>
            </v-card-title>

            <v-divider />

            <v-data-table v-if="!error" :items="products" :loading="pending" :headers="headers"
                :items-per-page-text="t('homepage.dataTable.itemsPerPage')">
                <template v-slot:no-data>
                    <span>{{ t('homepage.dataTable.noDataAvailable') }}</span>
                </template>

                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@3" />
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
                <span class="text-error">{{ t('homepage.dataTable.error') }}</span>
            </template>
        </v-card>

        <v-dialog v-model="dialog" max-width="700">
            <v-card>
                <v-card-title class="d-flex justify-end">
                    <v-btn :icon="mdiClose" variant="text" @click="dialog = false" />
                </v-card-title>

                <v-card-text class="pb-10 pt-5">
                    <div class="mb-10 text-center">
                        <h2 class="mb-2">
                            {{ formTitle }}
                        </h2>
                        <span v-if="operationType !== 'delete'">
                            {{ formDescription }}
                        </span>
                    </div>

                    <template v-if="operationType === 'create' || operationType === 'edit'">
                        <form>
                            <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-1 md:gap-3">
                                <v-text-field v-model="state.title"
                                    :error-messages="v$.title.$errors.map((e: any) => e.$message)"
                                    :label="t('homepage.dataTable.dialog.form.title.value')" class="mb-2"
                                    :placeholder="t('homepage.dataTable.dialog.form.title.placeholder')"
                                    variant="outlined" @input="v$.title.$touch" @blur="v$.title.$touch" required />
                                <v-text-field v-model="state.description"
                                    :error-messages="v$.description.$errors.map((e: any) => e.$message)"
                                    :label="t('homepage.dataTable.dialog.form.description.value')" class="mb-2"
                                    :placeholder="t('homepage.dataTable.dialog.form.description.placeholder')"
                                    variant="outlined" @input="v$.description.$touch" @blur="v$.description.$touch"
                                    required />
                            </div>
                            <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-1 md:gap-3 mb-6">
                                <v-text-field v-model="state.discountPercentage" type="number" suffix="%"
                                    :error-messages="v$.discountPercentage.$errors.map((e: any) => e.$message)"
                                    :label="t('homepage.dataTable.dialog.form.discountPercentage.value')" class="mb-2"
                                    :placeholder="t('homepage.dataTable.dialog.form.discountPercentage.placeholder')"
                                    variant="outlined" @input="v$.discountPercentage.$touch"
                                    @blur="v$.discountPercentage.$touch" required />
                                <v-text-field v-model="state.price" type="number" prefix="$"
                                    :error-messages="v$.price.$errors.map((e: any) => e.$message)"
                                    :label="t('homepage.dataTable.dialog.form.price.value')" class="mb-2"
                                    :placeholder="t('homepage.dataTable.dialog.form.price.placeholder')"
                                    variant="outlined" @input="v$.price.$touch" @blur="v$.price.$touch" required />
                            </div>
                            <div class="d-flex flex-row justify-end gap-3 flex-wrap">
                                <v-btn :text="t('homepage.dataTable.dialog.resetFields') " @click="resetFormState"
                                    :prepend-icon="mdiRestore" :disabled="loading" />
                                <v-btn color="primary"
                                    :text="operationType === 'edit' ? t('homepage.dataTable.dialog.edit.button') : t('homepage.dataTable.dialog.create.button') "
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
                            <v-btn variant="outlined" :text="t('homepage.dataTable.dialog.delete.button.cancel')"
                                :prepend-icon="mdiClose" @click="dialog = false;" />
                            <v-btn color="error" :text="t('homepage.dataTable.dialog.delete.button.delete')"
                                :prepend-icon="mdiTrashCan" @click="handleDeleteElement()" :loading="loading" />
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

const { t } = useI18n();
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
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.products.retrieve'), type: Snackbar.ERROR });
        console.error('Error retrieving data:', err);
    }
}, { watch: [debouncedSearch] });

const products = computed<Array<Product>>(() => data.value ?? []);
const headers = computed(() => [
    { title: t('homepage.dataTable.headers.id'), key: 'id' },
    { title: t('homepage.dataTable.headers.title'), key: 'title' },
    { title: t('homepage.dataTable.headers.description'), key: 'description' },
    { title: t('homepage.dataTable.headers.discountPercentage'), key: 'discountPercentage' },
    { title: t('homepage.dataTable.headers.price'), key: 'price' },
    { title: t('homepage.dataTable.headers.actions'), key: 'actions', sortable: false },
]);

type Operation = 'create' | 'edit' | 'delete';

const dialog = ref<boolean>(false);
const operationType = ref<Operation>();
const formTitle = computed<string>(
    () => operationType.value === 'create'
        ? t('homepage.dataTable.dialog.create.title')
        : operationType.value === 'edit'
            ? t('homepage.dataTable.dialog.edit.title')
            : t('homepage.dataTable.dialog.delete.title')
);
const formDescription = computed<string>(
    () => operationType.value === 'create'
        ? t('homepage.dataTable.dialog.create.description')
        : t('homepage.dataTable.dialog.edit.description')
);

const product = ref<Product | null>(null);
const loading = ref<boolean>(false);

const rules = {
    title: { required: helpers.withMessage(t('homepage.dataTable.dialog.form.title.required'), required) },
    description: { required: helpers.withMessage(t('homepage.dataTable.dialog.form.description.required'), required) },
    discountPercentage: {
        required: helpers.withMessage(t('homepage.dataTable.dialog.form.discountPercentage.required'), required),
        minValue: helpers.withMessage(t('homepage.dataTable.dialog.form.discountPercentage.valid'), minValue(0)),
        maxValue: helpers.withMessage(t('homepage.dataTable.dialog.form.discountPercentage.valid'), maxValue(100))
    },
    price: {
        required: helpers.withMessage(t('homepage.dataTable.dialog.form.price.required'), required),
        minValue: helpers.withMessage(t('homepage.dataTable.dialog.form.price.valid'), minValue(0)),
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
        let productWithoutId = { ...product.value };
        delete productWithoutId.id;
        state.value = { ...(productWithoutId as ProductFormState) };
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
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.products.create'), type: Snackbar.SUCCESS });
            } catch (error) {
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.products.create'), type: Snackbar.ERROR });
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
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.products.edit'), type: Snackbar.SUCCESS });
            } catch (error) {
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.products.edit'), type: Snackbar.ERROR });
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
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.products.delete'), type: Snackbar.SUCCESS });
    } catch (error) {
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.products.delete'), type: Snackbar.ERROR });
        console.error('Error deleting product:', error);
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss">
.product-title {
    font-size: 24px;
}
</style>