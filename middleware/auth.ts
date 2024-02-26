export default defineNuxtRouteMiddleware((to, from) => {
    if (!isAuthenticated()) {
        return navigateTo('/login');
    } else {
        // TODO: Check if the page is register or login: if so, go to homepage
    }
});

const isAuthenticated = () => {
    const store = useStore();

    // TODO: Remove mockup
    store.login();
    return true;
    //return store.isAuthenticated;
};