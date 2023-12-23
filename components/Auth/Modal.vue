import type { UButton } from '#build/components';
<script lang="ts" setup>
import type { AuthForm } from "~/types/interfaces";
const emit = defineEmits(["close"]);

const userStore = useUserStore();
const { signIn, signUp, logInAsGuest, logout } = useAuth();
const { getToDos } = useDatabase();

const items = [
  {
    key: "login",
    label: "Log In",
    description: "Log in to your account.",
  },
  {
    key: "signup",
    label: "Sign Up",
    description: "Create a new account.",
  },
  {
    key: "guest",
    label: "Guest Log In",
    description: "Log in as Guest.",
  },
];

const form = reactive<AuthForm>({ email: "", password: "", name: "" });

const onSubmit = async (key: string, form: AuthForm) => {
  console.log("Submitted form:", key, form);
  if (key === "login") {
    await signIn(form.email, form.password);
  } else if (key === "signup") {
    await signUp(form.email, form.password, form.name);
  }
  if (userStore.isLogged) {
    emit("close");
  }
};

const guestLogIn = async () => {
  await logInAsGuest();
  if (userStore.isLogged) {
    getToDos();
    emit("close");
  }
};

const signOut = async () => {
  await logout();
  emit("close");
};
</script>

<template>
  <UTabs v-if="!userStore.isLogged" :items="items" class="w-full">
    <template #item="{ item }">
      <UCard @submit.prevent="() => onSubmit(item.key, form)">
        <template #header>
          <p
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template>

        <div v-if="item.key === 'login'" class="space-y-3">
          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput v-model="form.password" />
          </UFormGroup>
        </div>
        <div v-else-if="item.key === 'signup'" class="space-y-3">
          <UFormGroup label="Name" name="name" required>
            <UInput v-model="form.name" required />
          </UFormGroup>
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="form.email" required />
          </UFormGroup>
          <UFormGroup label="Password" name="Password" required>
            <UInput v-model="form.password" type="password" required />
          </UFormGroup>
        </div>
        <div
          v-else-if="item.key === 'guest'"
          class="flex justify-center space-y-3"
        >
          <UButton @click="guestLogIn"> Log in as Guest </UButton>
        </div>

        <template #footer>
          <div v-if="item.key !== 'guest'" class="flex">
            <UButton type="submit">
              {{ item.key === "login" ? "Log In" : "Sign Up" }}
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UTabs>
  <div v-else class="py-10 flex flex-col gap-4 justify-center items-center">
    <p class="text-2xl">Welcome, {{ userStore.username }}!</p>
    <UButton @click="signOut">Log Out</UButton>
  </div>
</template>
