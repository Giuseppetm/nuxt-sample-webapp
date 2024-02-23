<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

onBeforeMount(() => {
  console.log("🚀 ~ runtimeConfig:", runtimeConfig)
});
</script>