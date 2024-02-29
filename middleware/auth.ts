import axios from "axios";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        return navigateTo('/login');
    }
});

export const checkAuthentication = async() => {
    const store = useStore();
    const runtimeConfig = useRuntimeConfig();
    const token = useCookie('token');

    if (!token.value) return false;

    try {
        const response = await axios.get(`${runtimeConfig.public.apiBase}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });

        if (response.status === 200) {
            store.login(token.value);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};
