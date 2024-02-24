<template>
    <section class="registration container mx-auto my-20">
        <div class="max-w-screen-lg mb-20">
            <h1>
                Create a <span class="text-secondary">new account</span>.
            </h1>
        </div>

        <div class="max-w-screen-md">
            <v-form @submit.prevent="handleSubmit" class="mb-6">
                <div class="grid grid-cols-2 gap-3">
                    <v-text-field v-model="name" :rules="nameRules" label="Name" placeholder="Insert your name"
                        variant="outlined" />
                    <v-text-field v-model="surname" :rules="surnameRules" label="Surname" placeholder="Insert your surname"
                        variant="outlined" />
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" placeholder="Insert your e-mail"
                        variant="outlined" />
                    <v-text-field v-model="password" type="password" :rules="passwordRules" label="Password"
                        placeholder="Insert your password" variant="outlined" />
                    <v-text-field v-model="confirmPassword" type="password" :rules="confirmPasswordRules"
                        label="Confirm password" placeholder="Confirm your password" variant="outlined" />
                </div>
                <v-btn type="submit" variant="outlined" color="primary" block class="mt-2">Register</v-btn>
            </v-form>
            <span>If you already have an account <NuxtLink class="text-primary" to="/login">click here</NuxtLink> to
                login.</span>
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
});

const name = ref<string>("");
const surname = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
// const fiscalCode = ref<string>("");
// const birthDate = ref<string>("");
// const birthCity = ref<string>("");

const loading = ref(false);

const emailRules = [
    (value: string) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
        return 'You must enter a valid e-mail.'
    },
];

const nameRules = [
    (value: string) => {
        if (value) return true
        return 'You must enter a name.'
    },
];

const surnameRules = [
    (value: string) => {
        if (value) return true
        return 'You must enter a surname.'
    },
];

const passwordRules = [
    (value: string) => {
        if (value) return true
        return 'You must enter a password.'
    },
];

const confirmPasswordRules = [
    (value: string) => {
        if (value) return true
        return 'You must confirm your password.'
    },
];

const handleSubmit = async () => {
    return;
};
</script>