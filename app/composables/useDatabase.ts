import {
  ref as dbRef,
  get,
  update,
  type DataSnapshot,
} from "firebase/database";

export const useDatabase = () => {
  const userStore = useUserStore();
  const { $firebase } = useNuxtApp();

  const getFromDb = () => {
    if (!userStore.uid) return;

    const toDoListRef = dbRef(
      $firebase.database,
      `/toDoApp/toDoLists/${userStore.uid}`
    );
    get(toDoListRef).then((snapshot: DataSnapshot) => {
      const toDosStore = useToDosStore();
      toDosStore.toDos = snapshot.val() || {};
    });
  };

  const writeToDb = (toDos: Record<string, ToDo>) => {
    if (!userStore.uid) return;

    const updates: Record<string, ToDo> = {};
    Object.entries(toDos).forEach(([id, toDo]) => {
      updates[`${userStore.uid}/${id}`] = toDo;
    });

    update($firebase.toDoListsDB, updates).catch((error) => {
      console.error("Failed to write to database:", error);
    });
  };

  const removeFromDb = (toDoIds: string[]) => {
    if (!userStore.uid) return;

    const updates: Record<string, null> = {};
    toDoIds.forEach((id) => {
      updates[`${userStore.uid}/${id}`] = null;
    });

    update($firebase.toDoListsDB, updates).catch((error) => {
      console.error("Failed to remove from database:", error);
    });
  };

  return { writeToDb, getFromDb, removeFromDb };
};
