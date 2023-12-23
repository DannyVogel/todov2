<script lang="ts" setup>
const toDosStore = useToDosStore();
const items = [
  {
    label: "Getting Started",
    icon: "i-heroicons-information-circle",
    defaultOpen: false,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
];
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <Input />
    <ul class="flex flex-col gap-2" v-auto-animate>
      <li v-for="toDo in toDosStore.toDos" :key="toDo.id">
        <div
          class="px-4 bg-white rounded-2xl shadow-sm shadow-black flex items-start"
        >
          <UCheckbox
            v-model="toDo.checked"
            name="notifications"
            class="pr-2 pt-3"
          />
          <UAccordion
            :items="items"
            :ui="{ wrapper: 'flex flex-col w-full bg-white' }"
          >
            <template #default="{ item, index, open }">
              <UButton
                color="gray"
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
          </UAccordion>
          <UButton
            v-if="toDo.checked"
            icon="i-heroicons-trash"
            @click="toDosStore.removeToDo(toDo.id)"
            class="ml-auto mt-2"
            color="red"
            size="xs"
          />
        </div>
        <!-- <div class="">
            <p class="truncate" :class="toDo.checked && 'line-through'">
              {{ toDo.text }}
            </p>
          </div> -->
      </li>
    </ul>
  </div>
</template>
