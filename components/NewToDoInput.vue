<script lang="ts" setup>
const toDosStore = useToDosStore();

const text = ref("");

const addToDo = () => {
  if (!text.value) return;
  toDosStore.addToDo(text.value);
  text.value = "";
};
</script>

<template>
  <form @submit.prevent="addToDo" class="flex justify-center">
    <input
      v-model="text"
      class="rounded-l-full text-center w-60"
      placeholder="Type new ToDo here..."
      name="newToDo"
    />
    <UButton
      icon="i-heroicons-plus"
      size="xl"
      color="white"
      :ui="{ rounded: 'rounded-r-full' }"
      class="w-12 h-12"
    />
  </form>
</template>
