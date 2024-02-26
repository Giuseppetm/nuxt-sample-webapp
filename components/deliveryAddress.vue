<template>
  <v-dialog v-model="dialog" max-width="700">
    <v-card>
      <v-card-title class="d-flex justify-end">
        <v-btn
          :icon="mdiClose"
          variant="text"
          @click="dialog = false"
        ></v-btn>
      </v-card-title>

      <v-card-text class="pb-10 pt-5">
        <div class="mb-10 text-center">
          <h2 class="mb-2">
            Manage your delivery address
          </h2>
          <span>
            You have not inserted a delivery address yet, compile the form below.
          </span>
        </div>

        <div v-if="!store.deliveryAddress">
          <form class="max-w-screen-xs m-auto">
            <v-text-field v-model="state.city" :error-messages="v$.city.$errors.map((e: any) => e.$message)" label="City"
              placeholder="Insert your city" variant="outlined" @input="v$.city.$touch" @blur="v$.city.$touch" required />
            <v-text-field v-model="state.address" :error-messages="v$.address.$errors.map((e: any) => e.$message)"
              label="Address" placeholder="Insert your address" variant="outlined" @input="v$.address.$touch"
              @blur="v$.address.$touch" required />
            <v-textarea v-model="state.note" label="Notes (optional)" placeholder="Insert eventual notes" variant="outlined"
              @input="v$.note.$touch" @blur="v$.note.$touch" required />
            <div class="d-flex justify-end">
              <v-btn :prepend-icon="mdiCheck" color="primary" text="Save address" @click="handleSave" />
            </div>
          </form>
        </div>
        <div v-else>
          Address saved
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiCheck, mdiClose } from '@mdi/js';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import type { DeliveryAddress } from '~/utils/models';

const store = useStore();

const rules = {
  city: { required: helpers.withMessage("Address is required.", required) },
  address: { required: helpers.withMessage("Address is required.", required) },
  note: { required: false }
};

const initialState: DeliveryAddress = {
  city: store.deliveryAddress?.city ?? '',
  address: store.deliveryAddress?.address ?? '',
  note: store.deliveryAddress?.note ?? '',
};

const state = reactive<DeliveryAddress>({
  ...initialState,
});

const v$ = useVuelidate(rules, state);

const dialog = ref(false);
const loading = ref(false);

const handleSave = () => {
  loading.value = true;

  v$.value.$validate().then(async (res) => {
    if (res) {
      console.log(res)
      store.setDeliveryAddress(state);
      loading.value = false;
    }
  });
};

emitter.on(EventType.OPEN_DELIVERY_ADDRESSES, () => {
  dialog.value = true;
});
</script>