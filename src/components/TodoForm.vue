<template>
  <div>
    <div class="overlay"></div>
    <form class="q-px-md q-py-sm shadow-2">
      <div class="row justify-between">
        <q-input v-model="todoTitle" label="Title" class="col-7" />
        <q-btn
          v-if="!isEdit"
          push
          color="primary"
          label="Add"
          @click="addTodo({ title: todoTitle, content: todoContent })"
          class="q-px-xl"
          :disable="!todoContent || !todoTitle"
        />
        <q-btn
          v-if="isEdit"
          push
          color="primary"
          label="Update"
          @click="
            updateTodo({
              title: todoTitle,
              content: todoContent,
              id: todo.id,
            })
          "
          class="q-px-lg"
          :disable="!todoContent || !todoTitle"
        />
      </div>
      <q-input
        v-model="todoContent"
        type="textarea"
        label="Details about your new todo"
      />

      <div class="row">
        <q-btn
          push
          color="red"
          label="Cancel"
          @click="closeModal"
          class="q-px-xl q-py-xs col-2 block q-ml-auto q-mt-md"
        />
        <q-btn
          v-if="isEdit"
          push
          color="red"
          label="Delete"
          @click="deleteTodo(todo)"
          class="q-px-xl q-py-xs col-2 q-ml-sm block q-mt-md"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const todoTitle = ref("");
const todoContent = ref("");

const props = defineProps({
  addTodo: {
    type: Function,
  },
  updateTodo: {
    type: Function,
  },
  deleteTodo: {
    type: Function,
  },
  closeModal: {
    type: Function,
  },
  todo: {
    type: Object,
  },
  isEdit: {
    type: Boolean,
  },
});

onMounted(() => {
  todoTitle.value = props.todo.title ?? "";
  todoContent.value = props.todo.content ?? "";
});
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  max-width: 600px;
  z-index: 50;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
}

.overlay {
  position: fixed;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: rgba(000, 000, 000, 0.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@media (max-width: $breakpoint-xs-max) {
  form {
    max-width: 90%;
  }
}
</style>
