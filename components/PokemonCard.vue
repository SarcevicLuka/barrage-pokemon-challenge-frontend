<template>
    <div class="card-container">
        <div class="pokemon">
            <img class="pokemon__image" :src="pokemon.image" :alt="pokemon.name">
            <div class="pokemon__name">
                {{ pokemon.name }}
            </div>
            <div class="additional-info">
                <table>
                    <caption>{{pokemon.name}} info</caption>
                    <tr>
                      <td>Height:</td>
                      <td>{{pokemon.height}}</td>
                    </tr>
                    <tr>
                      <td>Weight:</td>
                      <td>{{pokemon.weight}}</td>
                    </tr>
                    <tr>
                        <td>Base experience:</td>
                        <td>{{pokemon.baseExperience}}</td>
                    </tr>
                    <tr>
                      <td>Caught:</td>
                      <td>{{pokemon.createdAt.slice(0, 10)}}</td>
                    </tr>
                  </table>
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
        text-transform: capitalize;
        color: $text-color;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.6px);
        border: 1px solid rgba(255, 255, 255, 0.14);
        transition: 0.2s;

        &:hover {
            transform: translateY(-5px);
        }
    }

    .pokemon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;

        &__image {
            max-width: 70%;
        }

        &__name {
            font-size: 20px;
        }
    }

    .additional-info {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: rgba(22, 21, 21, 0.737);
        font-size: 15px;
        border-radius: 16px;
        position: absolute;
        background: rgba(232, 225, 225, 0.804);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transition: 0.2s;

        table {
            width: 80%;

            caption {
                font-size: 20px;
                margin-bottom: 15px;
            }

            tr {
                height: 30px;
            }
        }
    }

    .additional-info:hover {
        opacity: 1;
    }
</style>
