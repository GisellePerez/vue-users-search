<template>
  <v-row>
    <v-col cols="11">
      <v-text-field
        placeholder="Type something"
        type="text"
        density="compact"
        append-icon="mdi-close"
        v-model="searchBarValue"
        @input="searchBarValue.updateSearchBarValue"
        @click:append="handleClear"
        :isLoading="isLoading"
      />
    </v-col>

    <v-col cols="1">
      <v-btn
        icon="mdi-magnify"
        @click="handleSearch"
        @keypress.enter="handleSearch"
        :disabled="!searchBarValue || isLoading"
        size="small"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading);

    const searchBarValue = computed({
      get() {
        return store.state.searchBarValue;
      },
      set(value) {
        store.dispatch("updateSearchBarValue", value);
      },
    });

    function handleSearch() {
      store.dispatch("fetchRepos");
    }

    function handleClear() {
      store.dispatch("clearValue");
    }

    return {
      searchBarValue,
      handleSearch,
      handleClear,
      isLoading,
    };
  },
};
</script>
