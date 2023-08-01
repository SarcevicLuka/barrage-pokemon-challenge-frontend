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
                        Login
                    </NuxtLink>
                </li>
                <li v-if="!isUserLoggedIn">
                    <NuxtLink class="auth-link-register" :to="RouteNames.Register">
                        Register
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
        padding: 30px 50px;
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
        color: rgba(228, 19, 19, 0.870);
        font-size: 20px;
        font-weight: 500;
        margin-right: 30px;

        &:hover {
            border-bottom: 2px solid rgba(228, 19, 19, 0.870);
            transition: 0.15s;
        }
    }

    .auth-link-register,
    .nav-list-pokedex {
        cursor: pointer;
        text-decoration: none;
        color: rgba(250, 250, 250, 0.832);
        background: linear-gradient(45deg, rgba(228, 19, 19, 0.870), rgba(183, 0, 0, 0.589));
        border-radius: 4px;
        padding: 12px 25px;
        font-size: 20px;
        margin-right: 30px;
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
        color: rgba(228, 19, 19, 0.870);
        transform: scale(2);
    }

    .navbar .navbar__inner-links.active {
        top: 0;
        background-color: linear-gradient(315deg, rgba(0, 0, 197, 0.671), rgba(183, 0, 0, 0.696));
    }

    .fa-times {
        top: 50px;
        right: 30px;
        position: absolute;
        color: rgba(228, 19, 19, 0.870);
        transform: scale(2);
        display: block;
    }

    @media (max-width: 821px) {
        .navbar {
            justify-content: space-between;
            padding: 2em;
        }

        .navbar .navbar__inner-links {
            background: linear-gradient(315deg, rgba(0, 0, 197, 1), rgba(183, 0, 0, 1));            
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