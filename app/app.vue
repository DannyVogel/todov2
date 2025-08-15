<script setup lang="ts">
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

const userStore = useUserStore();
const toDosStore = useToDosStore();
const { getFromDb } = useDatabase();
const { $firebase } = useNuxtApp();

const loading = ref(true);

onAuthStateChanged($firebase.auth, (user: User | null) => {
  if (user) {
    const userInfo = {
      username: user.displayName,
      uid: user.uid,
      isLogged: true,
    };
    userStore.setLoggedInUser(userInfo);
    getFromDb();
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } else {
    userStore.logout();
    toDosStore.logout();
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
});

useHead({
  htmlAttrs: { lang: "en" },
  title: "ToDo",
  meta: [{ name: "ToDo", content: "A complete ToDo PWA built with Nuxt.js." }],
});
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
