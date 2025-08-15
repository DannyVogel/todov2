<script lang="ts" setup>
const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col items-center text-4xl font-extrabold mb-4">
    <h1 class="">
      {{ userStore.username && `${userStore.username}'s` }}
    </h1>
    <h1 class="">ToDo List</h1>
  </div>
</template>
