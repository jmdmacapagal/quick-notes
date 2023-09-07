<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary"
                  >
                    Register
                  </div>
                </div>
              </div>

              <q-form ref="form" class="q-gutter-md" @submit="submit">
                <q-input v-model="user.email" label="Email" name="Email" />

                <q-input
                  v-model="user.password"
                  label="Password"
                  name="password"
                  type="password"
                />

                <div>
                  <q-btn
                    class="full-width"
                    color="primary"
                    label="Register"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      Already have an account ?
                      <router-link class="text-primary" to="/login"
                        >Login</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import { register } from "../firebase/firebase-auth";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  email: null,
  password: null,
});

const form = ref(null);

const submit = async () => {
  if (form.value.validate()) {
    const response = await register(user);

    if (response.user) {
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }
};
</script>
