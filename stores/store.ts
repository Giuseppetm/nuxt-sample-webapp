import type { Address, User } from "~/utils/types";

interface State {
    user?: User,
    isAuthenticated: boolean,
    token?: string,
    deliveryAddress?: Address
};

export const useStore = defineStore('store', {
    state: (): State => ({
        user: undefined,
        isAuthenticated: false,
        token: undefined,
        deliveryAddress: undefined
    }),
    getters: {},
    actions: {
        login(user: User, token: string) {
            this.user = user;
            this.token = token;
            this.isAuthenticated = true;
        },
        logout() {
            this.isAuthenticated = false;
            this.token = undefined;
            this.user = undefined;
        },
        setDeliveryAddress(address: DeliveryAddress) {
            this.deliveryAddress = address;
        }
    }
});
