<template>
  <div>
    <v-text-field
      type="text"
      v-model="searchBarValue"
      @input="searchBarValue.updateSearchBarValue"
      @click:append="handleClear"
      density="compact"
      append-icon="mdi-close"
    />
  </div>

  <v-btn
    icon="mdi-magnify"
    @click="handleSearch"
    @keypress.enter="handleSearch"
  ></v-btn>

  {{ searchBarValue }}
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

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
    };
  },
};
</script>
