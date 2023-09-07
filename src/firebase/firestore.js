import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./index.js";
import { Loading, Notify } from "quasar";

export const addTodo = async ({ todo, userId }) => {
  Loading.show();
  try {
    await addDoc(collection(db, userId), todo);

    Notify.create({
      type: "positive",
      message: "Added",
    });
    Loading.hide();
  } catch (e) {
    Notify.create({
      type: "negative",
      message: e.message,
    });
    Loading.hide();
  }
};

export const getTodos = async (userId) => {
  const querySnapshot = await getDocs(collection(db, userId));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
