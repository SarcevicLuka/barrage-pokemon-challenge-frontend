import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((_to, _from) => {
    const store = useAuthStore();
    const isActive = store.getIsUserActive;

    if (!isActive) {
        return navigateTo("/auth/login");
    }
})