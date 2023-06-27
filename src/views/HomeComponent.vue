<template>
  <SearchBar />

  <RepositoriesList :repos="repos" />
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import SearchBar from "@/components/SearchBar.vue";
import RepositoriesList from "@/components/RepositoriesList.vue";

export default {
  components: {
    SearchBar,
    RepositoriesList,
  },

  setup() {
    const store = useStore();
    const repos = computed(() => store.state.repos);

    return {
      repos,
    };
  },
};
</script>

<style scoped>
.filters-wrapper {
  display: grid;
  grid-template-columns: auto 25%;
  gap: 2rem;
}
</style>

<!-- <template>
  <h1>{{ title }}</h1>

  <div class="filters-wrapper">
    <SearchBar />
    @search="fetchData"
      :isLoading="isLoading" 
    @clear="clearResults" 

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

  <RepositoriesList :repos="displayedItems" />

  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1">
      Previous
    </button>
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RepositoriesList from "../components/RepositoriesList.vue";
import SearchBar from "../components/SearchBar.vue";

import { Repo, SortOption } from "../types";

import { mapState, mapGetters, mapActions, Store } from "vuex";

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

  data: () => {
    return {
      // title: "Searching repos with vue",

      locallyStoredQuery: "",
      repos: [] as Repo[],

      isLoading: false,

      sortOptions: _sortOptions,
      sortBy: defaultSortOption as SortOption,

      // items: [
      //   { id: 1, name: "Item 1" },
      //   { id: 2, name: "Item 2" },
      //   { id: 3, name: "Item 3" },
      //   { id: 4, name: "Item 4" },
      //   { id: 5, name: "Item 5" },
      //   { id: 6, name: "Item 6" },
      //   { id: 7, name: "Item 7" },
      //   { id: 8, name: "Item 8" },
      //   { id: 9, name: "Item 9" },
      //   { id: 10, name: "Item 10" },
      //   { id: 11, name: "Item 11" },
      //   { id: 12, name: "Item 12" },
      // ],

      itemsPerPage: 5,
      currentPage: 1,
      totalRepos: 0,
    };
  },

  computed: {
    ...mapState(["title"]),
    // title() {
    //   this.$store.state.title;
    // },

    totalPages() {
      return this.repos?.length
        ? Math.ceil(this.repos.length / this.itemsPerPage)
        : 0;
    },

    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this?.itemsPerPage;

      console.log({ startIndex, endIndex });
      return this?.repos?.slice(startIndex, endIndex);
    },
  },

  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    changePage(pageNumber: number) {
      this.currentPage = pageNumber;
    },

    storeQueryLocally(query: string) {
      this.locallyStoredQuery = query;
    },

    async fetchData(query: string, sortBy?: string) {
      this.isLoading = true;

      this.locallyStoredQuery = query;
      console.log("Search event triggered", { query }, { sortBy });

      await fetch(
        `https://api.github.com/search/repositories?q=${query}&per_page=12&sort=${
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
          this.totalRepos = res.total_count;
          // this.store.s
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
</style> -->
