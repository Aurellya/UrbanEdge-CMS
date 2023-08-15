<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useBookmarkStore } from '../stores/bookmark'
import { useGlobalStore } from '../stores/global'

export default {
  components: {
    RouterLink
  },
  props: ['item'],
  methods: {
    ...mapActions(useBookmarkStore, [
      'fetchBookmarks',
      'getBookmarkIdFromPId',
      'addBookmark',
      'deleteBookmark'
    ]),
    ...mapActions(useGlobalStore, ['formattedPrice'])
  },
  computed: {
    ...mapState(useAuthStore, ['authenticated']),
    ...mapState(useBookmarkStore, ['bookmarkedPIdArray']),
    isBookmarked() {
      return this.bookmarkedPIdArray.includes(this.item.id)
    }
  },
  created() {
    if (this.authenticated) this.fetchBookmarks()
  }
}
</script>

<template>
  <div class="card">
    <RouterLink class="navLink" :to="`/products/${item.id}`">
      <img class="w-full h-[260px]" :src="item.imgUrl" :alt="item.name" />
    </RouterLink>

    <div class="px-6 py-4 pb-3">
      <div class="grid grid-cols-6 gap-4 mb-2">
        <div
          class="font-bold text-xl col-start-1 col-span-5"
          :class="[{ 'col-span-6': !authenticated }]"
        >
          {{ item.name }}
        </div>
        <button class="hover:opacity-60" v-if="authenticated">
          <i
            class="fa-solid fa-bookmark text-[20px]"
            v-if="isBookmarked"
            @click.prevent="deleteBookmark(getBookmarkIdFromPId(item.id))"
          ></i>
          <i
            class="fa-regular fa-bookmark text-[20px]"
            v-else
            @click.prevent="addBookmark(item.id)"
          ></i>
        </button>
      </div>
      <p class="text-gray-700 text-base">
        {{ item.description }}
      </p>
    </div>
    <div class="px-6 pb-2 text-gray-800 block text-[22px] font-bold">
      <sup>Rp</sup>&nbsp;{{ formattedPrice(item.price) }}
    </div>
    <div class="px-6 pt-2 pb-2">
      <span class="categoryDiv"> #&nbsp;{{ item?.Category?.name }} </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4;
}

.categoryDiv {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2;
}
</style>
