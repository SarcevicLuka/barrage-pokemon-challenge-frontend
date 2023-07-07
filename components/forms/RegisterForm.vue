<template>
    <div class="form-container">
        <form class="form">
            <div class="info-container">
                <p>Create an account</p>
                <p v-if="error" class="error-message">
                    {{ error }}
                </p>
            </div>
            <input v-model="userData.email" type="email" id="email" placeholder="Enter email" required>
            <input v-model="userData.firstName" type="text" id="firstName" placeholder="Enter first name" required>
            <input v-model="userData.lastName" type="text" id="lastName" placeholder="Enter last name" required>
            <input v-model="userData.password" type="password" id="password" placeholder="Enter password" required>
            <button class="submit" @click.prevent="handleRegister" :disabled="pending">
                Register
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '~/store/authStore';
    import { RegisterUserData } from '~/store/types';
    
    const authStore = useAuthStore();
    const error = ref("");
    const userData = reactive<RegisterUserData>({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    const pending = ref(false);
    
    async function handleRegister(): Promise<void> {
        await authStore.authHandler(
            {
                path: "auth/register",
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