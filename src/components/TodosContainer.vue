<template>
  <div class="main-container">
    <div class="todo-list-container q-px-sm q-py-sm">
      <q-input v-model="searchTerm" label="Search Todo" class="col-7" />

      <div v-if="computedTodos.length" class="">
        <span
          v-for="todo in computedTodos"
          :key="todo.id"
          class="block q-py-xs q-px-sm q-mb-sm bg-white"
          @click="openTodo(todo)"
        >
          {{ todo.title }} -- {{ todo.content.substring(0, 50) }} ...</span
        >
      </div>
      <div v-if="!searchTerm && !computedTodos.length" class="text-center">
        <h6>You don't have anything on your list yet.</h6>
      </div>
      <div v-if="searchTerm && !computedTodos.length" class="text-center">
        <h6>No item exist yet.</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
  openTodo: {
    type: Function,
  },
});

const searchTerm = ref("");

const computedTodos = computed(() => {
  return props.todos.filter((todo) => {
    return todo.title.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});
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
