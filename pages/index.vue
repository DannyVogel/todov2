<script lang="ts" setup>
import { getMessaging, onMessage } from "firebase/messaging";
const toDosStore = useToDosStore();
const userStore = useUserStore();

const toast = useToast();

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  toast.add({ title: payload.toString() });
  console.log("Message received. ", payload);
  // ...
});
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
  </div>
</template>
