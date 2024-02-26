interface State {
    isAuthenticated: boolean
};

export const useStore = defineStore('store', {
    state: (): State => ({
        isAuthenticated: false
    }),
    getters: {},
    actions: {
        login() {
            this.isAuthenticated = true;
        },
        logout() {
            this.isAuthenticated = false;
        }
    }
});
