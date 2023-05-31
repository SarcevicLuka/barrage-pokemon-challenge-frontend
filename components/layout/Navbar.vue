<script setup>
import { ref } from "vue";

const isNavFullScreen = ref(false);
</script>

<template>
    <nav class="navbar">
        <div class="navbar__inner-logo">
            <NuxtLink to="/">
                <img src="../../assets/images/pokemon_logo.png" alt="Pokemon logo" class="logo">
            </NuxtLink>
        </div>

        <i class="fas fa-bars" @click="isNavFullScreen = !isNavFullScreen"></i>

        <div class="navbar__inner-links" :class="{ active: isNavFullScreen }">
            <i class="fas fa-times" @click="isNavFullScreen = !isNavFullScreen"></i>
            <ul class="nav-list" @click="isNavFullScreen = !isNavFullScreen">
                <li>
                    <NuxtLink class="nav-list__item" to="/pokedex">
                        Pokedex
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: beige;

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

    &__item {
        text-decoration: none;
        color: black;
        font-size: 25px;
        font-weight: 600;
        margin-right: 20px;
        border-bottom: 2px solid black;
    }
    &__item:hover {
        cursor: pointer;
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
    top: 34px;
    right: 32px;
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
        z-index: 3;
        left: 0;
        top: -100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: beige;
        transition: all 0.8s;
    }

    .nav-list {
        width: 100%;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .nav-list a {
        padding: 1em;
        text-align: center;
        width: 100%;
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