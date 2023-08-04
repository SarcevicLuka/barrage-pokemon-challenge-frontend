<template>
    <div class="card-container">
        <div class="pokemon">
            <img 
                class="pokemon__image"
                :src="pokemon.image" 
                :alt="pokemon.name"
            >
            <div class="pokemon__name">
                {{pokemon.name}}
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { Pokemon } from '~/store/types';

    defineProps<{
        pokemon: Pokemon
    }>()
</script>

<style lang="scss" scoped>
    .card-container {
        padding: 10px;
        text-transform: capitalize;
        color: $text-color;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.6px);
        border: 1px solid rgba(255, 255, 255, 0.14);
    }

    .pokemon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__image {
            max-width: 60%;
        }

        &__name {
            font-size: 20px;
        }
    }

    .stats {
        display: none;
    }
</style>
