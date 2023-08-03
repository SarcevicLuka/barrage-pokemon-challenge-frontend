<template>
    <div class="game-container">
        <div v-if="showFinishGame" class="finish-message">
            <div class="message">
                <h1>You caught {{ newelyCaughtPokemon.length }} new pokemon</h1>
                <h2 v-if="newelyCaughtPokemon.length === 0"> Don't give up</h2>
                <button class="message__try-again" @click.prevent="handleTryAgain">Try again</button>
            </div>
        </div>
        <div v-else-if="!showFinishGame" class="guessing-game">
            <div class="game-image">
                <img :src="pokemon.image" alt="Pokemon logo">
            </div>
            <div class="game-controls">
                <div class="input-skip">
                    <div class="verdict">
                        <div class="verdict__correct" v-if="isCorrect"> CORRECT </div>
                        <div class="verdict__incorrect" v-else-if="isIncorrect"> INCORRECT </div>
                    </div>
                    <input 
                        v-model="userGuess" 
                        type="text" 
                        id="guess-input" 
                        :class="errors && 'incorrect'"
                        :placeholder="errors ? errors.toString() : 'Take a guess...'"
                        @keypress.enter="handleGuess"
                    >
                    <button @click="handleSkip">SKIP</button>
                </div>
                <div class="control-buttons">
                    <button class="control-buttons__submit" @click.prevent="handleGuess">GUESS</button>
                    <button class="control-buttons__finish" @click.prevent="handleFinish">FINISH</button>
                </div>
                <p>Progression: {{ Math.ceil(((newelyCaughtPokemon.length / 151) * 100)) }}%</p>
                <div class="bar-flex">
                    <GameProgressBar :max-value="151" :value="newelyCaughtPokemon.length" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { usePokemonStore } from '~/store/pokemonStore';
    import { GuessingGamePokemon } from '~/store/types';
    import GameProgressBar from '../GameProgressBar.vue';

    const store = usePokemonStore();

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
        verdict.value = "";

        await store.getRandomPokemon()
            .then(({ error, payload }) => {
                errors.value = error;
                pokemon.image = (payload as GuessingGamePokemon).image;
                pokemon.guessId = (payload as GuessingGamePokemon).guessId;
            });
    }

    async function handleGuess(): Promise<void> {
        await store.takeAGuess({
            userGuess: userGuess.value,
            guessId: pokemon.guessId
        })
        .then(({ error, payload }) => {
            errors.value = error;
            verdict.value = (payload as string);
            console.log(verdict.value);
        });

        if (verdict.value === "correct") {
            userGuess.value = ""

            const newPokemon = {
                image: pokemon.image,
                guessId: pokemon.guessId
            }
            newelyCaughtPokemon.push(newPokemon)

            isIncorrect.value = false;
            isCorrect.value = true;
            setTimeout(() => {
                isCorrect.value = false;
            }, 1000)

            await handleSkip()
        }
        else {
            userGuess.value = ""
            isIncorrect.value = true;
        }
    }

    async function handleFinish() {
        showFinishGame.value = true;
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
    .game-container {
        color: $text-color;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.6px);
        border: 1px solid rgba(255, 255, 255, 0.14);
        max-width: 900px;
    }

    .message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    
        &__try-again {
            margin-bottom: 30px;
            cursor: pointer;
            text-decoration: none;
            color: $text-color;
            background: $main-button-color;
            border: none;
            border-radius: 4px;
            padding: 12px 25px;
            font-size: 20px;
            transition: transform .2s;
        
            &:hover {
                transform: scale(1.1);
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
        max-height: 300px;
        margin: 50px 0 auto;
        display: block;
    }
    
    .game-controls {
        margin-top: 50px;
        width: 500px;
    }
    
    .input-skip {
        position: relative;
        padding-top: 20px;  
        
        .verdict {
            position: absolute;
            left: 0;
            top: 0;
            line-height: 18px;
            font-size: 15px;
            text-transform: uppercase;
            margin-bottom: 5px;
            color: $text-color;
        }

        &>input { 
            height: 40px;
            width: 80%;
            outline: none;
            font-size: 15px;
            border: 2px solid white;
            border-radius: 4px 0 0 4px;
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
            color: $text-color;
            font-size: 15px;
            background: $main-button-color;
            border: none;
            border-radius: 0 4px 4px 0;
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
            color: $text-color;
            cursor: pointer;
            width: 50%;
            border: 1px solid $secondary-color;
            border-radius: 4px;
            margin-right: 5px;
            background-color: $primary-color;
        
            &:hover {
                background-color: $secondary-color;
            }
        }
    
        &__finish {
            color: $text-color;
            cursor: pointer;
            width: 50%;
            border: 1px solid $secondary-button-color;
            border-radius: 4px;
            margin-left: 5px;
            background-color: $primary-color;
        
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