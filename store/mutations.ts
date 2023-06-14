export function setToken(state: { userToken: string; }, payload: string) {
    state.userToken = payload;
}

export function setError(state: { errors: string; }, payload: string) {
    state.errors = payload;
}

export function setPending(state: { pending: boolean; }, payload: boolean) {
    state.pending = payload;
}