<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'
import { useProductStore } from '../stores/product'

import CardEl from '../components/CardEl.vue'
import PaginationEl from '../components/PaginationEl.vue'
import FilterEl from '../components/FilterEl.vue'

export default {
  components: { CardEl, PaginationEl, FilterEl },
  methods: {
    ...mapActions(useProductStore, ['fetchData'])
  },
  computed: {
    ...mapState(useGlobalStore, ['isLoading']),
    ...mapState(useProductStore, ['products'])
  },
  created() {
    this.fetchData(1) // init: get page 1
  }
}
</script>

<template>
  <section id="product-section">
    <div class="titleDivCenter"><h1 class="title">Products</h1></div>

    <div class="filterDiv"><FilterEl /></div>

    <div class="contentDiv">
      <div v-if="products.length > 0">
        <div class="cardDiv">
          <CardEl v-for="item in products" :key="item.id" :item="item" />
        </div>
        <PaginationEl />
      </div>

      <div class="notFoundDiv" v-else-if="!isLoading">
        <i class="fa-solid fa-boxes-packing"></i>
        <h1>No Products Found</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  @apply container mx-auto  py-[40px];
}

.filterDiv {
  @apply sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex justify-center;
}

.contentDiv {
  @apply py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8;
}

.cardDiv {
  @apply mt-0 mb-8 mx-auto px-4 md:px-12 flex flex-wrap lg:-mx-4 w-full;
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
