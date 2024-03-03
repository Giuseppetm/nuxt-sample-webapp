<template>
    <v-menu min-width="200px" offset="10" location="bottom right">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar size="large" :image="user?.image" />
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
                        {{ t('header.avatar.deliveryAddress') }}
                    </v-btn>
                    <v-divider class="my-1" />
                    <v-btn variant="text" block @click="handleLogout">
                        {{ t('header.avatar.logout') }}
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { Snackbar } from '~/utils/types';

const { t } = useI18n();
const store = useStore();
const token = useCookie('token');

const user = computed(() => store.user);
const fullName = computed(() => `${store.user?.firstName} ${store.user?.lastName}`);

const openDeliveryAddresses = () => {
    emitter.emit(EventType.OPEN_DELIVERY_ADDRESS);
};

const handleLogout = () => {
    try {
        token.value = null;
        store.logout();
        navigateTo('/login');
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.success.logout'), type: Snackbar.SUCCESS });
    } catch(error) {
        emitter.emit(EventType.SNACKBAR_MESSAGE, { message: t('snackbar.error.logout'), type: Snackbar.ERROR });
        console.error('Error while logout:', error);
    }
};
</script>