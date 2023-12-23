import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const isLogged = ref(false);
  const username = ref("");
  const uid = ref("");

  const setLoggedInUser = (user: any) => {
    username.value = user.username;
    uid.value = user.uid;
    isLogged.value = true;
  };

  const logout = () => {
    username.value = "";
    uid.value = "";
    isLogged.value = false;
  };

  return { isLogged, username, uid, setLoggedInUser, logout };
});
