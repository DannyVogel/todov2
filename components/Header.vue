<script lang="ts" setup>
const showAuthModal = ref(false);
</script>

<template>
  <div class="flex items-center gap-x-10 gap-y-2 flex-wrap sm:flex-nowrap h-14">
    <ColorToggle />
    <UButton
      icon="i-heroicons-user-circle"
      color="white"
      variant="ghost"
      size="xl"
      class="ml-auto"
      @click="showAuthModal = true"
      name="Login"
    />
  </div>
  <UModal v-model="showAuthModal">
    <AuthModal @close="showAuthModal = false" />
  </UModal>
  <!-- <PWARefresh /> -->
</template>
