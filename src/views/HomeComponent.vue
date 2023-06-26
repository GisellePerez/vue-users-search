<template>
  <h1>{{ title }}</h1>

  <SearchBar @search="fetchData" @clear="clearResults" />

  <v-select
    label="Sort by"
    :items="sortOptions"
    density="compact"
    item-title="label"
    item-value="value"
    @input="changeSortBy"
    v-model="sortBy"
    :disabled="!storedQuery"
  ></v-select>

  <p v-if="isLoading">Loading...</p>
  <RepositoriesList :items="items" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RepositoriesList from "../components/RepositoriesList.vue";
import SearchBar from "../components/SearchBar.vue";

import { Repo } from "../types";

type SortOption = { label: string; value: string };

export default defineComponent({
  name: "HomeComponent",

  components: {
    RepositoriesList,
    SearchBar,
  },

  data() {
    return {
      title: "Searching repos with vue",

      storedQuery: "",
      items: [] as Repo[],

      isLoading: false,

      sortOptions: [
        { value: "stars", label: "Stars" },
        { value: "forks", label: "Forks" },
        { value: "help-wanted-issues", label: "Help wanted issues" },
        { value: "updated", label: "Updated" },
      ],
      sortBy: { value: "", label: "" } as SortOption,
    };
  },

  methods: {
    storeQuery(query: string) {
      this.storedQuery = query;
    },

    async fetchData(query: string, sortBy?: string) {
      this.isLoading = true;

      this.storedQuery = query;
      console.log("Search event triggered", { query }, { sortBy });

      await fetch(
        `https://api.github.com/search/repositories?q=${query}&per_page=2&sort=${
          sortBy || ""
          // eslint-disable-next-line prettier/prettier
        }`,
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          return json;
        })
        .then((res) => {
          debugger;
          this.isLoading = false;
          this.items = res.items;
        });
    },

    changeSortBy(event: any) {
      this.sortBy = event.target.value;
    },

    clearResults() {
      this.items = [];
    },
  },

  watch: {
    storedQuery: function (val, oldVal) {
      console.log({ val });
    },

    sortBy: function (val, oldVal) {
      if (val && this.storedQuery) {
        this.fetchData(this.storedQuery, val);
      }
    },
  },
});
</script>

<style scoped></style>
