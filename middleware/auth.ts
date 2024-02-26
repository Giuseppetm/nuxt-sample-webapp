export default defineNuxtRouteMiddleware((to) => {
    if (isAuthenticated() === false) {
        return navigateTo('/login');
    }
});

const isAuthenticated = () => {
    return true;
};