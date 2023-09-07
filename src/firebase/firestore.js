import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./index.js";
import { Loading, Notify } from "quasar";

export const addTodo = async ({ todo, userId }) => {
  Loading.show();
  try {
    await addDoc(collection(db, userId), { ...todo, created_at: Date.now() });

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
  const querySnapshot = await getDocs(
    query(collection(db, userId), orderBy("created_at", "desc"))
  );
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateTodo = async ({ todo, userId }) => {
  try {
    const itemRef = doc(db, userId, todo.id);
    await updateDoc(itemRef, { ...todo, updated_at: Date.now() });

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
