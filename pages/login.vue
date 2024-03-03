<template>
  <section class="login container mx-auto my-10 md:my-20">
    <div class="max-w-screen-lg mb-8 md:mb-20">
      <h1>
        {{ t('login.title.p1') }} <span class="text-tertiary">{{ t('login.title.p2') }}</span>.
      </h1>
    </div>

    <div class="max-w-screen-xs">
      <form class="mb-6">
        <v-text-field v-model="state.username" :error-messages="v$.username.$errors.map((e: any) => e.$message)"
          :label="t('login.form.username.value')" class="mb-1 md:mb-2"
          :placeholder="t('login.form.username.placeholder')" variant="outlined" @input="v$.username.$touch"
          @blur="v$.username.$touch" required />
        <v-text-field v-model="state.password" type="password"
          :error-messages="v$.password.$errors.map((e: any) => e.$message)" :label="t('login.form.password.value')"
          :placeholder="t('login.form.password.placeholder')" variant="outlined" @input="v$.password.$touch"
          @blur="v$.password.$touch" required />
        <v-btn color="primary" block :text="t('login.button')" class="mt-2" @click="handleLogin" :loading="loading" />
      </form>
      <span class="text-secondary">{{ t('login.registration.p1') }} <NuxtLink class="text-primary" to="/registration">{{t('login.registration.p2') }}</NuxtLink>.</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import axios from 'axios';
import { Snackbar } from '~/utils/types';

const { t } = useI18n();

const seoMeta = computed(() => {
  return {
    title: `${t('seo.login.title')} - ${t('seo.brandName')}`,
    description: `${t('seo.login.description')} - ${t('seo.brandName')}`
  }
});

definePageMeta({
  layout: 'default',
  middleware: 'guest'
});

useSeoMeta({
  title: () => seoMeta.value.title,
  ogTitle: () => seoMeta.value.title,
  description: () => seoMeta.value.description,
  ogDescription: () => seoMeta.value.description,
  ogImage: '/preview.png',
  twitterCard: 'summary_large_image',
});

const store = useStore();
const runtimeConfig = useRuntimeConfig();
const token = useCookie('token');

interface FormState {
  username: string,
  password: string
};

const rules = {
  username: { required: helpers.withMessage(t('login.form.username.required'), required) },
  password: { required: helpers.withMessage(t('login.form.password.required'), required) }
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
  v$.value.$validate().then(async (res) => {
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
          emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.login'), type: Snackbar.SUCCESS });
          await navigateTo('/');
        }
      } catch (error) {
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.login'), type: Snackbar.ERROR });
        console.error('Login failed:', error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>