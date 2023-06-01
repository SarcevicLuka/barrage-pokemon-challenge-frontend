<template>
    <div class="home">
        <div class="summary">
            <p class="summary__title">Pokemon guessing game</p>
            <p class="summary__info">Guess the pokemon and add it into your Pokedex</p>
            <p v-if="!isUserLoggedIn" class="summary__account">User must have an
                <NuxtLink class="summary__account-register" to="auth/register">account</NuxtLink>
                to play
            </p>
        </div>
        <div class="hero-container">
            <img src="../../assets/images/pokemon-guess-hero.webp" alt="Pokemon guessing game hero image" />
            <div class="middle">
                <NuxtLink v-if="isUserLoggedIn" class="hero-message" to="user/guessing_game"> PLAY </NuxtLink>
                <NuxtLink v-if="!isUserLoggedIn" class="login-alert" to="auth/login">LOGIN TO PLAY</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isUserLoggedIn: false
        }
    },
}
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

.hero-container:hover .middle {
    opacity: 1;
}

.middle {
    text-align: center;
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

.hero-message {
    text-decoration: none;
    color: black;
    font-size: 25px;
}

.login-alert {
    text-decoration: none;
    color: black;
    font-size: 20px;
}

@media (max-width: 821px) {
    .hero-container {
        margin: 20px 10px;
    }

    .middle > a {
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

        &-register {
            cursor: pointer;
            text-decoration: none;
            color: $important;
            border: 2px solid $important;
            border-radius: 15px;
            padding: 2px 10px;
            font-size: 20px;

            &:hover {
                color: white;
                background-color: $important;
                transition: 0.2s;
            }
        }
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