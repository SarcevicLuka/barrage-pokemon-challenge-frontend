<template>
    <div class="grid-container">
        <div class="title">You have {{usersPokemon.length}} pokemon</div>
        <div class="pokedex-grid">
            <div v-for="pokemon in usersPokemon">
                <PokemonCard :pokemon="pokemon" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { usePokemonStore } from '~/store/pokemonStore';
    import PokemonCard from '~/components/PokemonCard.vue';

    const store = usePokemonStore();

    let usersPokemon = store.getNewlyGuessedPokemon;

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

        @media only screen and (max-width: 600px) {
            font-size: 30px;
        }
    }

    .pokedex-grid {
        margin: 30px 50px;
        display: grid;
        grid-gap: 20px;

        @media only screen and (min-width: 350px) {
            grid-template-columns: 1fr;
            grid-gap: 30px;
        }
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr;
            .title {
                font-size: 30px;
            }
        }
        @media only screen and (min-width: 800px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
        @media only screen and (min-width: 1100px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        @media only screen and (min-width: 1400px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }
</style>
