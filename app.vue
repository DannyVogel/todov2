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

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}
onMounted(() => {
  requestPermission();
});
</script>

<template>
  <!-- <a href="https://www.flaticon.com/free-icons/work-order" title="work-order icons">Work-order icons created by Muhammad Atif - Flaticon</a> -->
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
