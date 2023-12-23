// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },
  colorMode: {
    preference: "light",
    classSuffix: "",
  },
});
