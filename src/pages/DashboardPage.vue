<template>
  <div>
    <todos-container :todos="todos" :openTodo="openTodo" />

    <q-page-sticky
      position="top-right"
      :offset="[40, 18]"
      @click="toggleAddTodo = !toggleAddTodo"
    >
      <q-btn fab icon="add" color="green" />
    </q-page-sticky>

    <todo-form
      :addTodo="addItem"
      v-if="toggleAddTodo"
      :closeModal="closeModal"
      :todo="todoForUpdate"
      :isEdit="isEdit"
      :updateTodo="updateItem"
      :deleteTodo="deleteItem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../firebase/firestore";
import { LocalStorage } from "quasar";
import TodosContainer from "../components/TodosContainer.vue";
import TodoForm from "../components/TodoForm.vue";

const todos = ref([]);
const toggleAddTodo = ref(false);
const isEdit = ref(false);

const user = LocalStorage.getItem("user");

const todoForUpdate = ref({});

onMounted(() => {
  getTodosFromDB();
});

const addItem = (todo) => {
  addTodo({
    userId: user.uid,
    todo: {
      title: todo.title,
      content: todo.content,
    },
  });
  reset();
};

const updateItem = (todo) => {
  updateTodo({
    userId: user.uid,
    todo,
  });
  reset();
};

const deleteItem = (todo) => {
  deleteTodo({
    userId: user.uid,
    todo,
  });
  reset();
};

const getTodosFromDB = async () => {
  todos.value = await getTodos(user.uid).then((todos) => todos);
};

const closeModal = () => {
  toggleAddTodo.value = false;
  todoForUpdate.value = {};
  isEdit.value = false;
};

const openTodo = (todo) => {
  isEdit.value = true;
  todoForUpdate.value = todo;
  toggleAddTodo.value = true;
};

const reset = () => {
  getTodosFromDB();
  closeModal();
};
</script>

<style lang="scss" scoped></style>
