<template>
    <div class="grid-container">
        <div class="title">You have {{store.getNewlyGuessedPokemon.length}} pokemon</div>
        <div class="pokedex-grid">
            <div v-for="pokemon in store.getNewlyGuessedPokemon">
                <PokemonCard :pokemon="pokemon" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { usePokemonStore } from '~/store/pokemonStore';
    import PokemonCard from '~/components/PokemonCard.vue';

    const store = usePokemonStore();

    onMounted(() => {
        getPokemon();
    })
    
    async function getPokemon(): Promise<void> {
        await store.getGuessedPokemon()
    }
</script>

<style lang="scss" scoped>
    .grid-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        color: $text-color;
        margin: 10px auto;
        font-size: 40px;
    }

    .pokedex-grid {
        margin: 30px 50px;
        display: grid;
        grid-gap: 20px;
        max-height: 140px;
        overflow: auto;

        @media only screen and (min-width: 350px) {
            grid-template-columns: 1fr;
            grid-gap: 30px;
            max-height: 1000px;
        }
        @media only screen and (max-width: 550px) {
            grid-template-columns: 1fr 1fr;
            max-height: 800px;
        }
        @media only screen and (min-width: 800px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            max-height: 800px;
        }
        &__inner-correct {
            border: 2px solid black;
            border-radius: 10px;
            .pokemon-image {
                display: block;
                margin: 0 auto;
                max-width: 150px;
            }
        }

    }
</style>
