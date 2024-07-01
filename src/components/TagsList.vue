<template>
  <div
    class="tag-list"
    :class="{ 'tag-list--left': alignment === 'left', 'tag-list--space': alignment === 'space-between'}"
    role="list"
    ref="list"
  >
    <template v-for="(tag, idx) in tagsToShow">
      <v-icon v-if="idx !== 0" :key="tag.key">mdi-circle-small</v-icon>
      <div class="tag-list__item" role="listitem" :key="tag.key">
        <v-icon v-show="tag.icon">{{tag.icon}}</v-icon>{{ tag.text }}
      </div>
    </template>
  </div>
</template>

<script>
import { ALIGNMENTS } from '../consts';
import { isTag, isAlignment } from '../validators';

export default {
  name: 'TagList',

  props: {
    tags: {
      type: Array,
      require: true,
      validator: (tags) => tags.every(isTag)
    },
    alignment: {
      type: String,
      default: ALIGNMENTS[0],
      validator: isAlignment,
    },
  },

  data: () => ({
    resizeObserver: null,
    width: 0,
    sizes: null,
    delimiterSize: 24,
    isCalculatingSize: true,
  }),

  methods: {
    calcSizes() {
      const sizes = [];

      const listElements = [...this.$refs.list.children];
      for (let i = 0; i < listElements.length; i += 2) {
        sizes.push(listElements[i].offsetWidth);
      }

      this.sizes = sizes;
      this.isCalculatingSize = false;
    },
  },

  watch: {
    tags() {
      this.isCalculatingSize = true;
      this.$nextTick(this.calcSizes);
    },
  },

  computed: {
    tagsToShow() {
      if (this.isCalculatingSize) {
        return this.tags;
      }

      let tagsToShow = 0;
      let sizesSum = 0;
      for (let i = 0; i < this.sizes.length; ++i) {
        if (i !== 0) {
          sizesSum += this.delimiterSize;
        }

        sizesSum += this.sizes[i];
        if (sizesSum >= this.width) {
          break;
        }
        tagsToShow += 1;
      }

      return this.tags.slice(0, tagsToShow);
    }
  },

  mounted() {
    const observer = new ResizeObserver(([el]) => {
      this.width = el.contentRect.width;
    });
    observer.observe(this.$refs.list);
    this.resizeObserver = observer;

    this.$nextTick(() => {
      this.calcSizes();
    });
  },

  beforeDestroy() {
    this.resizeObserver?.disconnect();
  }
};
</script>

<style lang="scss">
.tag-list {
  display: flex;
  min-height: 24px;

  &--left {
    justify-content: start;
  }

  &--space {
    justify-content: space-between;
  }

  &__item {
    display: flex;
    align-items: center;
    background-color: rgba(128, 128, 128, 0.5);
    border-radius: 4px;
  }
}
</style>