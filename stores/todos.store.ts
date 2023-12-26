import type { ToDo } from "~/types/interfaces";
import { v4 as uuidv4 } from "uuid";

export const useToDosStore = defineStore(
  "toDos",
  () => {
    const toDos = ref<ToDo[]>([]);

    const setUserToDoList = (newTodos: ToDo[]) => {
      toDos.value = newTodos;
    };

    const addToDo = (text: string) => {
      const newToDo: ToDo = {
        id: uuidv4(),
        text,
        checked: false,
      };
      toDos.value.push(newToDo);
    };

    const removeToDo = (toDoToRemoveId: string) => {
      toDos.value = toDos.value.filter((toDo) => toDo.id !== toDoToRemoveId);
    };

    const setToDoChecked = (toDoToCheckId: string, checked: boolean) => {
      const toDoToCheck = toDos.value.find(
        (toDo) => toDo.id === toDoToCheckId
      ) as ToDo;
      toDoToCheck.checked = checked;
    };

    const logout = () => {
      toDos.value = [];
    };

    const { writeToDosToDB } = useDatabase();
    const userStore = useUserStore();
    watch(
      toDos,
      (newToDos) => {
        if (!userStore.uid) return;
        writeToDosToDB(newToDos);
      },
      { deep: true }
    );

    return {
      toDos,
      setUserToDoList,
      addToDo,
      removeToDo,
      setToDoChecked,
      logout,
    };
  },
  { persist: true }
);
