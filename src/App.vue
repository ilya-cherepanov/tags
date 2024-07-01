<template>
  <div>
    <tags-list :tags="tags" />
    <tags-list :tags="tags" alignment="space-between" />
    <div class="half"><tags-list :tags="tags" /></div>
    <div class="half"><tags-list :tags="tags" alignment="space-between" /></div>
    <v-btn type="button" @click="addTag">Add Tag</v-btn>
  </div>
</template>

<script>
import TagsList from './components/TagsList.vue';

export default {
  name: 'App',

  components: {
    TagsList
  },

  data: () => ({
    tags: [
      {
        text: 'HTML',
        icon: 'mdi-language-html5'
      },
      {
        text: 'CSS',
        icon: 'mdi-language-css3',
      },
      {
        text: 'JavaScript',
      },
      {
        text: 'TheVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongTag',
      },
    ],
  }),

  methods: {
    addTag() {
      this.tags.push({
        text: "WebAssembly",
      });
    }
  },
};
</script>

<style lang="scss">
.half {
  width: 50%;
}
</style>
