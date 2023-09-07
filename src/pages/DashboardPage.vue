<template>
  <div class="row main-container">
    <div class="todo-list-container col-5 q-px-sm q-py-sm">
      <div v-if="todos.length" class="">
        <span
          v-for="{ title, id, details } in todos"
          :key="id"
          class="block q-py-xs q-px-sm q-mb-sm bg-white"
        >
          {{ title }} -- {{ details.substring(0, 50) }} ...</span
        >
      </div>
      <div v-else class="text-center">
        <h6>You don't have anything on your list yet.</h6>
      </div>
    </div>
    <form class="col-7 q-px-sm q-pt-sm">
      <div class="row">
        <q-input v-model="todoTitle" label="New Todo" class="input col-8" />
        <q-btn
          push
          color="primary"
          label="Add"
          @click="add"
          class="q-px-xl q-py-xs col-4"
          :disable="!todoContent || !todoTitle"
        />
      </div>
      <q-input
        v-model="todoContent"
        type="textarea"
        label="Details about your new todo"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addTodo, getTodos } from "../firebase/firestore";
import { LocalStorage } from "quasar";

const todos = ref([]);
const todoTitle = ref("");
const todoContent = ref("");

const user = LocalStorage.getItem("user");

onMounted(() => {
  getTodos(user.uid).then((res) => {
    console.log(res);
  });
});

const add = () => {
  if (todoTitle.value && todoContent.value) {
    addTodo({
      userId: user.uid,
      todo: {
        title: todoTitle.value,
        content: todoContent.value,
      },
    });

    todoTitle.value = "";
    todoContent.value = "";
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 60%;
  margin: 100px auto 0;
}

.todo-list-container {
  background: #ececec;
}
</style>
