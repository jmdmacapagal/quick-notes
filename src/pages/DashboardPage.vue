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
          @click="addTodo"
          class="q-px-xl q-py-xs col-4"
          :disable="!todoDetails || !todoTitle"
        />
      </div>
      <q-input
        v-model="todoDetails"
        type="textarea"
        label="Details about your new todo"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const todos = ref([]);
const todoTitle = ref("");
const todoDetails = ref("");

const addTodo = () => {
  if (todoTitle.value && todoDetails.value) {
    todos.value.push({
      id: todos.value.length + 1,
      title: todoTitle.value,
      details: todoDetails.value,
    });

    todoTitle.value = "";
    todoDetails.value = "";
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
