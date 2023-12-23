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
    />
    <button
      icon="i-heroicons-plus"
      type="submit"
      class="bg-white border-0 px-4 rounded-r-full py-2 flex items-center"
    >
      <UIcon name="i-heroicons-plus" />
    </button>
  </form>
</template>
