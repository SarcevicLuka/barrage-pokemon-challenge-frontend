<template>
    <Navbar />
    <GuessingGameSection />
</template>

<script setup>
    import Navbar from "@/components/layout/Navbar.vue";
    import GuessingGameSection from "@/components/sections/GuessingGameSection.vue";

    definePageMeta({
        middleware: ["auth"]
    });

    const components = {
        Navbar,
        GuessingGameSection
    }
</script>

<style lang="scss" scoped></style>