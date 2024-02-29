<template>
    <v-menu min-width="200px" offset="10" location="bottom right">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar color="primary" size="large" image="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto">
                    <v-list>
                        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" :title="user.fullName"
                            :subtitle="user.email">
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
import { EventType, emitter } from '@/utils/eventBus';

const store = useStore();

const user = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
};

const openDeliveryAddresses = () => {
    emitter.emit(EventType.OPEN_DELIVERY_ADDRESS);
};

const handleLogout = () => {
    store.logout();
    navigateTo('/login');
    // TODO: Successfull logout snackbar
};
</script>