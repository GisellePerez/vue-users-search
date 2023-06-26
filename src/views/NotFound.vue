<template>
  <h2>404</h2>
  <h3>Page not found</h3>

  <RouterLink to="/">Go back home</RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
});
</script>

<style scoped></style>
