<template>
  <section class="login container mx-auto my-20">
    <div class="max-w-screen-lg mb-20">
      <h1>
        To continue you must <span class="text-secondary">log in</span>.
      </h1>
    </div>

    <div class="max-w-screen-xs">
      <v-form @submit.prevent="handleSubmit" class="mb-6">
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" placeholder="Insert your e-mail"
          variant="outlined" />
        <v-text-field v-model="password" :rules="passwordRules" label="Password" placeholder="Insert your password"
          variant="outlined" />
        <v-btn type="submit" variant="outlined" color="primary" block class="mt-2">Login</v-btn>
      </v-form>
      <span>To create a new account <NuxtLink class="text-primary" to="/registration">click here</NuxtLink>.</span>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

const email = ref<string>("");
const password = ref<string>("");

const loading = ref(false);

const emailRules = [
  (value: string) => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
    return 'You must enter a valid e-mail.'
  },
];

const passwordRules = [
  (value: string) => {
    if (value) return true
    return 'You must enter a password.'
  },
];

const handleSubmit = async () => {
  if (!email.value || !password.value) return;

  loading.value = true;
  loading.value = false;
  await navigateTo('/')
};
</script>