<template>
    <v-menu min-width="200px" offset="10" location="bottom right">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar color="primary" size="large" :image="user?.image" />
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto">
                    <v-list>
                        <v-list-item :prepend-avatar="user?.image" :title="fullName" :subtitle="user!.email">
                        </v-list-item>
                    </v-list>

                    <v-divider class="my-2" />

                    <v-btn variant="text" block @click="openDeliveryAddresses">
                        Delivery address
                    </v-btn>
                    <v-divider class="my-1" />
                    <v-btn variant="text" block @click="handleLogout">
                        Logout
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { Snackbar } from '~/utils/types';

const store = useStore();
const token = useCookie('token');

const user = computed(() => store.user);
const fullName = computed(() => `${store.user?.firstName} ${store.user?.lastName}`);

const openDeliveryAddresses = () => {
    emitter.emit(EventType.OPEN_DELIVERY_ADDRESS);
};

const handleLogout = () => {
    token.value = null;
    emitter.emit(EventType.SNACKBAR_MESSAGE, { message: 'Logout successfully.', type: Snackbar.SUCCESS });
    store.logout();
    navigateTo('/login');
};
</script>