<script lang="ts" setup>
const toDosStore = useToDosStore();
</script>

<template>
  <UserHero />
  <div class="flex flex-col gap-y-4">
    <NewToDoInput />
    <ul class="flex flex-col gap-2 max-w-2xl mx-auto w-full" v-auto-animate>
      <li v-for="toDo in toDosStore.toDos" :key="toDo.id">
        <ToDo :toDo="toDo" />
      </li>
    </ul>
    <div class="flex items-center gap-5 max-w-2xl mx-auto w-full h-7">
      <UCheckbox
        v-model="toDosStore.areAllChecked"
        @click="toDosStore.toggleCheckAllToDos"
        name="notifications"
        class="pl-4"
        :ui="{ base: 'h-6 w-6', rounded: 'rounded-full' }"
      />
      <p class="text-black">
        {{
          toDosStore.checkedToDos.length > 0
            ? toDosStore.checkedToDos.length + " checked"
            : "Check all"
        }}
      </p>
      <ButtonDeleteChecked />
    </div>
  </div>
</template>
