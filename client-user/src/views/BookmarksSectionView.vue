<script>
import { mapState, mapActions } from 'pinia'
import { useBookmarkStore } from '../stores/bookmark'

import CardEl from '../components/CardEl.vue'
export default {
  methods: {
    ...mapActions(useBookmarkStore, ['fetchBookmarks'])
  },
  computed: {
    ...mapState(useBookmarkStore, ['bookmarks'])
  },
  created() {
    this.fetchBookmarks()
  },
  components: { CardEl }
}
</script>

<template>
  <section id="bookmark-section">
    <div class="titleDivCenter"><h1 class="title">Bookmarks</h1></div>

    <div class="bookmarkDiv">
      <div v-if="bookmarks.length > 0">
        <div class="cardDiv">
          <CardEl v-for="item in bookmarks" :key="item.id" :item="item.Product" />
        </div>
      </div>

      <div class="notFoundDiv" v-else>
        <i class="fa-solid fa-boxes-packing"></i>
        <h1>No Bookmarks Found</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  @apply container mx-auto  pb-[80px] pt-[40px];
}

.bookmarkDiv {
  @apply py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8;
}

.cardDiv {
  @apply mt-8 mb-12 mx-auto px-4 md:px-12 flex flex-wrap lg:-mx-4 w-full;
}

.notFoundDiv {
  @apply my-[100px] flex flex-col items-center gap-[40px];
}

.notFoundDiv i {
  @apply text-[100px] text-gray-800;
}

.notFoundDiv h1 {
  @apply text-center text-gray-800 text-2xl font-medium;
}
</style>
