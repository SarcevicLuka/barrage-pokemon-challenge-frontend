import { store } from "~/store";

export default defineNuxtRouteMiddleware((_to, _from) => {
    const isActive = store.state.isUserActive

    if (!isActive) {
        return navigateTo("/auth/login");
    }
})