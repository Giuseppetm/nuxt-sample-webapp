import type { DeliveryAddress } from "~/utils/types";

interface State {
    // TODO: user data
    isAuthenticated: boolean,
    token: string | null,
    deliveryAddress: DeliveryAddress | null
};

export const useStore = defineStore('store', {
    state: (): State => ({
        isAuthenticated: false,
        token: null,
        deliveryAddress: null
    }),
    getters: {},
    actions: {
        login(token: string) {
            this.token = token;
            this.isAuthenticated = true;
        },
        logout() {
            this.token = null;
            this.isAuthenticated = false;
        },
        setDeliveryAddress(address: DeliveryAddress) {
            this.deliveryAddress = address;
        }
    }
});
