<template>
  <!-- <h1>Repo detail {{ id }}</h1> -->
  <RouterLink to="/"> Go back home </RouterLink>

  <h1 v-if="repo">{{ repo.name }}</h1>

  <p>Forks: {{ repo.forks }}</p>
  <p>Language: {{ repo.language }}</p>

  <div class="cards-grid" v-if="contributors?.length">
    <div class="card-wrapper" v-for="c in contributors" :key="c.id">
      <div class="card-img-wrapper">
        <img :src="c.avatar_url" :alt="c.login" />
      </div>

      <p>{{ c.login }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Repo } from "@/types";
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

// export default defineComponent({
//   name: "RepositoryDetail",

//   props: ["id"],

//   export default {

//   }
//   setup() {}

//   // data() {
//   //   return {
//   //     id: this.$route.params.id,
//   //   };
//   // },
// });
</script>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.card-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-img-wrapper {
  width: 50px;
  height: 50px;
}

.card-img-wrapper img {
  width: 100%;
}
</style>
