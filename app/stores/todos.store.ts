// stores/todos.ts
import { onValue, ref as dbRef, push } from "firebase/database";

export const useToDosStore = defineStore("toDos", () => {
  const { writeToDb, removeFromDb } = useDatabase();

  const toDos = ref<Record<string, ToDo>>({});
  const orderedToDos = computed(() => {
    return Object.values(toDos.value).reverse(); // Newest first
  });

  const areAllChecked = computed({
    get(): boolean {
      const todosArray = Object.values(toDos.value);
      return todosArray.length > 0 && todosArray.every((toDo) => toDo.checked);
    },
    set(value: boolean) {
      setAllTodosChecked(value);
    },
  });

  const setAllTodosChecked = (checked: boolean) => {
    const updates: Record<string, ToDo> = {};
    Object.values(toDos.value).forEach((toDo) => {
      updates[toDo.id] = { ...toDo, checked };
    });
    writeToDb(updates);
  };

  const addToDo = (text: string) => {
    const userTodosRef = dbRef(
      $firebase.database,
      `/toDoApp/toDoLists/${userStore.uid}`
    );
    const newTodoRef = push(userTodosRef);

    const newToDo: ToDo = {
      id: newTodoRef.key!,
      text,
      checked: false,
      notes: "",
    };

    writeToDb({ [newTodoRef.key!]: newToDo });
  };

  const removeToDo = (toDoToRemoveId: string) => {
    removeFromDb([toDoToRemoveId]);
  };

  const setToDoChecked = (toDoToCheckId: string, checked: boolean) => {
    const toDo = toDos.value[toDoToCheckId];
    if (toDo) writeToDb({ [toDoToCheckId]: { ...toDo, checked } });
  };

  const updateToDoText = (id: string, text: string) => {
    const toDo = toDos.value[id];
    if (toDo) writeToDb({ [id]: { ...toDo, text } });
  };

  const updateToDoNotes = (id: string, notes: string) => {
    const toDo = toDos.value[id];
    if (toDo) {
      writeToDb({ [id]: { ...toDo, notes } });
    }
  };

  const checkedToDos = computed(() => {
    return Object.values(toDos.value).filter((toDo) => toDo.checked);
  });

  const deleteCheckedToDos = () => {
    const checkedIds = Object.keys(toDos.value).filter(
      (id) => toDos.value[id]?.checked
    );
    if (checkedIds.length > 0) {
      removeFromDb(checkedIds);
    }
  };

  const logout = () => {
    toDos.value = {};
  };

  const { $firebase } = useNuxtApp();
  const userStore = useUserStore();

  const setupListener = () => {
    if (userStore.uid) {
      const userTodosRef = dbRef(
        $firebase.database,
        `/toDoApp/toDoLists/${userStore.uid}`
      );
      onValue(userTodosRef, (snapshot) => {
        const data = snapshot.val();
        toDos.value = data || {};
      });
    }
  };

  watch(
    () => userStore.uid,
    (newUid) => {
      if (newUid) setupListener();
    },
    { immediate: true }
  );

  return {
    toDos,
    orderedToDos,
    areAllChecked,
    addToDo,
    removeToDo,
    setToDoChecked,
    setAllTodosChecked,
    updateToDoText,
    updateToDoNotes,
    checkedToDos,
    deleteCheckedToDos,
    setupListener,
    logout,
  };
});
