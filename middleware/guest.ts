import { checkAuthentication } from "./auth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const isAuthenticated = await checkAuthentication();

    if (isAuthenticated) {
        return navigateTo('/');
    }
});
