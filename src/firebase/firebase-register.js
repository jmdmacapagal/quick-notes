import { createUserWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { auth } from "./index";

export const register = async (email, password) => {
  Loading.show();

  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      Notify.create({
        type: "positive",
        message: "Account successfuly created!",
      });

      Loading.hide();

      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Loading.hide();

      Notify.create({
        type: "negative",
        message: error.message,
      });
    });
};
