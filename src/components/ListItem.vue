<template>
  <RouterLink :to="{ name: 'RepositoryDetail', params: { id: repo?.id } }">
    <h3>{{ repo?.id }} - {{ repo?.name }}</h3>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Repo } from "../types";

export default defineComponent({
  name: "ListItem",
  props: {
    repo: Object as PropType<Repo>,
  },
});
</script>

<style scoped></style>
