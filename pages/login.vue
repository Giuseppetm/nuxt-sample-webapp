<template>
  <section class="login container mx-auto my-20">
    <div class="max-w-screen-lg mb-20">
      <h1>
        To continue you must <span class="text-tertiary">log in</span>.
      </h1>
    </div>

    <div class="max-w-screen-xs">
      <form class="mb-6">
        <v-text-field v-model="state.username" :error-messages="v$.username.$errors.map((e: any) => e.$message)" label="Username"
          class="mb-2" placeholder="Insert your username" variant="outlined" @input="v$.username.$touch" @blur="v$.username.$touch" required />
        <v-text-field v-model="state.password" type="password" :error-messages="v$.password.$errors.map((e: any) => e.$message)"
          label="Password" placeholder="Insert your password" variant="outlined" @input="v$.password.$touch"
          @blur="v$.password.$touch" required />
        <v-btn color="primary" block text="Login" class="mt-2" @click="handleLogin" :loading="loading" />
      </form>
      <span class="text-secondary">To create a new account <NuxtLink class="text-primary" to="/registration">click here</NuxtLink>.</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import axios from 'axios';

definePageMeta({
  layout: 'default',
  middleware: 'guest'
});

const store = useStore();
const runtimeConfig = useRuntimeConfig();
const token = useCookie('token');

interface FormState {
  username: string,
  password: string
};

const rules = {
  username: { required: helpers.withMessage("Username is required.", required) },
  password: { required: helpers.withMessage("Password is required.", required) }
};

const initialState: FormState = {
  username: '',
  password: ''
};

const state = reactive<FormState>({
  ...initialState,
});

const v$ = useVuelidate(rules, state);

const loading = ref(false);

const handleLogin = () => {
  v$.value.$validate().then(async(res) => {
    if (res) {
      loading.value = true;

      try {
        const response = await axios.post(`${runtimeConfig.public.apiBase}/auth/login`, {
          username: state.username,
          password: state.password
        });

        if (response.status === 200) {
          token.value = response.data.token;
          store.login(response.data, response.data.token);
          // TODO: Snackbar login success
          await navigateTo('/');
        }
      } catch (error) {
        // TODO: Snackbar login failed
        console.error('Login failed', error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>