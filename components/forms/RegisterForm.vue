<template>
    <div class="form-container">
        <form class="form">
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
            <button class="submit" @click.prevent="handleRegister" :disabled="pending">
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
        },
        pending() {
            return store.state.pending;
        }
    },
    methods: {
        async handleRegister() {
            await store.dispatch(
                'registerUser',
                {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    password: this.password
                }
            )
        }
    }
}

</script>

<style lang="scss" scoped>
    @import "@/assets/styles/authForm.scss"
</style>