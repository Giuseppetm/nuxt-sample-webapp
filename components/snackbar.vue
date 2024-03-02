<template>
    <v-snackbar v-model="snackbar" timeout="2000" timer="grey-lighten-1" :color="color" location="bottom right">
        {{ message }}

        <template v-slot:actions>
            <v-btn variant="text" @click="snackbar = false" :icon="mdiClose" />
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js';
import { Snackbar } from '~/utils/types';

const snackbar = ref(false);
const message = ref<string>('');
const type = ref<string>('');

const color = computed(() => {
    switch (type.value) {
        case Snackbar.SUCCESS:
            return 'green';
        case Snackbar.ERROR:
            return 'error';
        case Snackbar.STANDARD:
            return 'grey-lighten-3';
        default:
            break;
    }
});

emitter.on(EventType.SNACKBAR_MESSAGE, (e) => {
    const event = e as { message: string, type: Snackbar };
    
    snackbar.value = true;
    message.value = event.message;
    type.value = event.type;
});
</script>