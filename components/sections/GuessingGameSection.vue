<template>
    <div class="guessing-game">
        <div class="game-image">
            <img :src="pokemon.image" alt="Pokemon logo">
        </div>
        <div class="game-controls">
            <div class="input-skip">
                <transition name="fade">
                    <div class="verdict">
                        <div class="verdict__correct" v-if="isCorrect"> {{ verdict }} </div>
                        <div class="verdict__incorrect" v-else-if="isIncorrect"> {{ verdict }} </div>
                    </div>
                </transition>
                <input v-model="userGuess" type="text" id="guess-input" :class="errors && 'incorrect'"
                    :placeholder="errors ? errors.toString() : 'Take a guess...'">
                <button @click="handleSkip">Skip</button>
            </div>
            <button class="submit" @click.prevent="handleGuess">Guess</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { store } from '~/store';
import { GuessingGamePokemon } from '~/store/types';

const verdict = ref("")
const isCorrect = ref(false)
const isIncorrect = ref(true)
const userGuess = ref("")
const errors = ref("")
const pokemon = reactive<GuessingGamePokemon>({
    image: "",
    guessId: ""
})

onMounted(() => {
    handleSkip()
})

async function handleSkip(): Promise<void> {
    await store.dispatch('getRandomPokemon')
        .then(({ error, gamePokemon }) => {
            errors.value = error
            pokemon.image = gamePokemon.image
            pokemon.guessId = gamePokemon.guessId
        });
}

async function handleGuess(): Promise<void> {
    await store.dispatch('takeAGuess', {
        userGuess: userGuess.value,
        guessId: pokemon.guessId
    })
        .then(({ error, guessVerdict }) => {
            errors.value = error
            verdict.value = guessVerdict
        });

    if (verdict.value === "correct") {
        userGuess.value = ""
        nextTick(() => {
            isCorrect.value = true
            isIncorrect.value = false
            setTimeout(() => isCorrect.value = false, 1000)
        })
        await handleSkip()
    }
    else {
        userGuess.value = ""
        isCorrect.value = false
        isIncorrect.value = true
    }
}
</script>

<style lang="scss" scoped>
.guessing-game {
    height: 89vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.game-image>img {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: block;
}

.game-controls {
    margin-top: 50px;
    width: 400px;
}

.verdict {
    font-size: 15px;
    text-transform: uppercase;
    margin-bottom: 5px;

    &__correct {
        color: green;
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
        width: 15%;
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

.submit {
    cursor: pointer;
    display: block;
    width: 100%;
    margin-top: 10px;
    background-color: $secondary-color;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    height: 40px;

    &:hover {
        background-color: $primary-color;
    }
}
</style>