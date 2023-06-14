<template>
    <div class="login-container">
        <form class="login-form">
            <div class="info-container">
                <p>Log in</p>
                <p v-if="errors" class="error-message">
                    {{ errors }}
                </p>
            </div>
            <input v-model="email" type="email" id="email" placeholder="Enter email" required>
            <input v-model="password" type="password" id="password" placeholder="Enter password" required>
            <button class="submit" @click.prevent="handleLogin" :disabled="pending">
                Log in
            </button>
        </form>
    </div>
</template>

<script>
import { store } from '../../store/index'

export default {
    data() {
        return {
            email: "",
            password: "",
        }
    },
    computed: {
        errors() {
            return store.state.errors;
        },
        pending() {
            return store.state.pending;
        }
    },
    methods: {
        async handleLogin() {
            await store.dispatch(
                'loginUser',
                {
                    email: this.email,
                    password: this.password
                }
            )
        }
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info-container {
    align-self: center;
    text-align: center;
    font-size: 40px;
    position: relative;
    padding-bottom: 30px;

    .error-message {
        padding: 10px;
        background-color: rgb(248, 225, 225);
        border-radius: 5px;
        position: relative;
        bottom: 0;
        font-size: 14px;
        color: $error;
    }
}

.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    padding: 0 30px 30px;
    border: 2px solid $secondary-color;
    border-radius: 10px;

    & input {
        border: 1px solid $secondary-color;
        border-radius: 10px;
        height: 40px;
        margin-top: 10px;
    }
}

.submit {
    cursor: pointer;
    background-color: $secondary-color;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    height: 40px;
    margin-top: 20px !important;

    &:hover {
        background-color: $primary-color;
    }
}

@media (max-width: 821px) {
    .login-container {
        height: 60vh;
    }

    .login-form {
        border: none;
    }
}
</style>