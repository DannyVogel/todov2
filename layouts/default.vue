<script lang="ts" setup></script>
<template>
  <div
    class="bg-orange-100 min-h-screen flex flex-col gap-2 px-4 bg-gradient-to-t from-purple-900 to-cyan-600"
  >
    <Header />
    <div class="flex-grow">
      <slot />
    </div>
  </div>
</template>

<style></style>
