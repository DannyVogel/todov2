<script setup lang="ts">
import { onAuthStateChanged, auth, type User } from "~/config/firebase";
import logo from "~/assets/logo.png";

const userStore = useUserStore();
const toDosStore = useToDosStore();
const { getToDos } = useDatabase();

const loading = ref(true);

onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    const userInfo = {
      username: user.displayName,
      uid: user.uid,
      isLogged: true,
    };
    userStore.setLoggedInUser(userInfo);
    getToDos();
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

useSeoMeta({
  title: "ToDo",
  ogTitle: "ToDo",
  description: "A complete ToDo PWA built with Nuxt.js",
  ogDescription: "A complete ToDo PWA built with Nuxt.js",
  ogImage: logo,
  twitterCard: "summary_large_image",
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
