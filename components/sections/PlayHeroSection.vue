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
            <img src="../../assets/images/ash.png" alt="Pokemon guessing game hero image" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from "~/store/authStore";
    import { RouteNames } from "../routeNames";

    const store = useAuthStore();

    const isUserLoggedIn = computed(() => store.getIsUserActive);
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        height: 85vh;
        overflow: hidden;
    }
    
    .hero-container {
        height: max-content;
        display: flex;
        justify-content: flex-end;
        margin-right: 100px;
    }
    
    img {
        max-width: 90%;
        height: auto;
    }
    
    .summary {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: start;
        color: rgba(250, 250, 250, 0.832);
        margin-left: 100px;
        margin-top: 80px;
        font-size: 45px;

        & > div {
            margin-top: 30px;
        }
    }

    .start-game {
        cursor: pointer;
        text-decoration: none;
        width: max-content;
        margin-top: 50px;
        color: rgba(250, 250, 250, 0.832);
        background: linear-gradient(45deg, rgba(228, 19, 19, 0.870), rgba(183, 0, 0, 0.589));
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