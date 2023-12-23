import type { ToDo } from "~/types/interfaces";
import { get, ref as dbRef, update, toDoDB, database } from "~/config/firebase";
import { DataSnapshot } from "firebase/database";

export const useDatabase = () => {
  const userStore = useUserStore();
  const toDosStore = useToDosStore();

  const getToDos = () => {
    const toDoListRef = dbRef(
      database,
      "/toDoApp/toDoLists/" + `${userStore.uid}`
    );
    get(toDoListRef).then((snapshot: DataSnapshot) => {
      snapshot.exists()
        ? toDosStore.setUserToDoList(snapshot.val())
        : toDosStore.setUserToDoList([]);
    });
  };

  const writeToDosToDB = (toDos: ToDo[]) => {
    const updates: Record<string, any> = {};
    updates["/toDoLists/" + userStore.uid] = toDos;
    return update(toDoDB, updates);
  };

  return { writeToDosToDB, getToDos };
};
