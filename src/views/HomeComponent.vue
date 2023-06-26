<template>
  <h1>{{ title }}</h1>

  <SearchBar @search="fetchData" @clear="clearResults" />

  <RepositoriesList :items="items" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RepositoriesList from "../components/RepositoriesList.vue";
import SearchBar from "../components/SearchBar.vue";

type Item = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default defineComponent({
  name: "HomeComponent",

  components: {
    RepositoriesList,
    SearchBar,
  },

  data() {
    return {
      title: "Searching repos with vue",
      items: [] as Item[],
    };
  },

  methods: {
    async fetchData(query: string) {
      console.log("Search event triggered", query);

      await fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          return json;
        })
        .then((res: Item) => (this.items = [res]));
    },

    clearResults() {
      this.items = [];
    },
  },
});
</script>

<style scoped></style>
