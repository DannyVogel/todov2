import {
  auth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "~/config/firebase";

export const useAuth = () => {
  const userStore = useUserStore();
  const toDosStore = useToDosStore();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const user = {
          username: userCredential.user?.displayName!,
          uid: userCredential.user?.uid!,
          isLogged: true,
        };
        userStore.setLoggedInUser(user);
        toDosStore.getToDos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        auth.currentUser &&
          updateProfile(auth.currentUser, {
            displayName: name,
          });
        const user = {
          username: name,
          uid: userCredential.user?.uid!,
          isLogged: true,
        };
        userStore.setLoggedInUser(user);
        toDosStore.getToDos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logInAsGuest = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "guest@guest.com",
        "123456"
      );
      if (userCredential) {
        const user = {
          username: "Guest",
          uid: userCredential.user?.uid!,
          isLogged: true,
        };
        userStore.setLoggedInUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    userStore.logout();
    toDosStore.logout();
  };

  return { signIn, signUp, logInAsGuest, logout };
};
