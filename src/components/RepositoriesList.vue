<template>
  <div v-if="items?.length">
    <p>Results</p>

    <ListItem v-for="item in items" :key="item.id" :item="item" />
  </div>
  <p v-else>No items to display.</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListItem from "./ListItem.vue";

export default defineComponent({
  name: "RepositoriesList",

  props: ["items"],

  components: { ListItem },
});
</script>

<style scoped></style>
