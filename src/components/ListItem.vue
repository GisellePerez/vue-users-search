<template>
  <h3>{{ item.id }} - {{ item.title }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItem",

  props: ["item"],
});
</script>

<style scoped></style>
