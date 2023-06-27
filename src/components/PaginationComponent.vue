<template>
  <!-- <div class="pagination"> -->
  <div v-if="repos.length" class="pagination-wrapper">
    <v-btn
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      rounded="lg"
      elevation="0"
    >
      Previous
    </v-btn>

    <v-btn
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="changePage(pageNumber)"
      size="small"
      rounded="xl"
      elevation="0"
      icon
    >
      {{ pageNumber }}
    </v-btn>

    <v-btn
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      rounded="lg"
      elevation="0"
    >
      Next
    </v-btn>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const currentPage = ref(1);
    const repos = computed(() => store.getters.displayedItems);
    const totalPages = computed(() => store.getters.totalPages);

    const changePage = (pageNumber: number) => {
      store.dispatch("changePage", pageNumber);
      currentPage.value = pageNumber;
    };

    return {
      repos,
      currentPage,
      changePage,
      totalPages,
    };
  },
};
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  margin-top: 2rem;
}
</style>
