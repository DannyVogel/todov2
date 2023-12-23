<script lang="ts" setup>
const toDosStore = useToDosStore();
const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col items-center text-4xl font-extrabold mb-4">
    <h1 className="title">
      {{ userStore.username && `${userStore.username}'s` }}
    </h1>
    <h1 className="title">ToDo List</h1>
  </div>
  <div class="flex flex-col gap-y-4">
    <Input />
    <ul class="flex flex-col gap-2 max-w-2xl mx-auto w-full" v-auto-animate>
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
            :items="[
              {
                label: `${toDo.text}`,
                defaultOpen: false,
                slot: 'expanded',
              },
            ]"
            :ui="{ wrapper: 'flex flex-col w-full bg-white' }"
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
                <p>{{ toDo.text }}</p>
              </div>
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
      </li>
    </ul>
  </div>
</template>
