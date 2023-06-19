<template>
    <div class="guessing-game">
        <div class="game-image">
            <img :src="pokemon.image" alt="Pokemon logo">
        </div>
        <div class="game-controls">
            <div class="input-skip">
                <input 
                    v-model="guess" 
                    type="text" 
                    id="guess-input" 
                    :class="errors && 'incorrect'"
                    :placeholder="errors ? errors.toString() : 'Take a guess...'" 
                    required
                >
                <button @click="handleSkip">Skip</button>
                <div v-if="verdict">{{ verdict }}</div>
            </div>
            <button class="submit" @click.prevent="handleGuess">Guess</button>
        </div>
    </div>
</template>

<script lang="ts">
import { store } from '~/store';

export default {
    mounted() {
        store.dispatch('getRandomPokemon')
    },
    data() {
        return {
            guess: "",
            pokemon: store.state.guessingGamePokemon,
        }
    },
    computed: {
        errors(): string {
            return store.state.errors;
        },
        verdict(): string {
            return store.state.guessVerdict;
        }
    },
    methods: {
        async handleSkip(): Promise<void> {
            await store.dispatch('getRandomPokemon');
            this.pokemon = store.state.guessingGamePokemon
        },
        async handleGuess() {
            await store.dispatch('takeAGuess', this.guess);
            console.log(store.state.guessVerdict)
            if (store.state.guessVerdict === "correct") {
                await store.dispatch('getRandomPokemon')
                this.pokemon = store.state.guessingGamePokemon
            }
        }
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