<template>
    <div class="form-container">
        <form class="form">
            <div class="info-container">
                <p>Log in</p>
                <p v-if="error" class="error-message">
                    {{ error }}
                </p>
            </div>
            <input v-model="userData.email" type="email" id="email" placeholder="Enter email" required>
            <input v-model="userData.password" type="password" id="password" placeholder="Enter password" required>
            <button class="submit" @click.prevent="handleLogin" :disabled="pending">
                Log in
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { LoginUserData } from '~/store/types';
    import { store } from '../../store/index';
    
    const error = ref("")
    const userData = reactive<LoginUserData>({
        email: "",
        password: ""
    })
    const pending = store.state.pending;
    
    async function handleLogin(): Promise<void> {
        await store.dispatch(
            'authHandler',
            {
                path: "auth/login",
                userData
            }
        )
        .then((err) => {
            console.log(err);
            error.value = err;
        })
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/authForm.scss"
</style>