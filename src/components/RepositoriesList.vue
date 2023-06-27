<template>
  <h3>Results</h3>

  <!-- <v-row rows="2" :sm="repos?.length" v-if="repos?.length"> -->
  <div class="cards-grid" v-if="repos?.length">
    <ListItem v-for="repo in repos" :key="repo.id" :repo="repo" />
  </div>
  <p v-else>No items to display.</p>
  <!-- </v-col> -->
  <!-- </v-row> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListItem from "./ListItem.vue";

export default defineComponent({
  name: "RepositoriesList",

  props: ["repos"],

  components: { ListItem },
});
</script>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
