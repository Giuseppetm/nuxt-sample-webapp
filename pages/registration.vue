<template>
    <section class="registration container mx-auto my-20">
        <div class="max-w-screen-lg mb-20">
            <h1>
                Create a <span class="text-tertiary">new account</span>.
            </h1>
        </div>

        <div class="max-w-screen-md">
            <form class="mb-6">
                <div class="grid grid-cols-2 gap-3">
                    <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map((e: any) => e.$message)"
                        label="Name" class="mb-2" placeholder="Insert your name" variant="outlined"
                        @input="v$.name.$touch" @blur="v$.name.$touch" required />
                    <v-text-field v-model="state.surname"
                        :error-messages="v$.surname.$errors.map((e: any) => e.$message)" label="Surname" class="mb-2"
                        placeholder="Insert your surname" variant="outlined" @input="v$.surname.$touch"
                        @blur="v$.surname.$touch" required />
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map((e: any) => e.$message)"
                        label="E-mail" class="mb-2" placeholder="Insert your e-mail" variant="outlined"
                        @input="v$.email.$touch" @blur="v$.email.$touch" required />
                    <v-text-field v-model="state.password" type="password"
                        :error-messages="v$.password.$errors.map((e: any) => e.$message)" label="Password"
                        placeholder="Insert your password" variant="outlined" @input="v$.password.$touch"
                        @blur="v$.password.$touch" required />
                    <v-text-field v-model="state.confirmPassword" type="password"
                        :error-messages="v$.confirmPassword.$errors.map((e: any) => e.$message)"
                        label="Confirm password" placeholder="Confirm your password" variant="outlined"
                        @input="v$.confirmPassword.$touch" @blur="v$.confirmPassword.$touch" required />
                </div>
                <v-btn color="primary" block text="Register" class="mt-2" @click="handleRegistration"
                    :loading="loading" />
            </form>
            <span class="text-secondary">
                If you already have an account
                <NuxtLink class="text-primary" to="/login">click here</NuxtLink> to login.
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required, sameAs } from '@vuelidate/validators';

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
    // fiscalCode
    // birthDate
    // birthCity
};

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
    name: { required: helpers.withMessage("Name is required.", required) },
    surname: { required: helpers.withMessage("Surname is required.", required) },
    email: {
        required: helpers.withMessage("E-mail is required.", required),
        email: helpers.withMessage("E-mail is not valid.", email)
    },
    password: { required: helpers.withMessage("Password is required.", required) },
    confirmPassword: {
        required: helpers.withMessage("You must confirm your password.", required),
        sameAs: helpers.withMessage("Confirmation password does not match the password.", sameAs(computed(() => state.password)))
    },
};

const v$ = useVuelidate(rules, state);

const loading = ref(false);

const handleRegistration = () => {
    v$.value.$validate().then(async (res) => {
        if (res) {
            loading.value = true;

            // Mockup, dummyjson has no register API
            setTimeout(async () => {
                loading.value = false;
                await navigateTo('/login');
            }, 1500);
        }
    });
};
</script>