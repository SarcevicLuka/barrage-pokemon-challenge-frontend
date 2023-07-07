<template>
    <div class="home">
        <div class="summary">
            <p class="summary__title">Pokemon guessing game rules:</p>
            <p class="summary__info">Guess the pokemon and add it into your Pokedex</p>
            <p v-if="!isUserLoggedIn" class="summary__account">User must have an account and be logged in to play </p>
        </div>
        <div class="hero-container">
            <img src="../../assets/images/pokemon-guess-hero.webp" alt="Pokemon guessing game hero image" />
            <div class="middle">
                <NuxtLink v-if="isUserLoggedIn" class="middle-button" :to="RouteNames.GuessingGame">
                    PLAY
                </NuxtLink>
                <div v-if="!isUserLoggedIn" class="middle-button">
                    LOGIN TO PLAY
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { store } from "../../store/index";
    import { RouteNames } from "../routeNames";

    const isUserLoggedIn = computed(() => store.state.isUserActive);
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        flex-direction: column;
    }
    
    .hero-container {
        position: relative;
        height: 100%;
        margin: 20px;
        border-radius: 30px;
        box-shadow: 0 8px 8px 0 $shadow-color, 0 10px 20px 0 $shadow-color;
    }
    
    img {
        opacity: 1;
        display: block;
        width: 100%;
        height: auto;
        transition: .5s ease;
        border-radius: 30px;
    }
    
    .hero-container:hover img {
        opacity: 0.6;
    }
    
    .hero-container:hover .middle-button {
        opacity: 1;
    }
    
    .middle-button {
        text-align: center;
        text-decoration: none;
        color: black;
        font-size: 25px;
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        padding: 20px 35px;
        background-color: $primary-color;
        border-radius: 20px;
    
        &:hover {
            background-color: $secondary-color;
            transition: .5s;
        }
    }
    
    @media (max-width: 821px) {
        .hero-container {
            margin: 20px 10px;
        }
    
        .middle>a {
            font-size: 15px;
        }
    }
    
    .summary {
        text-align: center;
        margin: 20px;
        border-radius: 30px;
        box-shadow: $shadow-color 0px 8px 24px;
    
        &__title {
            font-size: 30px;
        }
    
        &__info {
            font-size: 25px;
        }
    
        &__account {
            color: $important;
            font-size: 20px;
        }
    }
    
    @media (max-width: 821px) {
        .summary {
            margin: 5px;
        }
    
        .summary>p {
            font-size: 15px;
        }
    }
</style>