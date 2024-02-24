<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

onBeforeMount(() => {
  console.log("🚀 ~ runtimeConfig:", runtimeConfig)
});
</script>