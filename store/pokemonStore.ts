import { defineStore } from "pinia";
import { GuessHandlerProps, GuessingGamePokemon, ResponseWithPayload } from "./types";

export const usePokemonStore = defineStore('pokemonStore', () => {
    const newlyGuessedPokemon = ref([]);

    const getNewlyGuessedPokemon = computed(() => newlyGuessedPokemon.value);

    async function getRandomPokemon(): Promise<ResponseWithPayload> {
        let error = ""
        let gamePokemon: GuessingGamePokemon = {
            image: "",
            guessId: ""
        }
    
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
            // onResponseError({ response }) {
            //     if (response.status === 401) {
            //         navigateTo("/auth/login")
            //     }
            //     else 
            //         error = response._data.cause
            // }
        })
    
        return {
            error: error, 
            payload: gamePokemon
        }
    };

    async function takeAGuess(
        payload: GuessHandlerProps
    ): Promise<ResponseWithPayload> {
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
            
        return {
            error: error, 
            payload: guessVerdict
        }
    };

    async function getGuessedPokemon() {
        let error = ""
    
        const { pending } = await useFetch("user/pokedex", {
            baseURL: "http://localhost:8080/",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
            onResponse({ response }) {
                if (response.status === 200){
                    console.log(response._data.data)
                    newlyGuessedPokemon.value = response._data.data;
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
    
        return {error}
    };

    return { getNewlyGuessedPokemon, getRandomPokemon, takeAGuess, getGuessedPokemon }
});