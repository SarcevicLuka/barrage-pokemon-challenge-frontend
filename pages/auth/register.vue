<template>
    <div class="register-container">
        <form class="register-form">
            <div class="info-container">
                <p>Create an account</p>
                <p v-if="errors" class="error-message">
                    {{ errors }}
                </p>
            </div>
            <input v-model="email" type="email" id="email" placeholder="Enter email" required>
            <input v-model="firstName" type="text" id="firstName" placeholder="Enter first name" required>
            <input v-model="lastName" type="text" id="lastName" placeholder="Enter last name" required>
            <input v-model="password" type="password" id="password" placeholder="Enter password" required>
            <button class="submit" @click.prevent="handleRegister">
                Register
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
            firstName: "",
            lastName: "",
            password: "",
        }
    },
    computed: {
        errors() {
            return store.state.errors;
        }
    },
    methods: {
        handleRegister() {
            store.dispatch('registerUser', {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.register-container {
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

.register-form {
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
    .register-container {
        height: 60vh;
    }

    .register-form {
        border: none;
    }
}
</style>