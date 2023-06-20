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

export type AuthHandlerProps = {
    userData: RegisterUserData | LoginUserData,
    path: string
}

export type GuessHandlerProps = {
    userGuess: string,
    guessId: string
}

export type GuessingGamePokemon = {
    image: string,
    guessId: string
}