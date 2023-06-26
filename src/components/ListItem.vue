<template>
  <RouterLink :to="{ name: 'RepositoryDetail', params: { id: item.id } }">
    <h3>{{ item.id }} - {{ item.name }}</h3>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItem",

  props: ["item"],
});
</script>

<style scoped></style>
