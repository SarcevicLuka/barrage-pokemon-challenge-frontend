<template>
    <div class="guessing-game">
        <p>Progression:</p>
        <div class="bar-flex">
            {{ pokemonCaught >= 100 ? pokemonCaught : `0${pokemonCaught}` }}
            <GameProgressBar :max-value="200" :value="pokemonCaught" /> 151
          </div>
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
                <button @click="handleSkip">SKIP</button>
            </div>
            <div class="control-buttons">
                <button class="control-buttons__submit" @click.prevent="handleGuess">GUESS</button>
                <button class="control-buttons__finish" @click.prevent="handleFinish">FINISH</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { store } from '~/store';
import { GuessingGamePokemon } from '~/store/types';
import GameProgressBar from '../GameProgressBar.vue'

const userGuess = ref("")
const pokemon = reactive<GuessingGamePokemon>({
    image: "",
    guessId: ""
})
const pokemonCaught = ref(0)
const verdict = ref("")
const isCorrect = ref(false)
const isIncorrect = ref(true)
const errors = ref("")

onMounted(() => {
    handleSkip()
})

async function handleSkip(): Promise<void> {
    verdict.value = ""
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
        pokemonCaught.value += 1
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

async function handleFinish() {

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

.bar-flex {
    width: 500px;
    display: flex;
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
    width: 500px;
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
    
    &__finish {
        cursor: pointer;
        width: 50%;
        border: none;
        border-radius: 0 10px 10px 0;
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
@media (max-width: 450px) {
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