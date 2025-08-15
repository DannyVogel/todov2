import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef } from "firebase/database";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(nuxtApp.$config.public.firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  const toDoDB = dbRef(database, "/toDoApp");
  const toDoListsDB = dbRef(database, "/toDoApp/toDoLists");

  const firebase = {
    database,
    auth,
    toDoDB,
    toDoListsDB,
  };
  return {
    provide: {
      firebase,
    },
  };
});
