// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Pokemon Challenge',
            script: [
                {
                    src: 'https://kit.fontawesome.com/644c1e2c5a.js',
                    crossorigin: 'anonymous'
                }
            ]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    css: [
        '~/assets/styles.scss',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/_colors.scss" as *;',
                },
            },
        },
    },
    modules: [
        // ...
        '@pinia/nuxt',
    ],
})
