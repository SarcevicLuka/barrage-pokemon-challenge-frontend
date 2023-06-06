export const state = () => ({
    loggedInUser: '',
    pending: false,
})

export const mutations = {
    SET_POKEDEX(state: { loggedInUser: any }, payload: any) {
        state.loggedInUser = payload
    },
}

export const actions = {
    register({ }: any, payload: { email: String; firstName: String; lastName: String; password: String }) {
        useFetch('http://127.0.0.1:8080/auth/register', {
            method: "POST",
            body: {
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                password: payload.password
            },
        })
    },
}