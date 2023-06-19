import { RegisterUserData, LoginUserData } from "./types";
import { store } from "./index";

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
                const token = response.headers.get("authorization")!
                commit('setToken', token)
                sessionStorage.setItem('token', token);
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

export async function getRandomPokemon({ commit }: any) {
    const { pending } = await useFetch('guessing-game/guess', {
        baseURL: "http://localhost:8080/",
        method: "GET",
        headers: { 
            "Authorization": "Bearer " + store.state.userToken
        },
        onResponse({ response }) {
            console.log(response._data)
            if (response.status === 200){
                commit('setGuessingGamePokemon', response._data)
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

export async function takeAGuess({ commit }: any, payload: string) {
    const { pending } = await useFetch(`guessing-game/guess/${store.state.guessingGamePokemon.guessId}`, {
        baseURL: "http://localhost:8080/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + store.state.userToken
        },
        body: JSON.stringify({
            guessName: payload
        }),
        onResponse({ response }) {
            console.log(response._data)
            if (response.status === 200){
                commit('setGuessVerdict', response._data.verdict);
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