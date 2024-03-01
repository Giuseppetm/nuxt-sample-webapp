import type { DeliveryAddress, User } from "~/utils/types";

interface State {
    user: User | null,
    isAuthenticated: boolean,
    token: string | null,
    deliveryAddress: DeliveryAddress | null
};

export const useStore = defineStore('store', {
    state: (): State => ({
        user: null,
        isAuthenticated: false,
        token: null,
        deliveryAddress: null
    }),
    getters: {},
    actions: {
        login(user: User, token: string) {
            this.user = user;
            this.token = token;
            this.isAuthenticated = true;
        },
        logout() {
            this.token = null;
            this.isAuthenticated = false;
            this.user = null;
        },
        setDeliveryAddress(address: DeliveryAddress) {
            this.deliveryAddress = address;
        }
    }
});
