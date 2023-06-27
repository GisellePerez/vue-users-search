<template>
  <!-- <h3>{{ repo?.id }} - {{ repo?.name }}</h3> -->

  <!-- <v-col cols="12" sm="6"> -->
  <div class="card-wrapper">
    <v-card variant="outlined">
      <div>
        <v-card-title>{{ repo?.name }}</v-card-title>
        <v-card-text>{{ repo?.description }}</v-card-text>
      </div>

      <v-card-actions>
        <v-btn variant="tonal">
          <RouterLink
            class="link"
            :to="{ name: 'RepositoryDetail', params: { id: repo?.id } }"
          >
            See more
          </RouterLink>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <!-- </v-col> -->
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

<style scoped>
.card-wrapper {
  height: 100%;
}

.card-wrapper > .v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.link {
  text-decoration: none;
  color: white;
  font-weight: 500;
}

@media screen {
}
</style>
