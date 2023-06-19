export type RegisterUserData = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export type LoginUserData = {
    email: string,
    password: string
}

export type GuessingGamePokemon = {
    image: string,
    guessId: string
}