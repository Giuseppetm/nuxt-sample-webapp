import type { DeliveryAddress } from "~/utils/models";

interface State {
    isAuthenticated: boolean,
    deliveryAddress: DeliveryAddress | null
};

export const useStore = defineStore('store', {
    state: (): State => ({
        isAuthenticated: false,
        deliveryAddress: null
    }),
    getters: {},
    actions: {
        login() {
            this.isAuthenticated = true;
        },
        logout() {
            this.isAuthenticated = false;
        },
        setDeliveryAddress(address: DeliveryAddress) {
            this.deliveryAddress = address;
        }
    }
});
