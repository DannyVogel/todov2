import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const useAuth = () => {
  const userStore = useUserStore();
  const toDosStore = useToDosStore();
  const { getFromDb } = useDatabase();
  const { $firebase } = useNuxtApp();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $firebase.auth,
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
        getFromDb();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      if (userCredential) {
        $firebase.auth.currentUser &&
          updateProfile($firebase.auth.currentUser, {
            displayName: name,
          });
        const user = {
          username: name,
          uid: userCredential.user?.uid!,
          isLogged: true,
        };
        userStore.setLoggedInUser(user);
        getFromDb();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logInAsGuest = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $firebase.auth,
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
        getFromDb();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut($firebase.auth);
    userStore.logout();
    toDosStore.logout();
  };

  return { signIn, signUp, logInAsGuest, logout };
};
