<template>
    <Navbar />
    <GuessingGameSection />
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue";
import GuessingGameSection from "@/components/sections/GuessingGameSection.vue";

export default {
    components: {
        Navbar,
        GuessingGameSection
    }
}
</script>

<style lang="scss" scoped></style>