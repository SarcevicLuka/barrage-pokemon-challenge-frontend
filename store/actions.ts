import { RegisterUserData, LoginUserData } from "./types"

export async function registerUser({ commit }: any, payload: RegisterUserData) {
    const { pending } = await useFetch("auth/register", {
        baseURL: "http://localhost:8080/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            password: payload.password
        }),
        onResponse({ response }) {
            console.log(response)
            if (response.status === 201){
                commit('setToken', response.headers.get("authorization"))
                navigateTo("/")
            }
        },
        onResponseError({ response }) {
            if (response.status !== 422) {
                commit('setError', response._data.cause)
            } else {
                commit('setError', response._data.errors.password.errors[0])
            }
        }
    })
    commit('setPending', pending)
}

export async function loginUser({ commit }: any, payload: LoginUserData) {
    const { pending } = await useFetch('auth/login', {
        baseURL: "http://localhost:8080/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password
        }),
        onResponse({ response }) {
            console.log(response)
            if (response.status === 200){
                commit('setToken', response.headers.get("authorization"))
                navigateTo("/")
            }
        },
        onResponseError({ response }) {
            if (response.status !== 422) {
                commit('setError', response._data.cause)
            } else {
                commit('setError', response._data.errors.password.errors[0])
            }
        }
    })
    commit('setPending', pending)
}