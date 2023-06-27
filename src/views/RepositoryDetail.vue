<template>
  <v-container>
    <!-- <h1>Repo detail {{ id }}</h1> -->
    <v-btn variant="tonal" class="link-btn" prepend-icon="mdi-chevron-left">
      <RouterLink class="link" to="/"> Go back home </RouterLink>
    </v-btn>

    <h1 v-if="repo">{{ repo.name }}</h1>

    <div class="stats-wrapper">
      <div class="stats">
        <v-icon icon="mdi-silverware-fork"></v-icon>
        <p><b> Forks: </b> {{ repo.forks }}</p>
      </div>

      <div class="stats">
        <v-icon icon="mdi-eye-outline"></v-icon>
        <p><b>Watchers: </b> {{ repo.watchers }}</p>
      </div>

      <div class="stats">
        <v-icon icon="mdi-code-braces"></v-icon>
        <p><b>Language:</b> {{ repo.language || "-" }}</p>
      </div>
    </div>

    <section class="contributors-section">
      <h3>Contributors</h3>
      <div class="cards-grid" v-if="contributors?.length">
        <v-card
          variant="outlined"
          class="card-wrapper d-flex flex-no-wrap justify-space-between"
          v-for="c in contributors"
          :key="c.id"
        >
          <div class="card-img-wrapper">
            <img :src="c.avatar_url" :alt="c.login" />
          </div>

          <!-- <p>{{ c.login }}</p> -->
          <v-card-title>
            {{ c.login }}
          </v-card-title>
        </v-card>
      </div>
    </section>
  </v-container>
</template>

<script lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  props: ["id"],

  setup(props: any) {
    const store = useStore();
    const route = useRoute();

    const contributors = computed(() => store.state.repoContributors);

    const repo: any = computed(() =>
      store.state.repos.find((r: any) => {
        console.log({ repo }, r.id === Number(props.id));

        store.dispatch("fetchContributors", r.contributors_url);

        return r.id === Number(props.id);
        // eslint-disable-next-line prettier/prettier
      }),
    );

    // fetch the user information when params change
    watch(
      () => repo,
      async (newId) => {
        console.log("==>", repo?.value?.contributors_url);
        // userData.value = await fetchUser(newId);

        // eslint-disable-next-line prettier/prettier
      },
    );

    return {
      repo,
      contributors,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.link-btn {
  margin-top: 1rem;
}

.link {
  text-decoration: none;
  color: white;
}
.contributors-section {
  margin-top: 2rem;
}

.contributors-section h3 {
  margin-bottom: 1rem;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.card-wrapper {
  padding: 1rem;
}

.card-img-wrapper {
  width: 50px;
  height: 50px;
}

.card-img-wrapper img {
  width: 100%;
}

.stats-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.stats {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #2d2d2d;
  color: white;
}

@media (max-width: 768px) {
  .cards-grid,
  .stats-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
