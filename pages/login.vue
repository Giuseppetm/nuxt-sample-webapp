<template>
  <section class="login container mx-auto my-20">
    <div class="max-w-screen-lg mb-20">
      <h1>
        To continue you must <span class="text-tertiary">log in</span>.
      </h1>
    </div>

    <div class="max-w-screen-xs">
      <form class="mb-6">
        <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map((e: any) => e.$message)" label="E-mail"
          class="mb-2" placeholder="Insert your e-mail" variant="outlined" @input="v$.email.$touch" @blur="v$.email.$touch" required />
        <v-text-field v-model="state.password" :error-messages="v$.password.$errors.map((e: any) => e.$message)"
          label="Password" placeholder="Insert your password" variant="outlined" @input="v$.password.$touch"
          @blur="v$.password.$touch" required />
        <v-btn color="primary" block text="Login" class="mt-2" @click="handleLogin" />
      </form>
      <span class="text-secondary">To create a new account <NuxtLink class="text-primary" to="/registration">click here
        </NuxtLink>.</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';

definePageMeta({
  layout: 'default'
});

const store = useStore();

interface FormState {
  email: string,
  password: string
};

const rules = {
  email: { 
    required: helpers.withMessage("E-mail is required.", required), 
    email: helpers.withMessage("E-mail is not valid.", email) 
  },
  password: { required: helpers.withMessage("Password is required.", required) }
};

const initialState: FormState = {
  email: '',
  password: ''
};

const state = reactive<FormState>({
  ...initialState,
});

const v$ = useVuelidate(rules, state);

const loading = ref(false);

const handleLogin = () => {
  loading.value = true;
  
  v$.value.$validate().then(async(res) => {
    if (res) {
      console.log(res)
      store.login();
      loading.value = false;
      await navigateTo('/');
      // TODO: Successfull login snackbar
    }
  });
};
</script>