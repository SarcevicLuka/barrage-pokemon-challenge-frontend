import { defineStore } from "pinia";
import { AuthHandlerProps } from "./types";
import { RouteNames } from "~/components/routeNames";

export const useAuthStore = defineStore('authStore', () => {
    const isUserActive = ref(false);

    const getIsUserActive = computed(() => isUserActive.value);

    async function authHandler(
        payload: AuthHandlerProps
    ): Promise<string> {
        let error = ""
    
        const { pending } = await useFetch(payload.path, {
            baseURL: "http://localhost:8080/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload.userData),
            onResponse({ response }) {
                if (response.status === 201 || response.status === 200){
                    const token = response.headers.get("authorization")!
                    isUserActive.value = true;
                    sessionStorage.setItem('token', token);
    
                    navigateTo("/")
                }
            },
            onResponseError({ response }) {
                if (response.status === 422) {
                    error = response._data.errors.password.errors[0]
                } else {
                    error = response._data.cause
                }
            }
        })
    
        return error
    };

    function logout() {
        isUserActive.value = false;
        sessionStorage.removeItem("token");
        navigateTo(RouteNames.Home);
    }

    return { isUserActive, getIsUserActive, authHandler, logout }
});