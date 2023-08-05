<template>
    <div>
        <PlayHeroSection />
    </div>
</template>

<script setup>
    import PlayHeroSection from '@/components/sections/PlayHeroSection.vue';
</script>

<style lang="scss" scoped>
    div {
        max-height: 20%;
    }
    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }
</style>