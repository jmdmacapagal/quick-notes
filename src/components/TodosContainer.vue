<template>
  <div class="main-container">
    <div class="todo-list-container q-px-sm q-py-sm">
      <div v-if="todos.length" class="">
        <span
          v-for="todo in todos"
          :key="todo.id"
          class="block q-py-xs q-px-sm q-mb-sm bg-white"
          @click="openTodo(todo)"
        >
          {{ todo.title }} -- {{ todo.content.substring(0, 50) }} ...</span
        >
      </div>
      <div v-else class="text-center">
        <h6>You don't have anything on your list yet.</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todos: {
    type: Array,
    required: true,
  },
  openTodo: {
    type: Function,
  },
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
