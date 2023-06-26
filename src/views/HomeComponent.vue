<template>
  <h1>{{ title }}</h1>

  <div class="filters-wrapper">
    <SearchBar
      @search="fetchData"
      @clear="clearResults"
      :isLoading="isLoading"
    />

    <v-select
      label="Sort by"
      :items="sortOptions"
      density="compact"
      item-title="label"
      item-value="value"
      @input="changeSortBy"
      v-model="sortBy"
      :disabled="!locallyStoredQuery || isLoading"
    ></v-select>
  </div>

  <RepositoriesList :repos="repos" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RepositoriesList from "../components/RepositoriesList.vue";
import SearchBar from "../components/SearchBar.vue";

import { Repo } from "../types";

type SortOption = { label: string; value: string };

const _sortOptions: SortOption[] = [
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "help-wanted-issues", label: "Help wanted issues" },
  { value: "updated", label: "Updated" },
];
const defaultSortOption: SortOption = { value: "", label: "" };

export default defineComponent({
  name: "HomeComponent",

  components: {
    RepositoriesList,
    SearchBar,
  },

  data() {
    return {
      title: "Searching repos with vue",

      locallyStoredQuery: "",
      repos: [] as Repo[],

      isLoading: false,

      sortOptions: _sortOptions,
      sortBy: defaultSortOption as SortOption,
    };
  },

  methods: {
    storeQueryLocally(query: string) {
      this.locallyStoredQuery = query;
    },

    async fetchData(query: string, sortBy?: string) {
      this.isLoading = true;

      this.locallyStoredQuery = query;
      console.log("Search event triggered", { query }, { sortBy });

      await fetch(
        `https://api.github.com/search/repositories?q=${query}&per_page=2&sort=${
          sortBy || ""
          // eslint-disable-next-line prettier/prettier
        }`,
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        })
        .then((res) => {
          debugger;
          this.isLoading = false;
          this.repos = res.items;
        });
    },

    changeSortBy(event: any) {
      this.sortBy = event.target.value;
    },

    clearResults() {
      this.repos = [];
      this.sortBy = defaultSortOption;
      this.locallyStoredQuery = "";
    },
  },

  watch: {
    // locallyStoredQuery: function (val, oldVal) {
    //   console.log({ val });
    // },

    sortBy: function (val, oldVal) {
      if (val && this.locallyStoredQuery) {
        this.fetchData(this.locallyStoredQuery, val);
      }
    },
  },
});
</script>

<style scoped>
.filters-wrapper {
  display: grid;
  grid-template-columns: auto 25%;
  gap: 2rem;
}
</style>
