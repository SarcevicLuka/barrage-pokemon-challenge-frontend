<template>
    <div v-if="showModal" class="pokedex-modal">
        <div class="pokedex-modal__inner">
            <h3>Pokemon caught in this round: {{ newelyCaughtPokemon.length }}</h3>
            <i class="fas fa-times" @click="showModal = false" />
            <div class="pokedex-grid">
                <div v-for="guessedPokemon in newelyCaughtPokemon" :key="guessedPokemon.image"
                    class="pokedex-grid__inner-caught">
                    <img class="image" :src="guessedPokemon.image" alt="Pokemon">
                </div>
                <div v-for="n in (151 - newelyCaughtPokemon.length)" :key="n" class="pokedex-grid__inner-missing">
                    <img class="image" src="../../assets/images/questionMark.png" alt="Questionmark image">
                </div>
            </div>
        </div>
    </div>
    <div v-if="showFinishGame" class="finish-message">
        <div class="message">
            <h1>You caught {{ newelyCaughtPokemon.length }} new pokemon</h1>
            <h2 v-if="newelyCaughtPokemon.length === 0"> Don't give up</h2>
            <button class="message__try-again" @click.prevent="handleTryAgain">Try again</button>
        </div>
    </div>
    <div v-else-if="!showFinishGame" class="guessing-game">
        <p>Progression:</p>
        <div class="bar-flex">
            {{ newelyCaughtPokemon.length >= 100 ? newelyCaughtPokemon.length : newelyCaughtPokemon.length }}
            <GameProgressBar :max-value="200" :value="newelyCaughtPokemon.length" /> 151
        </div>
        <div class="game-image">
            <img :src="pokemon.image" alt="Pokemon logo">
        </div>
        <div class="game-controls">
            <div class="input-skip">
                <div class="verdict">
                    <div class="verdict__correct" v-if="isCorrect"> CORRECT </div>
                    <div class="verdict__incorrect" v-else-if="isIncorrect"> INCORRECT </div>
                </div>
                <input v-model="userGuess" type="text" id="guess-input" :class="errors && 'incorrect'"
                    :placeholder="errors ? errors.toString() : 'Take a guess...'">
                <button @click="handleSkip">SKIP</button>
            </div>
            <div class="control-buttons">
                <button class="control-buttons__submit" @click.prevent="handleGuess">GUESS</button>
                <button class="control-buttons__finish" @click.prevent="handleFinish">FINISH</button>
                <button class="control-buttons__pokedex" @click.prevent="showModal = true">YOUR PROGRESS</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { store } from '~/store';
import { GuessingGamePokemon } from '~/store/types';
import GameProgressBar from '../GameProgressBar.vue';

const userGuess = ref("")
const pokemon = reactive<GuessingGamePokemon>({
    image: "",
    guessId: ""
})
let newelyCaughtPokemon: GuessingGamePokemon[] = []
const verdict = ref("")
const isCorrect = ref(false)
const isIncorrect = ref(false)
const showFinishGame = ref(false)
const showModal = ref(false)
const errors = ref("")

onMounted(() => {
    handleSkip()
})

async function handleSkip(): Promise<void> {
    verdict.value = ""

    await store.dispatch('getRandomPokemon')
        .then(({ error, payload }) => {
            errors.value = error
            pokemon.image = payload.image
            pokemon.guessId = payload.guessId
        });
}

async function handleGuess(): Promise<void> {
    await store.dispatch('takeAGuess', {
        userGuess: userGuess.value,
        guessId: pokemon.guessId
    })
    .then(({ error, payload }) => {
        errors.value = error
        verdict.value = payload
        console.log(verdict.value)
    });

    if (verdict.value === "correct") {
        userGuess.value = ""

        const newPokemon = {
            image: pokemon.image,
            guessId: pokemon.guessId
        }
        newelyCaughtPokemon.push(newPokemon)

        isIncorrect.value = false
        isCorrect.value = true
        setTimeout(() => {
            isCorrect.value = false
        }, 1000)

        await handleSkip()
    }
    else {
        userGuess.value = ""
        isIncorrect.value = true
    }
}

async function handleFinish() {
    showFinishGame.value = true
}

async function handleTryAgain() {
    await handleSkip();

    newelyCaughtPokemon = [];
    showFinishGame.value = false;
    isCorrect.value = false;
    isIncorrect.value = false;
}
</script>

<style lang="scss" scoped>
.message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__try-again {
        cursor: pointer;
        text-decoration: none;
        color: $link-hover-color;
        background-color: white;
        border: 2px solid $link-hover-color;
        border-radius: 15px;
        padding: 8px;
        font-size: 20px;
    
        &:hover {
            color: white;
            background-color: $link-hover-color;
            transition: 0.2s;
        }
    }
}

.pokedex-modal {
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1010;
    background-color: $modal-shadow;
    display: flex;
    align-items: center;
    justify-content: center;

    &__inner {
        position: relative;
        margin: 0 auto;
        padding: 20px;
        width: 100%;
        max-width: 1000px;
        background-color: white;
        border-radius: 10px;

        h3 {
            text-align: center;
        }

        .fa-times {
            cursor: pointer;
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 24px;
        }

        .pokedex-grid {
            margin-top: 40px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
            max-height: 1000px;
            overflow: auto;

            .image {
                display: block;
                margin: 0 auto;
                max-width: 150px;
            }

            @media only screen and (min-width: 350px) {
                grid-template-columns: 1fr;
                grid-gap: 30px;
                max-height: 500px;
            }

            @media only screen and (min-width: 550px) {
                grid-template-columns: 1fr 1fr;
                max-height: 500px;
            }

            @media only screen and (min-width: 800px) {
                grid-template-columns: 1fr 1fr 1fr;
                max-height: 500px;
            }

            &__inner-caught {
                border: 2px solid $secondary-color;
                border-radius: 10px;
            }

            &__inner-missing {
                border: 2px solid black;
                border-radius: 10px;
            }
        }
    }
}

.guessing-game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}

.bar-flex {
    width: 500px;
    display: flex;
    align-items: center;
}

.game-image>img {
    width: 100%;
    max-width: 600px;
    max-height: 400px;
    margin: 0 auto;
    display: block;
}

.game-controls {
    margin-top: 50px;
    width: 500px;
}

.verdict {
    font-size: 15px;
    text-transform: uppercase;
    margin-bottom: 5px;

    &__correct {
        color: $correct-answer;
    }

    &__incorrect {
        color: $important;
    }
}

.input-skip {
    &>input {
        height: 40px;
        width: 80%;
        outline: none;
        font-size: 15px;
        border: 2px solid $secondary-color;
        border-radius: 10px 0 0 10px;
        margin-right: 10px;

        &.incorrect {
            border: 2px solid $important;

            &::placeholder {
                color: $important;
            }
        }
    }

    &>button {
        cursor: pointer;
        width: 16%;
        background-color: white;
        font-size: 15px;
        border: 2px solid $secondary-color;
        border-radius: 0 10px 10px 0;
        height: 46px;

        &:hover {
            background-color: $secondary-color;
        }
    }
}

.control-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    margin-top: 10px;

    &__submit {
        cursor: pointer;
        width: 50%;
        border: none;
        border-radius: 10px 0 0 10px;
        background-color: $secondary-color;

        &:hover {
            background-color: $primary-color;
        }
    }

    &__pokedex {
        cursor: pointer;
        width: 50%;
        border: none;
        border-radius: 0 10px 10px 0;
        background-color: $secondary-color;

        &:hover {
            background-color: $primary-color;
        }
    }

    &__finish {
        cursor: pointer;
        width: 50%;
        border: none;
        background-color: rgb(222, 111, 111);

        &:hover {
            background-color: rgb(235, 155, 155);
        }
    }
}

.submit {
    cursor: pointer;
    display: block;
    width: 100%;
    background-color: $secondary-color;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    height: 40px;

    &:hover {
        background-color: $primary-color;
    }
}

// Mobile
@media (max-width: 540px) {
    .input-skip {
        &>input {
            width: 79%;
        }

        &>button {
            width: 15%;
        }
    }

    .bar-flex {
        width: 320px;
    }

    .game-controls {
        width: 320px;
    }
}
</style>