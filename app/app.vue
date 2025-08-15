<script setup lang="ts">
// import { onAuthStateChanged } from "~/config/firebase";
// import type { User } from "firebase/auth";
// import logo from "~/assets/logo.png";

// const userStore = useUserStore();
// const toDosStore = useToDosStore();
// const { getToDos } = useDatabase();
// const { $firebase } = useNuxtApp();

const loading = ref(false);

// onAuthStateChanged($firebase.auth, (user: User | null) => {
//   if (user) {
//     const userInfo = {
//       username: user.displayName,
//       uid: user.uid,
//       isLogged: true,
//     };
//     userStore.setLoggedInUser(userInfo);
//     getToDos();
//     setTimeout(() => {
//       loading.value = false;
//     }, 1000);
//   } else {
//     userStore.logout();
//     toDosStore.logout();
//     setTimeout(() => {
//       loading.value = false;
//     }, 1000);
//   }
// });

useHead({
  htmlAttrs: { lang: "en" },
  title: "ToDo",
  meta: [{ name: "ToDo", content: "A complete ToDo PWA built with Nuxt.js." }],
});

const { test } = useRuntimeConfig().public;
console.log("app test", test);
</script>

<template>
  <!-- <a href="https://www.flaticon.com/free-icons/work-order" title="work-order icons">Work-order icons created by Muhammad Atif - Flaticon</a> -->
  <NuxtPwaManifest />
  <NuxtLayout>
    <Loader v-if="loading" />
    <NuxtPage v-else />
  </NuxtLayout>
  <UNotifications />
</template>
