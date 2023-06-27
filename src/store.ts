import { createStore } from "vuex";
import { Repo, SortOption } from "./types";

type StoreType = {
  title: string;
  repos: Repo[];
  totalRepos: number;
  repoContributors: any[];
  query: string;
  searchBarValue: string;
  itemsPerPage: number;
  currentPage: number;
  sortBy: SortOption;
  isLoading: boolean;
};

const store = createStore<StoreType>({
  state() {
    return {
      title: "Searching repos with vue",
      repos: [] as Repo[],
      totalRepos: 0,
      repoContributors: [],
      query: "",
      searchBarValue: "",
      itemsPerPage: 5,
      currentPage: 1,
      sortBy: { label: "", value: "" },
      isLoading: false,
    };
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.repos.length / state.itemsPerPage);
    },
    displayedItems(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.repos.slice(start, end);
    },
  },
  mutations: {
    // increment(state) {
    //   state.count++;
    // },
    // updateQuery(state, newQuery) {
    //   console.log({ newQuery });
    //   state.query = newQuery;
    // },

    clearValue(state) {
      state.query = "";
      state.searchBarValue = "";
      state.repos = [];
      state.currentPage = 1;
    },

    setSearchBarValue(state, value) {
      state.searchBarValue = value;
    },

    setRepos(state, newRepos) {
      state.repos = newRepos;
    },

    setTotalRepos(state, total) {
      state.totalRepos = total;
    },

    setIsLoading(state, loading) {
      state.isLoading = loading;
    },

    setRepoContributors(state, loading) {
      state.repoContributors = loading;
    },

    setCurrentPage(state, pageNumber) {
      state.currentPage = pageNumber;
    },

    setSortBy(state, sortSelection: SortOption) {
      state.sortBy = sortSelection;
    },
  },
  actions: {
    updateSearchBarValue({ commit }, value) {
      commit("setSearchBarValue", value);
      // commit("setCurrentPage", 1);
    },

    updateSortBy({ commit, dispatch }, value) {
      commit("setSortBy", value);

      // commit("sortItems");
      dispatch("changePage", 1);
      dispatch("fetchRepos");
    },

    clearValue({ commit }) {
      commit("clearValue");
    },

    async fetchRepos({ commit, state }) {
      debugger;
      console.log(state.sortBy);

      console.log("fetch", state.searchBarValue);
      commit("setIsLoading", true);
      // console.log("Search event triggered", { query }, { sortBy });

      // `https://api.github.com/search/repositories?q=${state.searchBarValue}&per_page=12&sort=${
      //   sortBy || ""

      return await fetch(
        `https://api.github.com/search/repositories?q=${
          state.searchBarValue
          // eslint-disable-next-line prettier/prettier
        }&per_page=12&sort=${state.sortBy || ""}`,
      )
        .then((response) => response.json())
        .then((json) => json)
        .then((res) => {
          debugger;
          commit("setRepos", res.items);
          commit("setTotalRepos", res.total_count);

          commit("setIsLoading", false);

          // state.isLoading = false;
          // state.repos = res.items;
          // state.totalRepos = res.total_count;
        })
        .catch((e) => console.log(e));
    },

    async fetchContributors({ commit, state }, url) {
      return await fetch(url)
        .then((response) => response.json())
        .then((json) => json)
        .then((res) => {
          debugger;
          console.log({ res });
          commit("setRepoContributors", res);
        });
    },

    updateRepos({ commit }, value) {
      commit("updateRepos", value);
    },

    changePage({ commit }, pageNumber) {
      commit("setCurrentPage", pageNumber);
    },
  },
});

export default store;
