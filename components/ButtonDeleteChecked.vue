<script lang="ts" setup>
const toDosStore = useToDosStore();
</script>

<template>
  <UButton
    v-if="toDosStore.checkedToDos.length > 1"
    class="max-w-2xl mx-auto"
    size="xs"
    label="Delete Checked"
    icon="i-heroicons-trash"
    color="rose"
    @click="toDosStore.deleteCheckedToDos"
  />
</template>
