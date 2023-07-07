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
    import { useAuthStore } from '~/store/authStore'; 
    import { LoginUserData } from '~/store/types';
    
    const authStore = useAuthStore();
    const error = ref("");
    const userData = reactive<LoginUserData>({
        email: "",
        password: ""
    });
    const pending = ref(false);
    
    async function handleLogin(): Promise<void> {
        await authStore.authHandler(
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