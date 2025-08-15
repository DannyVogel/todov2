<script setup>
// If you want to use it in setup, import from the nuxtApp.
const { $pwa } = useNuxtApp();

const toast = useToast();

onMounted(() => {
  toast.add({ title: "Mounted" });
  if ($pwa) {
    console.log("PWA is available", $pwa);
    $pwa?.isPWAInstalled && toast.add({ title: "App installed" });
  }
  if ($pwa.offlineReady) toast.add({ title: "App ready to work offline" });
});
</script>

<template>
  <!-- You can use $pwa directly in templates! -->
  <!-- <div v-show="$pwa.needRefresh">
    <span> New content available, click on reload button to update. </span>

    <button @click="$pwa.updateServiceWorker()">Reload</button>
  </div> -->
</template>
