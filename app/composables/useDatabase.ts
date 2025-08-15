import {
  ref as dbRef,
  get,
  update,
  type DataSnapshot,
} from "firebase/database";

export const useDatabase = () => {
  const userStore = useUserStore();
  const toDosStore = useToDosStore();
  const { $firebase } = useNuxtApp();

  const getToDos = () => {
    const toDoListRef = dbRef(
      $firebase.database,
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
    return update($firebase.toDoDB, updates);
  };

  return { writeToDosToDB, getToDos };
};
