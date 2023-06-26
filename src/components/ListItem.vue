<template>
  <RouterLink :to="{ name: 'RepositoryDetail', params: { id: repo.id } }">
    <h3>{{ repo.id }} - {{ repo.name }}</h3>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItem",
  props: ["repo"],
});
</script>

<style scoped></style>
