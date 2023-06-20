import { GuessingGamePokemon } from "./types";

export function setIsUserActive(state: { isUserActive: boolean; }, payload: boolean) {
    state.isUserActive = payload;
}

export function setPending(state: { pending: boolean; }, payload: boolean) {
    state.pending = payload;
}