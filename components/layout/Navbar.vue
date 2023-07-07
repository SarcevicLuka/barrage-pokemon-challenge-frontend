<template>
    <nav class="navbar">
        <div class="navbar__inner-logo">
            <NuxtLink :to="RouteNames.Home">
                <img src="../../assets/images/pokemon_logo.png" alt="Pokemon logo" class="logo">
            </NuxtLink>
        </div>

        <i class="fas fa-bars" @click="isNavFullScreen = !isNavFullScreen"></i>

        <div class="navbar__inner-links" :class="{ active: isNavFullScreen }">
            <i class="fas fa-times" @click="isNavFullScreen = !isNavFullScreen"></i>
            <ul class="nav-list" @click="isNavFullScreen = !isNavFullScreen">
                <li v-if="isUserLoggedIn">
                    <NuxtLink class="nav-list-log" @click="handleLogout">
                        LOG OUT
                    </NuxtLink>
                </li>
                <li v-if="isUserLoggedIn">
                    <NuxtLink class="nav-list-pokedex" :to="RouteNames.Pokedex">
                        POKEDEX
                    </NuxtLink>
                </li>
                <li v-if="!isUserLoggedIn">
                    <NuxtLink class="auth-link-log" :to="RouteNames.Login">
                        LOGIN
                    </NuxtLink>
                </li>
                <li v-if="!isUserLoggedIn">
                    <NuxtLink class="auth-link-register" :to="RouteNames.Register">
                        REGISTER
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    import { useAuthStore } from "~/store/authStore";
    import { RouteNames } from "../routeNames";
    import { ref } from "vue";

    const store = useAuthStore();

    const isUserLoggedIn = computed(() => store.getIsUserActive);
    
    const isNavFullScreen = ref(false);

    function handleLogout() {
        store.logout();
    }
</script>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        background-color: $primary-color;

        &__inner-links {
            display: flex;
            justify-content: flex-end;
            width: 80%;
        }

        &__inner-logo .logo {
            width: 150px;
        }
    }

    .nav-list {
        list-style-type: none;
        display: flex;
    }

    .auth-link-log {
        cursor: pointer;
        text-decoration: none;
        color: black;
        font-size: 20px;
        margin-right: 30px;

        &:hover {
            color: $link-hover-color;
            border-bottom: 2px solid $link-hover-color;
            transition: 0.15s;
        }
    }

    .auth-link-register,
    .nav-list-pokedex {
        cursor: pointer;
        text-decoration: none;
        color: $primary-color;
        background-color: $link-hover-color;
        border: 2px solid $link-hover-color;
        border-radius: 15px;
        padding: 8px;
        font-size: 20px;
        margin-right: 30px;

        &:hover {
            color: $link-hover-color;
            background-color: $primary-color;
            border-color: $link-hover-color;
            transition: 0.2s;
        }
    }

    .nav-list-log {
        cursor: pointer;
        text-decoration: none;
        color: black;
        font-size: 20px;
        margin-right: 30px;

        &:hover {
            color: $link-hover-color;
            border-bottom: 2px solid $link-hover-color;
            transition: 0.15s;
        }
    }

    .fa-bars {
        color: black;
        transform: scale(2);
    }

    .navbar .navbar__inner-links.active {
        top: 0;
    }

    .fa-times {
        top: 30px;
        right: 30px;
        position: absolute;
        color: black;
        transform: scale(2);
        display: block;
    }

    @media (max-width: 821px) {
        .navbar {
            justify-content: space-between;
            padding: 2em;
        }

        .navbar .navbar__inner-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            z-index: 5;
            right: 0;
            top: -100%;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: $primary-color;
            transition: all 0.6s;
        }

        .nav-list {
            width: 100%;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & li {
                margin-top: 50px;
            }

            & a {
                font-size: 40px;
            }
        }
    }

    @media (min-width: 821px) {
        .fa-bars {
            display: none;
        }

        .fa-times {
            display: none;
        }
    }
</style>