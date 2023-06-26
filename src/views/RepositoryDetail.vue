<template>
  <h1>Repo detail {{ id }}</h1>

  <RouterLink to="/"> Go back home </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RepositoryDetail",

  props: ["id"],

  // data() {
  //   return {
  //     id: this.$route.params.id,
  //   };
  // },
});
</script>

<style scoped></style>
