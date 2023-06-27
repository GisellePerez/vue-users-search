<template>
  <v-container>
    <h1>Search repos!</h1>

    <SearchBar />

    <v-select
      label="Sort repos by"
      :items="sortOptions"
      density="compact"
      item-title="label"
      item-value="value"
      @input="sortBy.setSortBy"
      v-model="sortBy"
      :disabled="!repos.length || isLoading"
    ></v-select>

    <RepositoriesList :repos="repos" />

    <PaginationComponent />
  </v-container>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

import SearchBar from "@/components/SearchBar.vue";
import RepositoriesList from "@/components/RepositoriesList.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { SortOption } from "@/types";

const _sortOptions: SortOption[] = [
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "help-wanted-issues", label: "Help wanted issues" },
  { value: "updated", label: "Last Updated" },
];

export default {
  components: {
    SearchBar,
    RepositoriesList,
    PaginationComponent,
  },

  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading);
    const searchBarValue = computed(() => store.state.searchBarValue);

    const repos = computed(() => store.getters.displayedItems);

    const sortBy = computed({
      get() {
        return store.state.sortBy;
      },
      set(value) {
        store.dispatch("updateSortBy", value);
      },
    });

    return {
      repos,
      sortOptions: _sortOptions,
      sortBy,
      isLoading,
      searchBarValue,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.filters-wrapper {
  display: grid;
  grid-template-columns: auto 25%;
  gap: 2rem;
}
</style>
