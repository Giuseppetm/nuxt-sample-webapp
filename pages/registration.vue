<template>
    <section class="registration container mx-auto my-10 md:my-20">
        <div class="max-w-screen-lg mb-8 md:mb-20">
            <h1>
                {{ t('registration.title.p1') }} <span class="text-tertiary">{{ t('registration.title.p2') }}</span>.
            </h1>
        </div>

        <div class="max-w-screen-md">
            <form class="mb-6">
                <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-1 md:gap-3">
                    <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map((e: any) => e.$message)"
                        :label="t('registration.form.name.value') " class="mb-1 md:mb-2"
                        :placeholder="t('registration.form.name.placeholder')" variant="outlined"
                        @input="v$.name.$touch" @blur="v$.name.$touch" required />
                    <v-text-field v-model="state.surname"
                        :error-messages="v$.surname.$errors.map((e: any) => e.$message)"
                        :label="t('registration.form.surname.value')" class="mb-1 md:mb-2"
                        :placeholder="t('registration.form.surname.placeholder')" variant="outlined"
                        @input="v$.surname.$touch" @blur="v$.surname.$touch" required />
                </div>
                <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-1 md:gap-3">
                    <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map((e: any) => e.$message)"
                        :label="t('registration.form.email.value')" class="mb-1 md:mb-2"
                        :placeholder="t('registration.form.email.placeholder')" variant="outlined"
                        @input="v$.email.$touch" @blur="v$.email.$touch" required />
                    <v-text-field v-model="state.password" type="password"
                        :error-messages="v$.password.$errors.map((e: any) => e.$message)"
                        :label="t('registration.form.password.value')" class="mb-1 md:mb-2"
                        :placeholder="t('registration.form.password.placeholder')" variant="outlined"
                        @input="v$.password.$touch" @blur="v$.password.$touch" required />
                    <v-text-field v-model="state.confirmPassword" type="password" class="mb-1 md:mb-2"
                        :error-messages="v$.confirmPassword.$errors.map((e: any) => e.$message)"
                        :label="t('registration.form.confirmPassword.value')"
                        :placeholder="t('registration.form.confirmPassword.placeholder')" variant="outlined"
                        @input="v$.confirmPassword.$touch" @blur="v$.confirmPassword.$touch" required />
                </div>
                <v-btn color="primary" block :text="t('registration.button')" class="mt-1 md:mt-2"
                    @click="handleRegistration" :loading="loading" />
            </form>
            <span class="text-secondary">
                {{ t('registration.login.p1') }}
                <NuxtLink class="text-primary" to="/login">{{ t('registration.login.p2') }}</NuxtLink> {{
                t('registration.login.p3') }}.
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required, sameAs } from '@vuelidate/validators';
import axios from 'axios';

const { t } = useI18n();

const seoMeta = computed(() => {
    return {
        title: `${t('seo.registration.title')} - ${t('seo.brandName')}`,
        description: `${t('seo.registration.description')} - ${t('seo.brandName')}`
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

interface FormState {
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string
};

const runtimeConfig = useRuntimeConfig();

const initialState: FormState = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const state = reactive<FormState>({
    ...initialState,
});

const rules = {
    name: { required: helpers.withMessage(t('registration.form.name.required'), required) },
    surname: { required: helpers.withMessage(t('registration.form.surname.required'), required) },
    email: {
        required: helpers.withMessage(t('registration.form.email.required'), required),
        email: helpers.withMessage(t('registration.form.email.valid'), email)
    },
    password: { required: helpers.withMessage(t('registration.form.password.required'), required) },
    confirmPassword: {
        required: helpers.withMessage(t('registration.form.confirmPassword.required'), required),
        sameAs: helpers.withMessage(t('registration.form.confirmPassword.valid'), sameAs(computed(() => state.password)))
    },
};

const v$ = useVuelidate(rules, state);

const loading = ref(false);

const handleRegistration = () => {
    v$.value.$validate().then(async (res) => {
        if (res) {
            loading.value = true;

            try {
                await axios.post(`${runtimeConfig.public.apiBase}/users/add`, state);
                await navigateTo('/login');
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.registration'), type: Snackbar.SUCCESS });
            } catch (error) {
                emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.registration'), type: Snackbar.ERROR });
                console.error('Error creating a new user:', error);
            } finally {
                loading.value = false;
            }
        }
    });
};
</script>