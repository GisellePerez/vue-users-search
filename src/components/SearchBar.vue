<template>
  <input
    type="text"
    placeholder="Search something..."
    :value="query"
    @input="query = ($event.target as HTMLInputElement).value"
  />

  <button @click="$emit('search', query)">Search</button>
  <button @click="$emit('clear')">clear</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",

  emits: ["search", "clear"],

  data() {
    return {
      query: "",
    };
  },
});
</script>

<style scoped></style>
