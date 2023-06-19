<template>
    <div class="form-container">
        <form class="form">
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

<script lang="ts">
import { store } from '../../store/index'

export default {
    data() {
        return {
            email: "",
            password: "",
        }
    },
    computed: {
        errors(): string {
            return store.state.errors;
        },
        pending(): boolean {
            return store.state.pending;
        }
    },
    methods: {
        async handleLogin(): Promise<void> {
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
    @import "@/assets/styles/authForm.scss"
</style>