<template>
  <div v-if="repos?.length">
    <p>Results</p>
    <ListItem v-for="repo in repos" :key="repo.id" :repo="repo" />
  </div>

  <p v-else>No items to display.</p>
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

<style scoped></style>
