import { userData } from "./types"

export async function registerUser({ commit }: any, userData: userData) {
    const { pending } = await useFetch('http://localhost:8080/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password
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