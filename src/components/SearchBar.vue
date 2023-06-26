<template>
  <div class="search-bar-wrapper">
    <v-text-field
      type="text"
      placeholder="Search something..."
      :value="query"
      @input="query = ($event.target as HTMLInputElement).value"
      @click:append="clearValue"
      density="compact"
      append-icon="mdi-close"
      :loading="isLoading"
      :disabled="isLoading"
    />

    <v-btn
      @click="$emit('search', query)"
      :disabled="!query"
      icon="mdi-magnify"
    ></v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",

  props: ["isLoading"],

  emits: ["search", "clear"],

  data() {
    return {
      query: "",
    };
  },

  methods: {
    clearValue() {
      this.query = "";
      this.$emit("clear");
    },
  },
});
</script>

<style scoped>
.search-bar-wrapper {
  display: flex;
  gap: 2rem;
}
</style>
