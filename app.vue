<script setup lang="ts">
import { onAuthStateChanged, auth, type User } from "~/config/firebase";
const userStore = useUserStore();
const toDosStore = useToDosStore();
const { getToDos } = useDatabase();

onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    const userInfo = {
      username: user.displayName,
      uid: user.uid,
      isLogged: true,
    };
    userStore.setLoggedInUser(userInfo);
    getToDos();
  } else {
    userStore.logout();
    toDosStore.logout();
  }
});
</script>

<template>
  <!-- <a href="https://www.flaticon.com/free-icons/work-order" title="work-order icons">Work-order icons created by Muhammad Atif - Flaticon</a> -->
  <NuxtPwaManifest />
  <NuxtLayout>
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
