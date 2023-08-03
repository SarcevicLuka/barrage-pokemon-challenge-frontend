<template>
    <div class="home">
        <div class="summary">
            <div class="summary__title"> Pokemon guessing game </div>
            <div class="summary__info"> Guess the pokemon and add it into your Pokedex </div>
            <NuxtLink class="start-game" :to="RouteNames.GuessingGame">
                PLAY NOW
            </NuxtLink>
        </div>
        <div class="hero-container">
            <img src="../../assets/images/gengar.png" alt="Pokemon guessing game hero image" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from "~/store/authStore";
    import { RouteNames } from "../routeNames";

    const store = useAuthStore();

    //const isUserLoggedIn = computed(() => store.getIsUserActive);
    const isUserLoggedIn = true;
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .hero-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        margin-right: 50px;
    }
    
    img {
        max-width: 70%;
        height: auto;
    }
    
    .summary {
        min-width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: start;
        color: $text-color;
        margin-left: 100px;
        margin-top: 80px;

        &__title {
            font-size: 60px;
        }

        &__info {
            margin-top: 70px;
            font-size: 35px;
        }
    }

    .start-game {
        cursor: pointer;
        text-decoration: none;
        width: max-content;
        margin-top: 50px;
        color: $text-color;
        background: $main-button-color;
        border-radius: 4px;
        padding: 18px 30px;
        font-size: 20px;
        transition: transform .2s;

        &:hover {
            transform: scale(1.1);
        }
    }

    @media (max-width: 821px) {
        img {
            display: none;
        }

        .summary {
            margin-top: 40px;
            margin-left: 40px;
        }
    }
</style>