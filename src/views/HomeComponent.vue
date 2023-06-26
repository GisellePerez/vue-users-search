<template>
  <h1>{{ title }}</h1>

  <SearchBar @search="fetchData" @clear="clearResults" />

  <p v-if="isLoading">Loading...</p>
  <RepositoriesList :items="items" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RepositoriesList from "../components/RepositoriesList.vue";
import SearchBar from "../components/SearchBar.vue";

import { Repo } from "../types";

export default defineComponent({
  name: "HomeComponent",

  components: {
    RepositoriesList,
    SearchBar,
  },

  data() {
    return {
      title: "Searching repos with vue",
      items: [] as Repo[],
      isLoading: false,
    };
  },

  methods: {
    async fetchData(query: string) {
      this.isLoading = true;
      console.log("Search event triggered", query);

      await fetch(
        // eslint-disable-next-line prettier/prettier
        `https://api.github.com/search/repositories?q=tetris&per_page=2`,
      )
        .then((response) => response.json())
        .then((json) => {
          console.log("------------ aaaaa");
          console.log(json);
          return json;
        })
        .then((res) => {
          this.isLoading = false;
          this.items = res.items;
        });
    },

    clearResults() {
      this.items = [];
    },
  },
});
</script>

<style scoped></style>
