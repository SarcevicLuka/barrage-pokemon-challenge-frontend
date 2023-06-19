import { GuessingGamePokemon } from "./types";

export function setToken(state: { userToken: string; }, payload: string) {
    state.userToken = payload;
}

export function setError(state: { errors: string; }, payload: string) {
    state.errors = payload;
}

export function setPending(state: { pending: boolean; }, payload: boolean) {
    state.pending = payload;
}

export function setGuessingGamePokemon(state: { guessingGamePokemon: GuessingGamePokemon; }, payload: GuessingGamePokemon) {
    state.guessingGamePokemon = payload;
}

export function setGuessVerdict(state: { guessVerdict: string }, payload: string) {
    state.guessVerdict = payload
}