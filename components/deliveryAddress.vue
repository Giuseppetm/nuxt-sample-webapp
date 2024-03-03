<template>
  <v-dialog v-model="dialog" max-width="700">
    <v-card>
      <v-card-title class="d-flex justify-end">
        <v-btn :icon="mdiClose" variant="text" @click="dialog = false"></v-btn>
      </v-card-title>

      <v-card-text class="pb-10 pt-5">
        <div class="mb-10 text-center">
          <h2 class="mb-2">
            {{ t('header.deliveryAddress.title') }}
          </h2>
          <span v-if="!store.deliveryAddress">
            {{ t('header.deliveryAddress.description.new') }}
          </span>
          <span v-if="editMode">
            {{ t('header.deliveryAddress.description.edit') }}
          </span>
        </div>

        <div v-if="!store.deliveryAddress || editMode">
          <form class="max-w-screen-xs m-auto">
            <v-text-field v-model="state.city" class="mb-1 md:mb-2"
              :error-messages="v$.city.$errors.map((e: any) => e.$message)"
              :label="t('header.deliveryAddress.form.city.value')"
              :placeholder="t('header.deliveryAddress.form.city.placeholder')" variant="outlined"
              @input="v$.city.$touch" @blur="v$.city.$touch" required />
            <v-text-field v-model="state.postalCode" type="number"
              :error-messages="v$.postalCode.$errors.map((e: any) => e.$message)"
              :label="t('header.deliveryAddress.form.postalCode.value')" class="mb-1 md:mb-2"
              :placeholder="t('header.deliveryAddress.form.postalCode.placeholder')" variant="outlined"
              @input="v$.postalCode.$touch" @blur="v$.postalCode.$touch" required />
            <v-text-field v-model="state.address" :error-messages="v$.address.$errors.map((e: any) => e.$message)"
              class="mb-1 md:mb-2" :label="t('header.deliveryAddress.form.address.value')"
              :placeholder="t('header.deliveryAddress.form.address.placeholder')" variant="outlined"
              @input="v$.address.$touch" @blur="v$.address.$touch" required />
            <v-textarea v-model="state.note" :label="t('header.deliveryAddress.form.note.value')"
              :placeholder="t('header.deliveryAddress.form.note.placeholder')" variant="outlined"
              @input="v$.note.$touch" @blur="v$.note.$touch" required />
            <div class="d-flex justify-end">
              <v-btn :prepend-icon="mdiCheck" color="primary" :text="t('header.deliveryAddress.saveButton')"
                @click="handleSave" :loading="loading" />
            </div>
          </form>
        </div>
        <div v-else class="md:grid md:grid-cols-6 max-w-screen-xs m-auto">
          <v-list lines="two" class="md:col-span-3 col-span-6">
            <v-list-item :title="state.city">
              <template v-slot:prepend>
                <v-avatar color="orange">
                  <v-icon color="white" :icon="mdiHome" />
                </v-avatar>
              </template>

              <template v-slot:subtitle>
                {{ state.address }}
                <template v-if="state.note">- {{ state.note }}</template>
              </template>
            </v-list-item>
          </v-list>
          <div class="md:col-span-3 col-span-6 d-flex align-center justify-end">
            <v-btn :prepend-icon="mdiPencil" :text="t('header.deliveryAddress.editButton')" color="primary"
              @click="handleEdit" />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiCheck, mdiClose, mdiHome, mdiPencil } from '@mdi/js';
import { useVuelidate } from '@vuelidate/core';
import { helpers, minValue, required } from '@vuelidate/validators';
import axios from 'axios';

const { t } = useI18n();
const store = useStore();
const runtimeConfig = useRuntimeConfig();

interface AddressFormState {
  address: string,
  city: string,
  postalCode?: number,
  note: string
};

const rules = {
  city: { required: helpers.withMessage(t('header.deliveryAddress.form.city.required'), required) },
  address: { required: helpers.withMessage(t('header.deliveryAddress.form.address.required'), required) },
  postalCode: {
    required: helpers.withMessage(t('header.deliveryAddress.form.postalCode.required'), required),
    minValue: helpers.withMessage(t('header.deliveryAddress.form.postalCode.valid'), minValue(0)),
  },
  note: { required: false }
};

const initialState: AddressFormState = {
  city: store.deliveryAddress?.city ?? '',
  address: store.deliveryAddress?.address ?? '',
  postalCode: store.deliveryAddress?.postalCode,
  note: store.deliveryAddress?.note ?? '',
};

const state = reactive<AddressFormState>({
  ...initialState,
});

const v$ = useVuelidate<AddressFormState>(rules, state);

const dialog = ref(false);
const loading = ref(false);
const editMode = ref(false);

watch(
  () => dialog.value,
  (newValue) => {
    if (!newValue)
      setTimeout(() => { editMode.value = false; }, 500);
  }
);

const handleSave = () => {
  v$.value.$validate().then(async (res) => {
    if (res) {
      loading.value = true;

      try {
        await axios.put(`${runtimeConfig.public.apiBase}/users/${store.user!.id}`, state);

        if (editMode) editMode.value = false;
        store.setDeliveryAddress(state as Address);
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.deliveryAddress.edit'), type: Snackbar.SUCCESS });
      } catch (error) {
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.deliveryAddress.edit'), type: Snackbar.ERROR });
        console.error('Error modifying delivery address:', error);
      } finally {
        loading.value = false;
      }
    }
  });
};

const handleEdit = () => {
  editMode.value = true;
};

emitter.on(EventType.OPEN_DELIVERY_ADDRESS, () => {
  dialog.value = true;
});
</script>