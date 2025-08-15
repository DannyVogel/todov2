export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vite-pwa/nuxt",
  ],
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },
  colorMode: {
    preference: "light",
    classSuffix: "",
  },
  pwa: {
    manifest: {
      name: "ToDo App",
      short_name: "ToDo",
      description: "A complete ToDo PWA built with Nuxt.js",
      theme_color: "#0891b2",
      lang: "en",
      display: "standalone",
      icons: [
        {
          src: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "128x128",
          type: "image/png",
        },
      ],
      share_target: {
        action: "/share-target/",
        method: "GET",
        params: {
          title: "title",
          text: "text",
          url: "url",
        },
      },
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  runtimeConfig: {
    public: {
      firebaseConfig: {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
      },
    },
  },
  compatibilityDate: "2025-08-15",
});
