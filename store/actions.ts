import { AuthHandlerProps, GuessHandlerProps } from "./types";

export async function authHandler({ commit }: any, payload: AuthHandlerProps) {
    let error = ""

    const { pending } = await useFetch(payload.path, {
        baseURL: "http://localhost:8080/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.userData),
        onResponse({ response }) {
            if (response.status === 201 || response.status === 200){
                const token = response.headers.get("authorization")!
                commit('setIsUserActive', !!token)
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

    commit('setPending', pending)
    return error
}

export async function getRandomPokemon({ commit }: any) {
    let error = ""
    let gamePokemon = {}

    const { pending } = await useFetch('guessing-game/guess', {
        baseURL: "http://localhost:8080/",
        method: "GET",
        headers: { 
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        onResponse({ response }) {
            if (response.status === 200){
                console.log(response._data)
                gamePokemon = response._data
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                navigateTo("/auth/login")
            }
            else 
                error = response._data.cause
        }
    })
    commit('setPending', pending)
    return {error, gamePokemon}
}

export async function takeAGuess({ commit }: any, payload: GuessHandlerProps) {
    let error = ""
    let guessVerdict = ""

    const { pending } = await useFetch(`guessing-game/guess/${payload.guessId}`, {
        baseURL: "http://localhost:8080/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            guessName: payload.userGuess
        }),
        onResponse({ response }) {
            if (response.status === 200){
                guessVerdict = response._data.verdict
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                navigateTo("/auth/login")
            }
            else if (response.status === 422) {
                error = "Pokemon name required"
            } else {
                error = response._data.cause
            }
        }
    })

    commit('setPending', pending)
    return {error, guessVerdict}
}