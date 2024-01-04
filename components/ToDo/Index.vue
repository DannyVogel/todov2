<script lang="ts" setup>
import type { ToDo } from "@/types/interfaces";

defineProps({
  toDo: {
    type: Object as PropType<ToDo>,
    required: true,
  },
});

const toDosStore = useToDosStore();
</script>

<template>
  <div
    class="px-4 rounded-2xl shadow-sm shadow-black flex items-start bg-white dark:bg-gray-700"
  >
    <UCheckbox
      v-model="toDo.checked"
      name="notifications"
      class="pr-2 pt-3"
      :ui="{ base: 'h-6 w-6', rounded: 'rounded-full' }"
    />
    <UAccordion
      :items="[
        {
          label: `${toDo.text}`,
          defaultOpen: false,
          slot: 'expanded',
        },
      ]"
      :ui="{ wrapper: 'flex flex-col w-full' }"
    >
      <template #default="{ item, index, open }">
        <UButton
          color="white"
          variant="ghost"
          class="border-b border-gray-200 dark:border-gray-700"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <template #leading> </template>
          <span class="truncate">{{ toDo.text }}</span>
          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
          </template>
        </UButton>
      </template>
      <template #expanded="{ item, index, open }">
        <div class="flex flex-col gap-2">
          <p>
            {{ toDo.text }}
          </p>
        </div>
      </template>
    </UAccordion>
    <UButton
      v-if="toDo.checked"
      icon="i-heroicons-trash"
      @click="toDosStore.removeToDo(toDo.id)"
      class="ml-auto mt-2"
      color="rose"
      size="xs"
    />
  </div>
</template>
