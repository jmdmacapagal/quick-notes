import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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

export const updateTodo = async ({ todo, userId }) => {
  try {
    const itemRef = doc(db, userId, todo.id);
    await updateDoc(itemRef, todo);

    Notify.create({
      type: "positive",
      message: "Updated",
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

export const deleteTodo = async ({ todo, userId }) => {
  try {
    const itemRef = doc(db, userId, todo.id);
    await deleteDoc(itemRef);

    Notify.create({
      type: "positive",
      message: "Deleted",
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
