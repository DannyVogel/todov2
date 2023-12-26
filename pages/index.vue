<script lang="ts" setup>
const toDosStore = useToDosStore();
const userStore = useUserStore();
</script>

<template>
  <Title>{{ userStore.username && userStore.username + "'s" }} ToDo</Title>
  <UserHero />
  <div class="flex flex-col gap-y-4">
    <NewToDoInput />
    <ul class="flex flex-col gap-2 max-w-2xl mx-auto w-full" v-auto-animate>
      <li v-for="toDo in toDosStore.toDos" :key="toDo.id">
        <ToDo :toDo="toDo" />
      </li>
    </ul>
  </div>
</template>
